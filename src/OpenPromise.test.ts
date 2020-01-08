import OpenPromise from './OpenPromise';

describe('OpenPromise', () => {
  test('.promise returns the original promise', async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve('result text');
      }, 0);
    });
    const openPromise = new OpenPromise(promise);
    expect(openPromise.promise).toBe(promise);
  });

  describe('.state', () => {
    test('is initially pending', async () => {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve('result text');
        }, 0);
      });
      const openPromise = new OpenPromise(promise);
      expect(openPromise.state).toBe('pending');
    });

    test('changes to fulfilled', async () => {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve('result text');
        }, 0);
      });
      const openPromise = new OpenPromise(promise);
      await openPromise.promise.then(() => {
        expect(openPromise.state).toBe('fulfilled');
      });
    });

    test('changes to rejected', async () => {
      const promise = new Promise((_, reject) => {
        setTimeout(() => {
          reject('reject reason');
        }, 0);
      });
      const openPromise = new OpenPromise(promise);
      await openPromise.promise.catch(() => {
        expect(openPromise.state).toBe('rejected');
      });
    });
  });

  describe('.result', () => {
    test('is initially undefined', async () => {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve('result text');
        }, 0);
      });
      const openPromise = new OpenPromise(promise);
      expect(openPromise.result).toBeUndefined();
    });

    test('changes to fulfilled result', async () => {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve('result text');
        }, 0);
      });
      const openPromise = new OpenPromise(promise);
      await openPromise.promise.then(() => {
        expect(openPromise.result).toBe('result text');
      });
    });

    test('changes to rejected reason', async () => {
      const promise = new Promise((_, reject) => {
        setTimeout(() => {
          reject('reject reason');
        }, 0);
      });
      const openPromise = new OpenPromise(promise);
      await openPromise.promise.catch(() => {
        expect(openPromise.result).toBe('reject reason');
      });
    });
  });
});
