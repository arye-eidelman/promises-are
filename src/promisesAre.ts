type promiseState = 'pending' | 'fulfilled' | 'rejected';

/**
 * @promises promises who's state you care about.
 * @are a callback that should return true when the promises are in the desired state.
 * @returns a promise when the promises are in the desired state.
 */

export default function promisesAre(
  promises: Array<Promise<any>>,
  are: (promises: Array<Promise<any>>, states: promiseState[]) => boolean,
): Promise<{
  promises: Array<Promise<any>>;
  results: any[];
  states: promiseState[];
}> {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    const states: promiseState[] = new Array(promises.length).fill('pending');
    let resolved: boolean = false;

    // Every time one of the promises resolve the are callback is called.
    // if it returns true then this promise will fulfill.
    const onStateChange = (result: any, index: number, state: promiseState) => {
      if (!resolved) {
        results[index] = result;
        states[index] = 'fulfilled';
        if (are(promises, states)) {
          resolve({ promises, results, states });
          resolved = true;
        }
      }
    };

    promises.forEach((promise, index) => {
      promise.then(result => onStateChange(result, index, 'fulfilled'));
      promise.catch(result => onStateChange(result, index, 'rejected'));
    });
  });
}
