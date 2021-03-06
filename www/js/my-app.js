
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
    {
      path: '/regini/',
      url: 'Iniciosesion.html',
    },
    {
      path: '/index/',
      url: 'index.html',
    },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});




var db = firebase.firestore();
var colUsuarios = db.collection("Usuarios");

var nombre, apellido, telefono, fechanacimiento, genero, tipousuario;


$$(document).on('page:init', '.page[data-name="regform"]', function (e) {

  $$("#rok").on("click", function () {


    var varmail = $$('#email').val()
    var varpw = $$('#pw').val()


    console.log(varmail)
    console.log(varpw)

    firebase.auth().createUserWithEmailAndPassword(varmail, varpw)
      .then((userCredential) => {
        // Signed in

        // ACA ESTA CREADO OK EL USUARIO EN AUTH

        // VAMOS A GUARDAR SUS DATOS EN LA DB---> FIRESTORE
        nombre = $$("#rNombre").val();
        apellido = $$("#rApellido").val();
        telefono = $$("#rTelefono").val();
        fechanacimiento = $$("#rfe").val();
        genero = $$("#rgen").val();
        tipousuario = $$("#rus").val();

        var datos = {
          nombre: nombre,
          apellido: apellido,
          telefono: telefono,
          fechanacimiento: fechanacimiento,
          genero: genero,
          tipousuario: tipousuario
        }

        colUsuarios.doc(varmail).set(datos)
          .then(() => {
            console.log("datosok");
          })
          .catch((error) => {

          })


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


$$(document).on('page:init', '.page[data-name="regini"]', function (e) {

  $$("#rokk").on("click", function () {

    var varmaili = $$('#emaili').val()
    var varpwi = $$('#pwi').val()

    console.log(varmaili)
    console.log(varpwi)

    firebase.auth().signInWithEmailAndPassword(varmaili, varpwi)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
        console.log('ok')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorMessage)
      });

  })
})
