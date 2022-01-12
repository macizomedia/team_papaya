import { map, of } from "rxjs";

import { fromFetch } from "rxjs/fetch";
import { switchMap, catchError } from "rxjs/operators";
const getResult = async (observable) => {
  return new Promise((resolve, reject) => {
    const result = [];

    const subscription = observable.subscribe({
      next: (value) => result.push(value),
      error: reject,
      complete: () => {
        resolve(result);
        /* if (subscription) subscription.unsubscribe(); */
      },
    });
  });
};

describe("basic test", () => {
  it('should return "123"', async () => {
    const observable = of(1, 2, 3).pipe(map((x) => x));
    const result = await getResult(observable);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe("fetch test", () => {
  it('should return "array of 255"', async () => {
    const observable = fromFetch("https://restcountries.com/v3.1/all").pipe(
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
    const result = await getResult(observable);
    expect(result).toHaveLength(1);
  });
});
