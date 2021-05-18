import React, { useState, useEffect } from "react";
import { fetchData, fetchImages } from "../../api";
import { Link, Router } from "react-router-dom";
import { useAuthState } from "../../store/index";
import { switchMap, map, take, takeWhile, filter, flatMap } from "rxjs/operators";

let URL = 'https://restcountries.eu/rest/v2/all';

const data$ = fetchData(URL); // Turn the Observable on!

  const newData = data$.pipe(
    map(data => data.map(data => data.currencies)),
    map(currencies => currencies.flat(2)),
    map(currency => currency.map(unit => unit.name))
  )


const observer$ = data$.pipe(
  map(data => data.map(data => data.name.toLowerCase())),
  switchMap(val => fetchImages(val)),
  map(result => result.map(photo => photo.urls))
)

const useObservable = (observable, setFunc) => {
  useEffect(() => {
    let subscription = observable.subscribe(result => {
    setFunc(result)})
    return () => subscription.unsubscribe()

  },[observable,setFunc])
}


const Home = ({ history }) => {
  const { currentUser } = useAuthState()
  const [country, setCountry] = useState([])
  const [photos, setPhotos] = useState([])
  
  useObservable(observer$, setPhotos)
  useObservable(newData, setCountry)

  return (
    <>
      <h1>ADMIN</h1>
      <Router history={history}>
        <p>Currently logged as {currentUser.user}</p>
        <pre>{JSON.stringify(photos, null, 4)}</pre>
        <pre>{JSON.stringify(country, null, 4)}</pre>
      </Router>
    </>
  );
};

const observer$ = data$.pipe(
    map((data) => data.map((data) => data.name.toLowerCase())),
    switchMap((val) => fetchImages(val)),
    map((result) => result.map((photo) => photo.urls))
);
const useObservable = (observable, setFunc) => {
    useEffect(() => {
        let subscription = observable.subscribe((result) => {
            setFunc(result);
        });
        return () => subscription.unsubscribe();
    }, [observable, setFunc]);
};
const Home = ({ history }) => {
    const { currentUser } = useAuthState();
    const [country, setCountry] = useState([]);
    const [photos, setPhotos] = useState([]);
    useObservable(observer$, setPhotos);
    return (
        <>
            <h1>ADMIN</h1>
            <Router history={history}>
                <p>Currently logged as {currentUser.user}</p>
                <pre>{JSON.stringify(photos, null, 4)}</pre>
            </Router>
        </>
    );
};
export default Home;
