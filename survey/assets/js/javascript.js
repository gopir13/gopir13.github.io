var locSearch = window.location.search.substring(1).split('&')[0];
if (locSearch) {
  $('.section').hide();
  document.getElementById(locSearch).style.display = 'block';
}

function setupTypewriter(t) {
  var HTML = t.innerHTML;

  t.innerHTML = '';

  var cursorPosition = 0,
    tag = '',
    writingTag = false,
    tagOpen = false,
    typeSpeed = 80,
    tempTypeSpeed = 0;

  var type = function() {
    if (writingTag === true) {
      tag += HTML[cursorPosition];
    }

    if (HTML[cursorPosition] === '<') {
      tempTypeSpeed = 0;
      if (tagOpen) {
        tagOpen = false;
        writingTag = true;
      } else {
        tag = '';
        tagOpen = true;
        writingTag = true;
        tag += HTML[cursorPosition];
      }
    }
    if (!writingTag && tagOpen) {
      tag.innerHTML += HTML[cursorPosition];
    }
    if (!writingTag && !tagOpen) {
      if (HTML[cursorPosition] === ' ') {
        tempTypeSpeed = 0;
      } else {
        tempTypeSpeed = Math.random() * typeSpeed + 50;
      }
      t.innerHTML += HTML[cursorPosition];

      $('#typewriter pre').addClass('rmafter');
    }
    if (writingTag === true && HTML[cursorPosition] === '>') {
      tempTypeSpeed = Math.random() * typeSpeed + 50;
      writingTag = false;
      if (tagOpen) {
        var newSpan = document.createElement('span');
        t.appendChild(newSpan);
        newSpan.innerHTML = tag;
        tag = newSpan.firstChild;

        var tagLength = $('#typewriter span').length;

        if (tagLength === 3) {
          setTimeout(function() {
            $('.btn-footer').addClass('show');
          }, 7000);
        }
      }
    }

    cursorPosition += 1;
    if (cursorPosition < HTML.length - 1) {
      setTimeout(type, tempTypeSpeed);
    }
  };

  return {
    type: type,
  };
}

var typer = document.getElementById('typewriter');

typewriter = setupTypewriter(typewriter);

typewriter.type();

$('#formSection1 .btn-primary').click(function() {
  event.preventDefault();
  $(this).parents('.section').hide();
  $(this).parents('.section').next('.section').show();
});
