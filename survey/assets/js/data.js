// Initialize Firebase
// var config = {
//   apiKey: 'AIzaSyBpupUDU31z_i9k84Q99JuSlz1QdZb_V1E',
//   authDomain: 'survey-5e26e.firebaseapp.com',
//   databaseURL: 'https://survey-5e26e.firebaseio.com',
//   projectId: 'survey-5e26e',
//   storageBucket: 'survey-5e26e.appspot.com',
//   messagingSenderId: '1062501854515',
// };
// firebase.initializeApp(config);

//create firebase reference
var dbRef = new Firebase('https://survey-5e26e.firebaseio.com');
var contactsRef = dbRef.child('survey');

//load older conatcts as well as any newly added one...
contactsRef.on('child_added', function(snap) {
  console.log('added', snap.key(), snap.val());
  document.querySelector('#results').innerHTML += contactHtmlFromObject(
    snap.val()
  );
});

//save contact
document.querySelector('.submitBtn').addEventListener(
  'click',
  function(event) {
    event.preventDefault();
    if (
      document.querySelector('#currentDesignation').value != '' &&
      document.querySelector('#distruptIndustry').value != '' &&
      document.querySelector('#name').value != '' &&
      document.querySelector('#age').value != '' &&
      document.querySelector('#location').value != ''
    ) {
      contactsRef.push({
        knowPassion: {
          currentDesignation: document.querySelector('#currentDesignation')
            .value,
          distruptIndustry: document.querySelector('#distruptIndustry').value,
        },
        knowUser: {
          name: document.querySelector('#name').value,
          age: document.querySelector('#age').value,
          gender: document.querySelector('#gender').value,
          location: document.querySelector('#location').value,
          education: document.querySelector('#education').value,
        },
      });
      surveyForm.reset();
      $('.section').hide();
      $('#formSection3').show();
    } else {
      alert('Please fill (*) required fields');
    }
  },
  false
);

// prepare conatct object's HTML
function contactHtmlFromObject(survey) {
  var html = '';
  html += '<li class="list-group-item contact">';
  html += '<div><p>';
  html +=
    'current Designation : ' + survey.knowPassion.currentDesignation + '<br/>';
  html +=
    'Distrupt Industry : ' + survey.knowPassion.distruptIndustry + '<br/>';
  html += 'Name : ' + survey.knowUser.name + '<br/>';
  html += 'Age : ' + survey.knowUser.age + '<br/>';
  html += 'Gender : ' + survey.knowUser.gender + '<br/>';
  html += 'Location : ' + survey.knowUser.location + '<br/>';
  html += 'Education : ' + survey.knowUser.education;
  html += '</p></div>';
  html += '</li>';
  return html;
}
