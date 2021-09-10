/* ******* Menu *********** */
((d)=>{
  const $btnMenu = d.querySelector(".menu-btn"), 
  $menu = d.querySelector(".menu");
  $btnMenu.addEventListener('click', (e)=>{
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e)=>{
    if(!e.target.matches(".menu a")) return false;
    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);


/** ContactForm **/
((d)=>{
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit",(e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/soporte@sistematicosenterprise.com",{
      method:"POST",
      body: new FormData(e.target)
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
      console.log(json);      
      location.hash = "#gracias"
      $form.reset();
    })
    .catch(err => {
      console.log(err);
      let message = err.statusText || "Ocurrió un Error al intentar enviar sus Datos, Por favor Intente Nuevamente "
      $response.querySelector("h3").innerHTML = `Error ${err.status}: ${message}`;      
    }).finally(() =>{
      $loader.classList.add("none");
      setTimeout(() => {
        location.hash = "#close";
      }, 3000);
    });
  });
  
})(document);


/* ********* slider auto ************ */

const TIEMPO_INTERVALO = 5;
let instancia_intervalo = null;
let contador = 1;
let slider;
document.addEventListener('DOMContentLoaded', init);

function init(){
    const containerSlider = document.querySelector('.container-slider');
    const arrowRight = document.querySelector('.arrow-slider-right');
    const arrowLeft = document.querySelector('.arrow-slider-left');
    slider = document.querySelectorAll('.slider-content');
    readySlider();
    containerSlider.addEventListener('mouseenter',stopAnimated);
    containerSlider.addEventListener('mouseleave',continueAnimated);
    arrowRight.addEventListener('click',nextImage);
    arrowLeft.addEventListener('click',prevImage);
  }

function readySlider(){
    instancia_intervalo = setInterval(() => moveImage(slider), TIEMPO_INTERVALO * 1000);
}

function stopAnimated(){
  clearInterval(instancia_intervalo);  
}

function continueAnimated(){
  readySlider();
}

function nextImage(){
  moveImage();
}

function prevImage(){
  contador-=2;
  moveImage();
}

function moveImage(){
  validarContador();
  slider.forEach(element => {
      element.style.transform = `translateX(${contador*-100}vw)`;
  });
  contador++;
}

function validarContador(){
  if(contador >= slider.length){
    contador = 0;
  } else if (contador < 0){
    contador = slider.length - 1;
  }
}