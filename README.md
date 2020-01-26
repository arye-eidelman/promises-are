# promises-are

## Creates a promise for when a group of promises are in a specific state

A tool for creating promises that'll fulfill or reject based on the state of an array of promises.
Similar to Promise.all and Promise.any,
While allowing more finer control over when/if it'll fulfill or reject via a callback function.
The callback will be called every time any of the promises state changes.

> > ## This is not yet ready and subject to breaking api changes

## api

### The promisesAre api is specified in [src/promisesAre.ts](./src/promisesAre.ts).

It takes two arguments.  The first one is an array of promises. The second one is a callback function that gets called whenever a promise resolves. It gets an array of publicPromises and should return a boolean to fulfill or reject, or don't return to keep it pending for now.

### The PublicPromise is specified in [src/PublicPromise.ts](./src/PublicPromise.ts).

it's constructor takes a promise and exposes it's current state, the result (or error reason), and the original promise

Note that being that internally this is chaining on promises to get the state and result it will always be pending and undefined respectively when accessed synchronously, for example `new PublicPromise(Promise.resolve('result text')).state` equals pending, even though the promise resolved synchronously.

The same thing can happen if the promise was created in a previous event and now in the current event you create a PublicPromise. You would need to wait for the stack to clear for it to get a chance to read the state. If on the other hand you created the PublicPromise in the previous event, you could read it's result and state now in a synchronous manner.

This makes PublicPromise most useful when it's instantiated at the time of promise creation and not at the time when you want to read the state or result.

## Usage examples

- `Promises are 75% done`.

  ```javascript
  function areMostlyDone(publicPromises) {
    const allStates = publicPromises.map(pp => pp.state)
    const doneStates = allStates.filter(state => state !== "pending")
    const mostlyDone = doneStates.length > allStates.length * 0.75
    if (mostlyDone) {
      return true
    }
  }
  promisesAre(promises, areMostlyDone).then(/* */)
  ```

- `Promises are 75% done with a 90% percent success rate`.

  ```javascript
  function areMostlyDoneWithHighSuccessRate(publicPromises) {
    const allStates = publicPromises.map(pp => pp.state)
    const doneStates = allStates.filter(state => state !== "pending")
    const mostlyDone = doneStates.length > allStates.length * 0.75

    const fulfilledStates = allStates.filter(state => state === "fulfilled")
    const rejectedStates = allStates.filter(state => state === "rejected")
    const highSuccessRate = rejectedStates.length < allStates.length * 0.10

    if (mostlyDone) {
      return highSuccessRate
    }
  }
  promisesAre(promises, areMostlyDoneWithHighSuccessRate).then(/* */)
  ```

- `promises have a 50% error rate (with 10% sample size)`.

  ```javascript
  promisesAre(promises, haveAHighErrorRate).then(/* */)

  function haveAHighErrorRate(publicPromises) {
    const allStates = publicPromises.map(pp => pp.state)
    const doneStates = allStates.filter(state => state !== "pending")
    const tenPercentComplete = doneStates.length > allStates.length * 0.10

    const fulfilledStates = allStates.filter(state => state === "fulfilled")
    const rejectedStates = allStates.filter(state => state === "rejected")
    const highErrorRate = rejectedStates.length > allStates.length * 0.50

    if (tenPercentComplete) {
      return highErrorRate
    }
  }
  promisesAre(promises, haveAHighErrorRate).then(/* */)
  ```
