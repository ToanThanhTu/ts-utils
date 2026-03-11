# @trevortu/ts-utils

A type-safe TypeScript utility library.

## Installation

```bash
npm install @trevortu/ts-utils
```

## Usage

### `groupBy`

Groups an array of items by a key extracted from each item.

```ts
import { groupBy } from "@trevortu/ts-utils";

const people = [
  { name: "Alice", dept: "Engineering" },
  { name: "Bob", dept: "Marketing" },
  { name: "Charlie", dept: "Engineering" },
];

const grouped = groupBy(people, (p) => p.dept);
// {
//   Engineering: [{ name: "Alice", ... }, { name: "Charlie", ... }],
//   Marketing: [{ name: "Bob", ... }]
// }
```

### `pick`

Picks specific keys from an object.

```ts
import { pick } from "@trevortu/ts-utils";

const user = { name: "Alice", age: 30, email: "alice@example.com" };

const picked = pick(user, ["name", "email"]);
// { name: "Alice", email: "alice@example.com" }
```

## Development

```bash
npm install       # Install dependencies
npm run build     # Build the library
npm run dev       # Build in watch mode
npm run test      # Run tests
npm run test:watch # Run tests in watch mode
npm run typecheck # Type check with tsc
npm run lint      # Validate package with publint and attw
```

## License

MIT
