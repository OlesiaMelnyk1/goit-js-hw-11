'use strict';
import axios from 'axios';

export class GalleryAPI {
  static BASE_URL = 'https://pixabay.com/api';
  static API_KEY = '33175901-e09247312919de26dfad47d53';

  constructor() {
    this.page = 1;
    this.query = '';
    this.per_page = 40;
  }

  getPicturesByQuery() {
    const searchParams = new URLSearchParams({
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: this.page,
      per_page: this.per_page,
      key: GalleryAPI.API_KEY,
    });

    return axios.get(`${GalleryAPI.BASE_URL}/?${searchParams}`);
  }
}
