import { of } from "rxjs";
import { createApi } from "unsplash-js";
import { switchMap, catchError } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import nodeFetch from "node-fetch";

const unsplash = createApi({
  accessKey: "7Ia8dL8h1dD2yr6pR_d49RHaFO-KxM-xyMnYaOP_-VM",
  fetch: nodeFetch,
});

const API = "https://restcountries.com/v3.1/";

export function fetchData() {
  return fromFetch("https://restcountries.com/v3.1/all").pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return of({ error: true, message: `Error ${response.status}` });
      }
    }),
    catchError((err) => {
      console.error(err);
      return of({ error: true, message: err.message });
    })
  );
}

export const countries = (endpoint) => (query) =>
  fromFetch(API + endpoint + "/" + query).pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return of({ error: true, message: `Error ${response.status}` });
      }
    }),
    catchError((err) => {
      console.error(err);
      return of({ error: true, message: err.message });
    })
  );

export const fetchImages = async (name) => {
  const result = await unsplash.search.getPhotos({
    query: name,
    page: 1,
    perPage: 6,
  });
  const firstPhoto = result.response.results[0];

  return firstPhoto;
};

export const searchImg = (query, color) => {
  unsplash.search
    .getPhotos({
      query: query,
      page: 1,
      perPage: 10,
      color: color,
      orientation: "portrait",
    })
    .then((result) => {
      switch (result.type) {
        case "error":
          console.log("error occurred: ", result.errors[0]);
        case "success":
          const photo = result.response;
          console.log(photo);
          return photo;
        default:
          console.log("something went wrong");

          break;
      }
    });
};

export const image$ = (query, color) => {
  return fromFetch(
    `https://api.unsplash.com/search/photos?client_id=7Ia8dL8h1dD2yr6pR_d49RHaFO-KxM-xyMnYaOP_-VM&query=${query}&color=${color}&orientation=portrait
    `
  ).pipe(
    switchMap((response) => response.json()),
    catchError((err) => {
      console.error(err);
      return of({ error: true, message: err.message });
    })
  );
};
