import PublicPromise from './PublicPromise';

type promiseState = 'pending' | 'fulfilled' | 'rejected';

/**
 * @promises promises who's state you care about.
 * @are a callback that should return true when the promises are in the desired state.
 * @returns a promise when the promises are in the desired state.
 */

export default function promisesAre<T>(
  promises: Array<Promise<T>>,
  are: (publicPromises: Array<PublicPromise<T>>) => boolean,
  options: { shortCircuit: boolean } = { shortCircuit: true },
): Promise<Array<PublicPromise<T>>> {
  return new Promise((resolve, reject) => {
    let resolved: boolean = false;

    const updateState = () => {
      if (!resolved || !options.shortCircuit) {
        if (are(publicPromises)) {
          resolve(publicPromises);
          resolved = true;
        }
      }
    };

    const publicPromises: Array<PublicPromise<T>> = promises.map(promise => new PublicPromise(promise, updateState));

    updateState();
  });
}
