# is-es5-identifier-name

> Check if provided string is an `IdentifierName` as specified in ECMA262 edition 5.1 section 7.6.

## Installation

```bash
yarn add @prettier/is-es5-identifier-name
```

## Usage

```js
import isEs5IdentifierName from '@prettier/is-es5-identifier-name';

isEs5IdentifierName("fisker")
// -> true

isEs5IdentifierName("16")
// -> false
```
