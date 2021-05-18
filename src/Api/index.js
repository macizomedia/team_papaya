import { Observable } from "rxjs";
import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: '7Ia8dL8h1dD2yr6pR_d49RHaFO-KxM-xyMnYaOP_-VM',
  fetch: nodeFetch,
});


export function fetchData(url) {
  return Observable.create((observer) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        observer.next(data);
        observer.complete();
      })
      .catch((err) => observer.error(err));
  });

}

export const fetchImages = (name) => {
  return Observable.create((observer) => {

    unsplash.search.getPhotos({
      query: name,
      page: 1,
      perPage: 6,
    }).then(data => {
      observer.next(data.response.results);
      observer.complete();
    })
      .catch((err) => observer.error(err))
  })

}