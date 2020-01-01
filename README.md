# promises-are

## Creates a promise for when a group of promises are in a specific state

A tool for creating promises that'll fulfill or reject based on the state of an array of promises.
Similar to Promise.all and Promise.any,
While allowing more finer control over when/if it'll fulfill or reject via a callback function.
The callback will be called every time any of the promises state changes.

## This is a work in progress, Nothing is ready yet

If this interests you I would be glad to collaborate on this project.

You can subscribe to releases on github.

## Planned api

The api might look like this:

```typescript
type promiseState = "pending" | "fulfilled" | "rejected"

/**
 * @promises promises who's state you care about.
 * @are a callback that should return true when the promises are in the desired state.
 * @returns a promise when the promises are in the desired state.
 */
function promisesAre(
  promises: Promise<any>[],
  are: (promises: Promise<any>[], states: promiseState[]) => Boolean
): Promise<{
  promises: Promise<any>[],
  states: promiseState[],
  results: any[]
}> {

  // Every time one of the promises resolve the are callback is called.
  // if it returns true then this promise will fulfill.

  // example return value
  return Promise.resolve({
    promises: promises,
    states:  ["pending", "fulfilled", "rejected"    ],
    results: [null,      { data: {}}, "error reason"]
  })
}

```

Some usage examples:

- `Promises are mostly done`,

  ```javascript
  promisesAre(promises, areMostlyDone).then(/* */)
  ```

- `Promises are mostly done with a 90 percent success rate`,

  ```javascript
  promisesAre(promises, areMostlyDoneWithA90PercentSuccessRate).then(/* */)
  ```

- `promises have a high error rate (with substantial sample size)`,

  ```javascript
  promisesAre(promises, haveaHighErrorRate).then(/* */)
  ```
