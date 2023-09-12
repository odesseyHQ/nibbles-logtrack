# How to Fix instanceof Not Working For Custom Errors in TypeScript

source: https://dannyguo.medium.com/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript-1df978100a27

In JavaScript, you can create custom errors by extending the built-in Error object (ever since ES 2015).

```js
class DatabaseError extends Error {}
```

You can do the same thing in TypeScript, but there is an important caveat if your tsconfig.json has a compilation target of ES3 or ES5. In that case, instanceof doesn't work, which breaks any logic that is based on whether or not an error is a case of the custom error.

```ts
class DatabaseError extends Error {}

const error = new DatabaseError('Unique constraint violation');

// prints "true"
console.log(error instanceof Error);
// incorrectly prints "false"
console.log(error instanceof DatabaseError);
```

You can try this out yourself in the TypeScript playground. This is a known issue that started with TypeScript version 2.1. The recommended fix is to manually set the prototype in the constructor.

```ts
class DatabaseError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

const error = new DatabaseError('Unique constraint violation');

// both print "true" now
console.log(error instanceof Error);
console.log(error instanceof DatabaseError);
```

Any custom errors which further extend DatabaseError still need the same adjustment.

```ts
class DatabaseError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

class DatabaseConnectionError extends DatabaseError {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}

const error = new DatabaseConnectionError('Invalid credentials');

// all print "true"
console.log(error instanceof Error);
console.log(error instanceof DatabaseError);
console.log(error instanceof DatabaseConnectionError);
```

## Upgrade the Compilation Target

Remember that this is only an issue if your compilation target is ES3 or ES5. Instead of having to remember to set the prototype, you could consider upgrading your target to ES 2015 or even later. ES 2015 has over 97% browser support, so it may be a reasonable choice for you, especially if you are okay with dropping support for Internet Explorer.
