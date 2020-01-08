import OpenPromise from './OpenPromise';

type promiseState = 'pending' | 'fulfilled' | 'rejected';

/**
 * @promises promises who's state you care about.
 * @are a callback that should return true when the promises are in the desired state.
 * @returns a promise when the promises are in the desired state.
 */

export default function promisesAre<T>(
  promises: Array<Promise<T>>,
  are: (promises: Array<Promise<T>>, states: promiseState[], results: Array<T | undefined>) => boolean,
  options: { shortCircuit: boolean } = { shortCircuit: true },
): Promise<{
  promises: Array<Promise<T>>;
  results: Array<T | undefined>;
  states: promiseState[];
}> {
  return new Promise((resolve, reject) => {
    let states: promiseState[];
    let results: Array<T | undefined>;
    let openPromises: Array<OpenPromise<T>>;
    let resolved: boolean = false;

    const updateState = () => {
      if (!(options.shortCircuit && resolved)) {
        results = openPromises.map((openPromise: OpenPromise<T>) => openPromise.result);
        states = openPromises.map((openPromise: OpenPromise<T>) => openPromise.state);
        if (are(promises, states, results)) {
          resolve({ promises, states, results });
          resolved = true;
        }
      }
    };

    openPromises = promises.map((promise: Promise<T>) => new OpenPromise(promise, updateState));
  });
}
