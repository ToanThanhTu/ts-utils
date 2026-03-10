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

## License

MIT
