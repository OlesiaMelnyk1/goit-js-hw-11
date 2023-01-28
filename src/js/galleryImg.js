export const createCardsMarkup = data => {
  const galleryCardsArray = data
    .map(element => {
      return `
      <div class="photo-card">
        <a class="gallery-picture" href="${element.largeImageURL}">
          <img class = "picture" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes<br>${element.likes}</b>
          </p>
          <p class="info-item">
            <b>Views<br>${element.views}</b>
          </p>
          <p class="info-item">
            <b>Comments<br>${element.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads<br>${element.downloads}</b>
          </p>
        </div>
      </div>
        `;
    })
    .join('');

  return galleryCardsArray;
};
