import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { GalleryAPI } from './galleryApi';
import { createCardsMarkup } from './galleryImg';

const refs = {
  searchFormEl: document.querySelector('#search-form'),
  searchBtnEl: document.querySelector('.js-search-btn'),
  containerGalleryEl: document.querySelector('.gallery'),
  loadMoreBtnEl: document.querySelector('.js-load-more'),
};

const galleryAPI = new GalleryAPI();

refs.searchFormEl.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onSearchFormSubmit(event) {
  event.preventDefault();
  galleryAPI.query = event.target.elements.searchQuery.value;
  galleryAPI.page = 1;
  try {
    const { data } = await galleryAPI.getPicturesByQuery();
    refs.containerGalleryEl.innerHTML = createCardsMarkup(data.hits);

    setTimeout(() => {
      const { height: cardHeight } = document
        .querySelector('.js-gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }, 100);

    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      event.target.reset();
      refs.loadMoreBtnEl.classList.add('is-hidden');
      refs.searchBtnEl.disabled = false;
      refs.containerGalleryEl.innerHTML = '';
      return;
    } else {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    if (data.totalHits > galleryAPI.per_page) {
      refs.loadMoreBtnEl.classList.remove('is-hidden');
      new SimpleLightbox('.gallery a');
    }

    const total = Math.ceil(
      Number(data.totalHits) / Number(galleryAPI.per_page)
    );

    if (total === data.per_page) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtnEl.classList.add('is-hidden');
    }
  } catch (error) {
    if (!response.ok) {
      if (error.response.status === 404) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      throw new Error(response.status);
    }
    console.log(error);
  }
}

async function onLoadMoreBtnClick(event) {
  galleryAPI.page += 1;
  try {
    const { data } = await galleryAPI.getPicturesByQuery();
    refs.containerGalleryEl.insertAdjacentHTML(
      'beforeend',
      createCardsMarkup(data.hits)
    );

    setTimeout(() => {
      const { height: cardHeight } = document
        .querySelector('.js-gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }, 100);

    new SimpleLightbox('.gallery a').refresh();

    const total = Math.ceil(
      Number(data.totalHits) / Number(galleryAPI.per_page)
    );

    if (galleryAPI.page >= total) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      refs.loadMoreBtnEl.classList.add('is-hidden');
    }
  } catch (error) {
    if (!response.ok) {
      if (error.response.status === 404) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      throw new Error(response.status);
    }
    console.log(error);
  }
}
