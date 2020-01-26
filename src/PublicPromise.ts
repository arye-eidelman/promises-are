type promiseState = 'pending' | 'fulfilled' | 'rejected';

/**
 * @state the current promise state
 * @result the promise result or undefined until the promise settles
 * @promise the passed in promise
 * @returns an PublicPromise with the above properties
 */

export default class PublicPromise<T> {
  public state: promiseState = 'pending';
  public result: T | undefined = undefined;
  public promise: Promise<T>;

  constructor(promise: Promise<T>, onResolveCallback?: (publicPromise: PublicPromise<T>) => void) {
    this.promise = promise;

    promise.then(result => {
      this.state = 'fulfilled';
      this.result = result;
      if (onResolveCallback) {
        onResolveCallback(this);
      }
    });

    promise.catch(reason => {
      this.state = 'rejected';
      this.result = reason;
      if (onResolveCallback) {
        onResolveCallback(this);
      }
    });
  }
}
