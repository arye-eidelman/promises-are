import promisesAre from './promisesAre';

describe('promisesAre', () => {
  test('returns a PublicPromise array, with the initial (sync) promises, states, and values', () => {
    expect.assertions(1);
    const promises = [
      Promise.resolve('fulfilled result'),
      Promise.reject('fulfilled result'),
      Promise.resolve().then(() => 'pending result'),
    ];
    return promisesAre(promises, () => true).then(result => {
      expect(result).toMatchObject([
        { promise: promises[0], state: 'fulfilled', result: 'fulfilled result' },
        { promise: promises[1], state: 'rejected', result: 'fulfilled result' },
        { promise: promises[2], state: 'pending', result: undefined },
      ]);
    });
  });

  test('can resolve without awaiting pending promises', () => {
    expect.assertions(1);

    const promise = Promise.resolve().then(() => 'done');
    const inAnyState = () => true;
    return promisesAre([promise], inAnyState).then(result => {
      expect(result).toMatchObject([{ promise, state: 'pending', result: undefined }]);
    });
  });
});
