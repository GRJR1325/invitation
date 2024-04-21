const firebaseConfig = {
  apiKey: "AIzaSyAh3W8WABur7A9vMTsUfoAbKnyzZQ51stQ",
  authDomain: "contactform-71728.firebaseapp.com",
  databaseURL: "https://contactform-71728-default-rtdb.firebaseio.com",
  projectId: "contactform-71728",
  storageBucket: "contactform-71728.appspot.com",
  messagingSenderId: "405847233945",
  appId: "1:405847233945:web:210d016570126c7dba2f08"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);


function getAssistanceValue() {
  var radios = document.getElementsByName("group1");

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return null; // Si no se selecciona ninguna opción
}

// Function to submit form data
function submitForm(e) {
  e.preventDefault();

  var first_name = getElementVal("first_name");
  var last_name = getElementVal("last_name");
  var message = getElementVal("message");
  var assistance = getAssistanceValue(); // Nuevo

  saveMessages(first_name, last_name, message, assistance);

  // Enable alert
  document.querySelector(".alert").style.display = "block";

  // Remove the alert
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  // Reset the form
  document.getElementById("contactForm").reset();
}

// Function to save form data to Firebase
const saveMessages = (first_name, last_name, message, assistance) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    first_name: first_name,
    last_name: last_name,
    message: message,
    assistance:assistance,
  });
};

// Function to get element value by ID
const getElementVal = (id) => {
  return document.getElementById(id).value;
};

// Function to get the number of records with assistance set to "Si" in Firebase
function getCantidadAssistanceSi() {
  contactFormDB.once('value', function(snapshot) {
    var cantidadAssistanceSi = 0;
    snapshot.forEach(function(childSnapshot) {
      var assistance = childSnapshot.val().assistance;
      if (assistance === "Si") {
        cantidadAssistanceSi++;
      }
    });
    console.log("Cantidad de personas confirmadas: " + cantidadAssistanceSi);
    document.getElementById('cantidadAssistance').textContent = cantidadAssistanceSi;
  });
}

// Llama a getCantidadAssistanceSi después de que la página se ha cargado completamente
window.addEventListener('load', function() {
  getCantidadAssistanceSi();
});


// Fecha de la celebración
var fechaCelebracion = new Date("2024-07-27T00:00:00");

// Función para calcular y mostrar el tiempo restante
function mostrarTiempoRestante() {
  var ahora = new Date();
  var tiempoRestante = fechaCelebracion - ahora;

  var dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
  var horas = Math.floor(
    (tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  var segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

  document.getElementById("dias").innerHTML = dias;
  document.getElementById("horas").innerHTML = horas;
  document.getElementById("minutos").innerHTML = minutos;
  document.getElementById("segundos").innerHTML = segundos;
}

// Actualizar el tiempo restante cada segundo
setInterval(mostrarTiempoRestante, 1000);

// Mostrar el tiempo restante al cargar la página
mostrarTiempoRestante();

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".parallax");
  var instances = M.Parallax.init(elems, {});
});


function habilitarInput() {
  var input = document.getElementById('companion');
  var siSeleccionado = document.getElementById('si').checked;
  input.disabled = !siSeleccionado;
}

document.addEventListener('DOMContentLoaded', function() {
  var elements = document.querySelectorAll('.element');

  window.addEventListener('scroll', function() {
      elements.forEach(function(element) {
          if (isElementInViewport(element)) {
              element.classList.add('visible');
          }
      });
  });

  function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();

      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  }
});


