import React, { useState, useEffect } from "react";
import { fetchData, fetchImages } from "../../api";
import { Link, Router } from "react-router-dom";
import { useAuthState } from "../../store/index";
import { switchMap, map, take, takeWhile, filter, flatMap } from "rxjs/operators";

let URL = 'https://restcountries.eu/rest/v2/all';

const data$ = fetchData(URL);

const currencies$ = data$.pipe(
  map(data => data.map(data => data.currencies)),
  map(units => units.flat(2)),
  map(currency => currency.map(unit => unit.name))
)

const photos$ = data$.pipe(
  map(data => data.map(data => data.name.toLowerCase())),
  switchMap(val => fetchImages(val)),
  map(result => result.map(photo => photo.urls))
)

const photosArr$ = data$.pipe(
  map(data => data.map(data => data.name.toLowerCase())),
  switchMap(val => fetchImages(val)),
  map(result => result.flat(2))
)

photosArr$.subscribe(console.log)


/* CUSTOM HOOK */
const useObservable = (observable, setFunc) => {
  useEffect(() => {
    let subscription = observable.subscribe(result => {
      setFunc(result)
    })
    return () => subscription.unsubscribe()
  }, [observable, setFunc])
}

/* Component */

const Home = ({ history }) => {
  const { currentUser } = useAuthState()
  const [currencies, setCurrencies] = useState([])
  const [photos, setPhotos] = useState()

  useObservable(photosArr$, setPhotos)
  useObservable(currencies$, setCurrencies)

  return (
    <>
      <h1>ADMIN</h1>
      {/* {photos ? (photos.map(unit => (<img key={unit.raw} src={unit.full}></img>))
      ) :(null)} */}
      {photos ? (
        photos.map(photo => 
          (<img key={photo.id} src={photo.urls.full} alt={photos.alt_description}></img>)
        )
      ) : (null)}
      <Router history={history}>
        <p>Currently logged as {currentUser.user}</p>
        <pre>{JSON.stringify(currencies, null, 4)}</pre>
      </Router>
    </>
  );
};

export default Home;
