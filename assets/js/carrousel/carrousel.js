import { fetchData } from '../lib/functions.js';

window.addEventListener('DOMContentLoaded', () => {
  fetchData({ route: '/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7' })
    .then((data) => data.results)
    .then((games) => {
      if (games && games.length > 0) {
        createCarrousel(games);
      } else {
        console.error('Aucun carrousel trouvé...');
      }
    });
});

function createCarrousel(games) {
  const carrousel = document.querySelector('.carrousel');
  // créer un slide par objet
  games.forEach((game) => {
    const slide = document.createElement('div');
    slide.className = 'carrousel-slide';
    const imgGame = document.createElement('img');
    imgGame.src = game.background_image; // imgGame.setAttibute('src', game.image_url)
    imgGame.alt = game.name;
    imgGame.addEventListener('click', () => openLightBox(imgGame.src, game.name))
    slide.appendChild(imgGame);
    const caption = document.createElement('div');
    caption.className = 'carrousel-caption';
    caption.textContent = game.name;
    slide.appendChild(caption)
    carrousel.appendChild(slide);
  });


let currentIndex = 0;
const totalSlides = games.length;

function showSlide(index) {
  carrousel.style.transform = `translateX(-${index*100}%)`;
}


const prevButton = document.querySelector('.prev');
prevButton.addEventListener('click', () => {
currentIndex = currentIndex === 0 ? totalSlides -1 : currentIndex -1;
showSlide (currentIndex);
});



const nextButton = document.querySelector('.next');
nextButton.addEventListener('click', () => {
currentIndex = currentIndex === totalSlides -1 ? 0 : currentIndex +1;
showSlide (currentIndex);
});

function calcSlide() {
  currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
  showSlide(currentIndex);
}

let inter;
setTimeout(() => {
  inter = setInterval(calcSlide, 3000);
  carrousel.addEventListener('mouseenter', () => clearInterval(inter));
  carrousel.addEventListener('mouseleave', () => {
    clearInterval(inter);
    inter = setInterval(calcSlide, 3000);
  });
}, 2000);


function openLightBox(src, alt) {
  const lightbox = document.querySelector("#lightbox");
  console.log(lightbox);
  const lightboxImg = document.querySelector("#lightbox-img");
  lightbox.style.display = 'flex';
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  console.log(src);
  }

const closeButton = document.querySelector('.close');
closeButton.addEventListener("click", () => {
const lightbox = document.querySelector("#lightbox");
lightbox.style.display = "none";

});

// // Fonction pour ouvrir la lightbox
// function openLightbox(src, alt) {
//   const lightbox = document.getElementById('lightbox');
//   const lightboxImg = document.getElementById('lightbox-img');
//   //   const captionText = document.getElementById('caption');
//   lightbox.style.display = 'flex';
//   lightboxImg.src = src;
//   //   captionText.textContent = alt;
// }

// // Fonction pour fermer la lightbox
// const closeBtn = document.querySelector('.close');
// closeBtn.addEventListener('click', () => {
//   document.getElementById('lightbox').style.display = 'none';
// });

// Fermer la lightbox en cliquant en dehors de l'image
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    e.currentTarget.style.display = 'none';
  }
});


window.addEventListener('keydown', (e) => prevOrNext(e));
  function prevOrNext(e) {
    if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft' || e.keyCode === 37) {
      prevButton.click();
    } else if (e.key === 'ArrowRight' || e.code === 'ArrowRight' || e.keyCode === 39) {
      nextButton.click();
    } else if (e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
      lightbox.style.display = 'none';
    }
  }
}