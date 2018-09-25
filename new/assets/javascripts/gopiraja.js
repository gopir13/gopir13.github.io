$(document).ready(function() {
  // Set the Access Token
  var accessToken =
    'df9d5d78070441d0644778c7e5bd41d705e1a5f52da5979078549920d7da18b6';

  // Call Dribble v2 API
  $.ajax({
    url:
      'https://api.dribbble.com/v2/user/shots?per_page=50&access_token=' +
      accessToken,
    dataType: 'json',
    type: 'GET',
    success: function(data) {
      if (data.length > 0) {
        $.each(data.reverse(), function(i, val) {
          var imageName = val.images.hidpi || val.images.normal;

          $('#shots').prepend(
            '<a class="shot" target="_blank" href="' +
              val.html_url +
              '" title="' +
              val.title +
              '"><img src="' +
              imageName +
              '"/></a>'
          );
        });

        $('#shots .shot').mouseenter(function() {
          $(this).addClass('active');
        });
        $('#shots .shot').mouseleave(function() {
          $('#shots .shot').removeClass('active');
        });
      } else {
        $('#shots').append('<p>No shots yet!</p>');
      }
    },
  });

  // WindowsSize();
  $('.home-content > a').on('click', function() {
    $('html, body').animate(
      {
        scrollTop: $('#portfolio').offset().top,
      },
      500
    );
  });

  $(document).on('scroll', onScroll);

  //smoothscroll
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off('scroll');

    $('a').each(function() {
      $(this)
        .parent()
        .removeClass('active');
    });
    $(this)
      .parent()
      .addClass('active');

    var target = this.hash,
      menu = target;
    $target = $(target);
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top + 2,
        },
        500,
        'swing',
        function() {
          window.location.hash = target;
          $(document).on('scroll', onScroll);
        }
      );
  });
});
$(window).resize(WindowsSize);

var WindowsSize = function() {
  var h = $(window).innerHeight(),
    w = $(window).innerWidth();

  console.log('window', w, h);
  // $('.wrapper').css({ width: w, height: h });
  // $('.portfolio').css({ 'margin-top': h });
};

function onScroll(event) {
  var scrollPos = $(document).scrollTop();

  if (scrollPos > $(window).innerHeight() - 2) {
    $('.portfolio .navigation').addClass('fixed');
  } else {
    $('.portfolio .navigation').removeClass('fixed');
  }

  $('.menu a').each(function() {
    var currLink = $(this);
    var refElement = $(currLink.attr('href'));
    if (
      refElement.position().top <= scrollPos &&
      refElement.position().top + refElement.height() > scrollPos
    ) {
      $('.menu li').removeClass('active');
      currLink.parent().addClass('active');
    } else {
      currLink.parent().removeClass('active');
    }
  });
}
