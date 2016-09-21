function googleLogin(e){
  e.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');

  firebase.auth().signInWithPopup(provider).then(function(result) {
    if(result.user){
      welcomePage.hide();
      showProfileForm();
    }
  }).catch(function(error) {
    alert('login failed');
  });
}

function writeUserData() {
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
    name: nameField.val(),
    email: emailField.val(),
    phone: phoneField.val(),
    facebook: facebookField.val()
  });
}

function readUserData() {
  firebase.database().ref('users/' + firebase.auth().currentUser.uid).once('value').then(function(snapshot) {
    nameField.val(snapshot.val().name);
    emailField.val(snapshot.val().email);
    phoneField.val(snapshot.val().phone);
    facebookField.val(snapshot.val().facebook);
  });
}

function showProfileForm(){
  user = firebase.auth().currentUser;
  readUserData();
  profileForm.show();
}

var profileForm = $('#profile_form');
var welcomePage = $('#welcome_page');

var googleLoginButton = $('#google_login');
var saveButton = $('#save');

var emailField  = $('#email');
var nameField   = $('#name');
var phoneField  = $('#phone');
var facebookField  = $('#facebook');

jQuery(document).ready(function($) {
  profileForm.hide();
  welcomePage.hide();

  if(firebase.auth().currentUser){
    welcomePage.hide();
    showProfileForm();
  }else{
   profileForm.hide();
   welcomePage.show();
  }

  googleLoginButton.on('click', googleLogin);
  saveButton.on('click', writeUserData);
});








