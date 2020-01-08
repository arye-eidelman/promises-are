type promiseState = 'pending' | 'fulfilled' | 'rejected';

/**
 * @state the current promise state
 * @result the promise result or undefined until the promise settles
 * @promise the passed in promise
 * @returns an OpenPromise with the above properties
 */

export default class OpenPromise<T> {
  public state: promiseState = 'pending';
  public result: T | undefined = undefined;
  public promise: Promise<T>;

  constructor(promise: Promise<T>, resolveCallback?: (openPromise: OpenPromise<T>) => any) {
    this.promise = promise;

    promise.then(result => {
      this.state = 'fulfilled';
      this.result = result;
      if (resolveCallback) {
        resolveCallback(this);
      }
    });

    promise.catch(reason => {
      this.state = 'rejected';
      this.result = reason;
      if (resolveCallback) {
        resolveCallback(this);
      }
    });
  }
}
