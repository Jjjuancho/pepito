
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    {
      path: '/about/',
      url: 'about.html',
    },
    {
      path: '/regform/',
      url: 'formulario.html',
    },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});



$$(document).on('page:init', '.page[data-name="regform"]', function (e) {

  $$("#rok").on("click", function () {


    var varmail = $$('#email').val()
    var varpw = $$('#pw').val()


    console.log(varmail)
    console.log(varpw)

    firebase.auth().createUserWithEmailAndPassword(varmail, varpw)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("ok")
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.error(errorMessage)
      });
  })
})