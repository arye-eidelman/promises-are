import promisesAre from './promisesAre';

describe('promisesAre', () => {
  test('one resolved promise returns correctly', async () => {
    const promises = [Promise.resolve().then(() => 'done')];
    const done = await promisesAre(promises, () => true);
    expect(done).toMatchObject({ promises, states: ['fulfilled'], results: ['done'] });
  });

  test('one pending promise returns correctly', async () => {
    const promises = [
      new Promise(resolve => {
        setTimeout(() => {
          resolve('foo');
        }, 50);
      }),
    ];
    const done = await promisesAre(promises, () => true);
    expect(done).toMatchObject({ promises, states: ['pending'], results: ['foo'] });
  });

  test("one pending promise doesn't return early", async () => {
    const promises = [
      new Promise(resolve => {
        setTimeout(() => {
          resolve('foo');
        }, 50);
      }),
    ];
    let done = false;
    promisesAre(promises, () => true).then(result => {
      done = true;
    });
    setTimeout(() => {
      expect(done).toBe(false);
    }, 10);
  });
});
