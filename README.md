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

### `debounce`

Delays function execution until after a pause. Returns a Promise-based debounced function with a `.cancel()` method.

```ts
import { debounce } from "@trevortu/ts-utils";

const search = debounce((query: string) => fetchResults(query), 300);

const result = await search("hello"); // fires after 300ms of no calls
search.cancel(); // cancels pending invocation
```

### `deepFreeze`

Recursively freezes an object and all nested objects. Returns a `DeepReadonly` type. Handles circular references.

```ts
import { deepFreeze } from "@trevortu/ts-utils";

const config = deepFreeze({ api: { url: "https://example.com", retries: 3 } });
config.api.retries = 5; // TypeScript error!
```

### `toPascalCase`

Capitalises the first letter of each word and lowercases the rest.

```ts
import { toPascalCase } from "@trevortu/ts-utils";

toPascalCase("hello world"); // "Hello World"
toPascalCase("FOO_BAR baz"); // "Foo_Bar Baz"
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
