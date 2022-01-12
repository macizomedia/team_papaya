import React, { useState, useEffect } from "react";
import { fetchData, fetchImages } from "../../api";
import { Router } from "react-router-dom";
import { useAuthState } from "../../store/index";
import { switchMap, map, tap } from "rxjs/operators";

const data$ = fetchData();

const countries$ = data$.pipe(
  map((data) => data.map((data) => data)),
  tap((data) => console.log(data))
);

/* Definition of type of data with switchMap (fetching image from other source) */
// eslint-disable-next-line
const photos$ = data$.pipe(
  map((data) =>
    data.map((data) => data.name.toLowerCase())
  ) /* getting data name to goes to switchMap */,
  switchMap((val) => fetchImages(val)) /* val is country name in lowerCase */,
  map((result) =>
    result.map((photo) => photo.urls)
  ) /* Result is nested look on fetchImages function to see what is result */
);

/* Same as above but getting the entire Photo Object 
const photosArr$ = data$.pipe(
  map((data) => data.map((data) => data.name.toLowerCase())),
  switchMap((val) => fetchImages(val)),
  map((result) =>
    result.flat(2)
  ) /* Flat the result to get an Array of Objects 
);
*/

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
  const { currentUser } = useAuthState();
  const [countries, setCountries] = useState([]);
  /* THIRD Use useObservable hook to set data to component state */
  /* Using Custom Hooks to consume data a feed the state */
  useObservable(countries$, setCountries);

  return (
    <>
      <h1>ADMIN</h1>

      <Router history={history}>
        <p>Currently logged as {currentUser.user}</p>
        {/* USE pre tag and JSON.Stringify to Understand data structure */}
        {countries.map((country) => (
          <pre key={country.cca2}>{JSON.stringify(country.name.common)}</pre>
        ))}
      </Router>
    </>
  );
};
export default Home;
