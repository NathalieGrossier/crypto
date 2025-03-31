import { fetchData } from '../lib/functions.js';

window.addEventListener('DOMContentLoaded', () => {
  let loading = true;
  let tabGames = [];
  fetchData({ route: '/games?key=de462d1e145d44e084148f017bf5976d&dates=2019-09-01,2019-09-30&platforms=18,1,7' })
    .then((data) => {
      return data.results;
    })
    .then((data) => {
      loading = !loading;
      tabGames = [...tabGames, data];
      create(loading, tabGames[0]);
    });
});

function create(loading, tabGames) {
  if (!loading) {
    console.log(tabGames);
    const cryptos = document.querySelector('#cryptos');
    const container = document.createElement('div');
    container.setAttribute('id', 'content-games');
    cryptos.appendChild(container);
    tabGames.map((game) => {
      // for (let i = 0; i < tabGames.length; i += 2) {
      // let pair = tabGames.slice(i, i + 2);
      const divArea = document.createElement('div');
      container.appendChild(divArea);
      // pair.map((game) => {
      const card = document.createElement('div');
      card.setAttribute('class', 'game-card');
      const imgGame = document.createElement('img');
      imgGame.setAttribute('src', game.background_image);
      imgGame.setAttribute('alt', `Image du jeu ${game.name}`);
      const avatarGame = document.createElement('img');
      avatarGame.setAttribute('src', game.short_screenshots[1].image);
      avatarGame.setAttribute('alt', `Image du jeu ${game.name}`);
      const headerCard = document.createElement('div');
      const nameGame = document.createElement('h3');
      nameGame.textContent = `${game.name.length >= 10 ? game.name.substring(0, 10) + '...' : game.name}`;
      const dateGame = document.createElement('span');
      dateGame.textContent = `${game.released}`;
      headerCard.append(nameGame, dateGame);
      card.append(headerCard, imgGame, avatarGame);
      divArea.append(card);
      // });
      // console.log(pair);
    });
  } else {
    console.log('loading ...');
  }
}

// // Remplacez ces variables par votre ID utilisateur et votre Access Token
// const userId = '9373620262735171'; // Remplacez par l'ID de l'utilisateur Instagram
// const accessToken = 'IGAAONIxeRyZBZABZAFBDNzBBaFJmTDlOT05VNWpnaC1HN0hCM3NDMlk2ZAjVPS0ZAPandxX2s4Y0NWVUU5VTlvamw2R2Y0cDNOTUhIZA2tHYmhoejF2UmtaZAjJCSTNCdmlmQ3hMckF5NDVrRWFkRl80ZAE1mOFczNGxJcGYwSzFROVZA0UQZDZD'; // Remplacez par votre Access Token

// // URL de l'API pour récupérer les publications Instagram
// const apiUrl = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`;

// async function fetchInstagramPosts() {
//   try {
//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     // Affichage de la réponse brute pour débogage
//     console.log(data);

//     if (data && data.data) {
//       // Parcours des posts récupérés
//       data.data.forEach((post) => {
//         displayPost(post);
//         console.log(post);
//       });
//     } else {
//       console.error("Aucun post trouvé ou erreur dans la réponse de l'API.");
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération des posts Instagram:', error);
//   }
// }

// // Fonction pour afficher chaque post sur la page
// function displayPost(post) {
//   const postsContainer = document.getElementById('contact');

//   // Création d'un élément de post
//   const postElement = document.createElement('div');
//   postElement.classList.add('post');

//   // Création de l'image ou vidéo
//   let mediaElement;
//   if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
//     mediaElement = document.createElement('img');
//     mediaElement.src = post.media_url;
//     mediaElement.alt = post.caption || 'Instagram Post';
//   } else if (post.media_type === 'VIDEO') {
//     mediaElement = document.createElement('video');
//     mediaElement.controls = true;
//     const videoSource = document.createElement('source');
//     console.log('ok');
//     videoSource.src = post.media_url;
//     videoSource.type = 'video/mp4';
//     mediaElement.appendChild(videoSource);
//   }

//   // Ajout de l'image/vidéo au post
//   postElement.appendChild(mediaElement);

//   // Légende du post
//   const caption = document.createElement('p');
//   caption.textContent = post.caption || 'Pas de légende';
//   postElement.appendChild(caption);

//   // Lien vers le post sur Instagram
//   const postLink = document.createElement('a');
//   postLink.href = post.permalink;
//   postLink.target = '_blank';
//   postLink.textContent = 'Voir sur Instagram';
//   postElement.appendChild(postLink);

//   // Ajout du post à la page
//   postsContainer.appendChild(postElement);
// }

// // Appel de la fonction pour récupérer et afficher les posts Instagram
// fetchInstagramPosts();
