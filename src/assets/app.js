//Variables para controlar en que estado esta el menu lateral
var is_big_menu = true;
var is_mode_overlay = false;

//Controlo el ancho de la ventanan cuando inicia la página. Para ver en que modo se pone el menu lateral
setScreenMode();

//Detecto cuando se hace clic en la barra de busqueda
//para agregar el icono de buscar y colocar el borde del
//input con algo de estilo en el borde.
var busqueda = document.getElementById("buscar");
busqueda.addEventListener("focus", function () {
  document.getElementsByClassName("icono")[0].style.display = "flex";
  busqueda.parentNode.style.border = "1px solid #0a59b2";
});
busqueda.addEventListener("focusout", function () {
  document.getElementsByClassName("icono")[0].style.display = "none";
  busqueda.parentNode.style.border = "1px solid #ccc";
});

//Agrego funcionalidad al icono bar para ocultar o mostrar el menu
var icono_bar = document.getElementById("icono-bar");
icono_bar.addEventListener("click", function () {
  //controlamos si el ancho de la screen es < a 1100 para establecer
  //la forma que se mostrara la barra leteral.
  //tomo el ancho de la ventana
  var ancho_viewport = window.innerWidth;
  if (ancho_viewport <= 1100) {
    //si el menu no esta superpuesto
    if (is_mode_overlay == false) {
      var bigMenu = document.getElementById("big-menu");
      bigMenu.classList.remove("ocultar");
      bigMenu.classList.add("is-mode-overlay");
      document.getElementById("bar-lateral").style.width = "240px";
      document.getElementById("bar-lateral").style.zIndex = "7";
      document.getElementById("big-menu").style.backgroundColor = "#fff";

      is_mode_overlay = true;
    } else {
      var bigMenu = document.getElementById("big-menu");
      bigMenu.classList.remove("is-mode-overlay");
      bigMenu.classList.add("ocultar");

      is_mode_overlay = false;
    }
  } else {
    //Si el menu esta en modo grande
    if (is_big_menu == true) {
      var bigMenu = document.getElementById("big-menu");
      bigMenu.classList.add("ocultar");

      var littleMenu = document.getElementById("little-menu");
      littleMenu.classList.remove("ocultar");

      document.getElementById("bar-lateral").style.width = "70px";

      var videos = document.getElementById("videos");
      videos.classList.add("max-width-videos");
      is_big_menu = false;
    } else {
      var bigMenu = document.getElementById("big-menu");
      bigMenu.classList.remove("ocultar");

      var littleMenu = document.getElementById("little-menu");
      littleMenu.classList.add("ocultar");

      document.getElementById("bar-lateral").style.width = "240px";

      var videos = document.getElementById("videos");
      videos.classList.remove("max-width-videos");
      is_big_menu = true;
    }
  }
});

//agregmos atributo onmouseover y onmouseleav a cada item
var videos = document.getElementsByClassName("item");
for (var i = 0; i < videos.length; i++) {
  var video = videos[i];
  //console.log(video);
  video.setAttribute("onmouseenter", "bigItem(this)");
  video.setAttribute("onmouseleave", "normalItem(this)");
}

var tiempo_sobre_elemento = 0; // Inicializa el tiempo que el mouse ha estado sobre el elemento a cero
var tiempo_limite = 2000; // Define el tiempo límite en milisegundos (en este ejemplo, 2000 ms = 5 segundos)
function bigItem(item) {
  // Cuando el mouse entra en el elemento, inicia el temporizador
  tiempo_sobre_elemento = setTimeout(function () {
    // Si el tiempo sobre el elemento ha alcanzado el tiempo límite, ejecuta la acción deseada
    //console.log("El mouse ha estado sobre el elemento durante " + tiempo_limite + "ms");
    item.classList.add("on-hover");
  }, tiempo_limite);
}
function normalItem(item) {
  clearTimeout(tiempo_sobre_elemento);
  tiempo_sobre_elemento = 0;
  item.classList.remove("on-hover");
}

//Detecto cuando se redimenciona la ventana para adaptar
//el menu lateral.
window.addEventListener("resize", function () {
  setScreenMode();
});

//Controlo si el ancho de la ventana es menor a 1100px
function setScreenMode() {
  var ancho_viewport = window.innerWidth;
  //console.log("El ancho del viewport es ahora: " + ancho_viewport + "px");
  if (ancho_viewport <= 1100) {
    var bigMenu = document.getElementById("big-menu");
    bigMenu.classList.add("ocultar");

    var littleMenu = document.getElementById("little-menu");
    littleMenu.classList.remove("ocultar");

    document.getElementById("bar-lateral").style.width = "70px";

    var videos = document.getElementById("videos");
    videos.classList.add("max-width-videos");
    is_big_menu = false;
  } else {
    var bigMenu = document.getElementById("big-menu");
    bigMenu.classList.remove("ocultar");

    document.getElementById("bar-lateral").style.width = "240px";

    var videos = document.getElementById("videos");
    videos.classList.remove("max-width-videos");
    is_big_menu = true;

    var littleMenu = document.getElementById("little-menu");
    littleMenu.classList.add("ocultar");
  }
}
