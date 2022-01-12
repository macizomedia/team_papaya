import React, { useEffect, useState } from "react";
import { countries, fetchImages, image$ } from "../../api";
import { of, BehaviorSubject, zip } from "rxjs";
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  catchError,
  concatMap,
  tap,
} from "rxjs/operators";

// create a Subject instance
export default function index() {
  const [state, setState] = useState({
    countries: [],
    photos: [],
    img: [],
    loading: false,
    errorMessage: "",
    noResults: false,
  });

  const [subject, setSubject] = useState(null);
  let name = countries("name");

  const photo = (query) =>
    fetchImages(query)
      .then((result) => result.urls.regular)
      .finally((data) => data);

  const search = (query) =>
    name(query).pipe(
      map((data) => data.map((data) => data.name.common.toLowerCase())),
      map((data) => data.map((item) => photo(item))),
      mergeMap((photos) => zip(...photos)),
      catchError((err) => {
        if (err.status === 403) {
          return of([]);
        }
        setState({ ...state, errorMessage: err.message });
        return of([]);
      })
    );

  const image = (query) =>
    image$(query, "blue").pipe(
      map((data) => data),
      tap((data) => console.log(data)),
      catchError((err) => {
        if (err.status === 403) {
          return of([]);
        }
        setState({ ...state, errorMessage: err.message });
        return of([]);
      })
    );

  useEffect(() => {
    if (subject === null) {
      const sub = new BehaviorSubject("");
      setSubject(sub);
    } else {
      const observable = subject
        .pipe(
          map((s) => s.trim()),
          distinctUntilChanged(),
          filter((s) => s.length >= 3),
          debounceTime(200),
          mergeMap((value) => zip(name(value), search(value), image(value))),
          concatMap(([countries, photos, image]) => {
            if (photos.error) {
              return of({ error: true, message: photos.message });
            } else {
              return of({
                error: false,
                countries: countries,
                photos: photos,
                img: image.results,
                loading: false,
              });
            }
          }),
          catchError((e) => ({
            loading: false,
            errorMessage: "An application error occured",
          }))
        )
        .subscribe((newState) => {
          console.log(newState);
          setState((s) => Object.assign({}, s, newState));
        });

      return () => {
        observable.unsubscribe();
        subject.unsubscribe();
      };
    }
  }, [subject]);

  const onChange = (e) => {
    if (subject) {
      return subject.next(e.target.value);
    }
  };
  return (
    <div className="input-control">
      <input
        className="input-large mb-3"
        key="random1"
        id="inputSearch"
        onChange={onChange}
        placeholder={"search country"}
      />

      {state.loading && <div>Loading...</div>}
      {state.errorMessage && <div>{state.errorMessage}</div>}
      {state.noResults && <div>No results found</div>}
      {state.countries.length > 0 && (
        <ul>
          {state.countries.map((country) => (
            <li key={country.cca2}>{country.name.common}</li>
          ))}
        </ul>
      )}
      {state.photos.length > 0 && (
        <ul>
          {state.photos.map((photo) => (
            <li key={photo.id}>
              <img src={photo} alt="country" />
            </li>
          ))}
        </ul>
      )}
      {state.img.length > 0 && (
        <ul>
          {state.img.map((img) => (
            <li key={img.id}>
              <img src={img.urls.regular} alt="country" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
