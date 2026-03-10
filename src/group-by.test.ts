import { describe, expect, it } from "vitest"
import { groupBy } from "./group-by"

describe("groupBy", () => {
  it("groups items by a string key", () => {
    const items = [
      { name: "Alice", role: "Developer" },
      { name: "Bob", role: "Designer" },
      { name: "Charlie", role: "Developer" },
      { name: "Dave", role: "Tester" },
      { name: "Ether", role: "Designer" },
    ]

    const result = groupBy(items, (item) => item.role)

    expect(result).toEqual({
      Developer: [
        { name: "Alice", role: "Developer" },
        { name: "Charlie", role: "Developer" },
      ],
      Designer: [
        { name: "Bob", role: "Designer" }, 
        { name: "Ether", role: "Designer" },
      ],
      Tester: [{ name: "Dave", role: "Tester" }]
    })
  })

  it("returns an empty object for an empty array", () => {
    const result = groupBy([], (item: string) => item)
    expect(result).toEqual({})
  })

  it("handles single-item groups", () => {
    const items = [1, 2, 3, 4, 5]
    const result = groupBy(
      items, 
      (n) => n % 2 === 0
        ? "even"
        : "odd"
    )

    expect(result).toEqual({
      odd: [1, 3, 5],
      even: [2, 4]
    })
  })

  it("preserves insertion order within groups", () => {
    const items = ["banana", "apple", "blueberry", "avocado", "chia seeds", "watermelon"]
    const result = groupBy(items, (fruit) => fruit[0])

    expect(result["b"]).toEqual(["banana", "blueberry"])
    expect(result["a"]).toEqual(["apple", "avocado"])
    expect(result["c"]).toEqual(["chia seeds"])
    expect(result["w"]).toEqual(["watermelon"])
  })
})