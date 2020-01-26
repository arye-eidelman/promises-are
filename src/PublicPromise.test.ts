import PublicPromise from './PublicPromise';

describe('PublicPromise', () => {
  describe('.promise', () => {
    test('returns the original promise', () => {
      const promise = Promise.resolve('result text');
      const publicPromise = new PublicPromise(promise);
      expect(publicPromise.promise).toBe(promise);
    });
  });

  describe('.state', () => {
    test('is initially pending', () => {
      const promise = Promise.resolve('result text');
      const publicPromise = new PublicPromise(promise);
      expect(publicPromise.state).toBe('pending');
    });

    test('changes to fulfilled when promise fulfills', () => {
      expect.assertions(1);
      const promise = Promise.resolve('result text');
      const publicPromise = new PublicPromise(promise);
      return promise.then(() => {
        expect(publicPromise.state).toBe('fulfilled');
      });
    });

    test('changes to rejected when promise rejects', () => {
      expect.assertions(1);
      const promise = Promise.reject('reject reason');
      const publicPromise = new PublicPromise(promise);
      return promise.catch(() => {
        expect(publicPromise.state).toBe('rejected');
      });
    });
  });

  describe('.result', () => {
    test('is initially undefined', () => {
      const promise = Promise.resolve('result text');
      const publicPromise = new PublicPromise(promise);
      expect(publicPromise.result).toBeUndefined();
    });

    test('changes to fulfilled result when promise fulfills', () => {
      expect.assertions(1);
      const promise = Promise.resolve('result text');
      const publicPromise = new PublicPromise(promise);
      return promise.then(() => {
        expect(publicPromise.result).toBe('result text');
      });
    });

    test('changes to rejected reason when promise rejects', () => {
      expect.assertions(1);
      const promise = Promise.reject('reject reason');
      const publicPromise = new PublicPromise(promise);
      return promise.catch(() => {
        expect(publicPromise.result).toBe('reject reason');
      });
    });
  });
});
