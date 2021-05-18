import React, { useState, useEffect } from "react";
import { fetchData, fetchImages } from "../../api";
import { Link, Router } from "react-router-dom";
import { useAuthState } from "../../store/index";
import { switchMap, map } from "rxjs/operators";

let URL = "https://restcountries.eu/rest/v2/all";

/* FIRST Import API fetchData Function */
/* Main Fetch Observable from api folder */
const data$ = fetchData(URL);

/* SECOND Pipe data$ and operate over the data */
/* Definition of type of data to Subscribe */
const currencies$ = data$.pipe(
    map((data) => data.map((data) => data.currencies)) /* data to data Array */,
    map((units) => units.flat(2)) /* Flat Array */,
    map((currency) =>
        currency.map((unit) => unit.name)
    ) /* Map over Array of Objects */
);

/* Definition of type of data with switchMap (fetching image from other source) */
const photos$ = data$.pipe(
    map((data) =>
        data.map((data) => data.name.toLowerCase())
    ) /* getting data name to goes to switchMap */,
    switchMap((val) => fetchImages(val)) /* val is country name in lowerCase */,
    map((result) =>
        result.map((photo) => photo.urls)
    ) /* Result is nested look on fetchImages function to see what is result */
);

/* Same as above but getting the entire Photo Object */
const photosArr$ = data$.pipe(
    map((data) => data.map((data) => data.name.toLowerCase())),
    switchMap((val) => fetchImages(val)),
    map((result) =>
        result.flat(2)
    ) /* Flat the result to get an Array of Objects */
);

photosArr$.subscribe(
    console.log
); /* we subscribe here and pass a function to consume the data */

/* CUSTOM HOOK */
/* This hook is called inside the component with and observable and a setState function */
const useObservable = (observable, setFunc) => {
    useEffect(() => {
        let subscription = observable.subscribe((result) => {
            setFunc(result);
        });
        return () => subscription.unsubscribe();
    }, [observable, setFunc]);
};

/* Component */

const Home = ({ history }) => {
  const { currentUser } = useAuthState()
  const [currencies, setCurrencies] = useState([])
  const [photos, setPhotos] = useState()
  /* THIRD Use useObservable hook to set data to component state */
  /* Using Custom Hooks to consume data a feed the state */
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
        {/* USE pre tag and JSON.Stringify to Understand data structure */}
        <pre>{JSON.stringify(currencies, null, 4)}</pre>
      </Router>
    </>
  );
};
export default Home;
