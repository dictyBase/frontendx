import { test, expect } from "vitest"
import { ordByUpdatedAt, ordByCreatedAt } from "../utils/ordContent"

const olderItem = {
  id: "1",
  content: "",
  name: "",
  slug: "",
  created_at: "2023-01-01T00:00:00Z",
  updated_at: "2023-06-01T00:00:00Z",
  created_by: { id: "", email: "", first_name: "", last_name: "" },
  updated_by: { id: "", email: "", first_name: "", last_name: "" },
}

const newerItem = {
  id: "2",
  content: "",
  name: "",
  slug: "",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-06-01T00:00:00Z",
  created_by: { id: "", email: "", first_name: "", last_name: "" },
  updated_by: { id: "", email: "", first_name: "", last_name: "" },
}

test("ordByUpdatedAt should return -1 when the first item has an earlier updated_at", () => {
  expect(ordByUpdatedAt.compare(olderItem, newerItem)).toBe(-1)
})

test("ordByUpdatedAt should return 1 when the first item has a later updated_at", () => {
  expect(ordByUpdatedAt.compare(newerItem, olderItem)).toBe(1)
})

test("ordByUpdatedAt should return 0 when both items have the same updated_at", () => {
  expect(ordByUpdatedAt.compare(olderItem, olderItem)).toBe(0)
})

test("ordByCreatedAt should return -1 when the first item has an earlier created_at", () => {
  expect(ordByCreatedAt.compare(olderItem, newerItem)).toBe(-1)
})

test("ordByCreatedAt should return 1 when the first item has a later created_at", () => {
  expect(ordByCreatedAt.compare(newerItem, olderItem)).toBe(1)
})

test("ordByCreatedAt should return 0 when both items have the same created_at", () => {
  expect(ordByCreatedAt.compare(olderItem, olderItem)).toBe(0)
})
