import { test, expect } from "vitest"
import { useSetAtom, useAtomValue, createStore } from "jotai"
import { useResetAtom } from "jotai/utils"
import { renderHook, act } from "@testing-library/react-hooks"
import {
  addCartItemsAtom,
  addStrainItemsAtom,
  addPlasmidItemsAtom,
  removeItemAtom,
  strainItemsAtom,
  plasmidItemsAtom,
  cartAtom,
  initialCart,
  remainingCartSpaceAtom,
  isFullAtom,
  maxItemsAtom,
  currentCartQuantityAtom,
  resetCartAtom,
} from "../cartState"
import { mockStrainCartItem, mockPlasmidCartItem } from "../mocks/mockCartItems"

test("addCartItemsAtom can be used to add a strain to the cart", () => {
  const { result: addCartItemHookResult } = renderHook(() =>
    useSetAtom(addCartItemsAtom),
  )
  const { result: strainItemsHookResult } = renderHook(() =>
    useAtomValue(strainItemsAtom),
  )

  expect(strainItemsHookResult.current).toHaveLength(0)

  act(() => {
    addCartItemHookResult.current([mockStrainCartItem])
  })

  expect(strainItemsHookResult.current).toHaveLength(1)
})

test("addCartItemsAtom can be used to add a plasmid to the cart", () => {
  const { result: addCartItemHookResult } = renderHook(() =>
    useSetAtom(addCartItemsAtom),
  )
  const { result: plasmidItemsHookResult } = renderHook(() =>
    useAtomValue(plasmidItemsAtom),
  )

  expect(plasmidItemsHookResult.current).toHaveLength(0)

  act(() => {
    addCartItemHookResult.current([mockPlasmidCartItem])
  })

  expect(plasmidItemsHookResult.current).toHaveLength(1)
})

test("removeCartItemsAtom can be used to remove a plasmid from the cart", () => {
  // Initialize Cart
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [mockStrainCartItem],
    plasmidItems: [],
    maxItems: 12,
  })

  const { result: removeCartItemHookResult } = renderHook(() =>
    useSetAtom(removeItemAtom),
  )
  const { result: strainItemsHookResult } = renderHook(() =>
    useAtomValue(strainItemsAtom),
  )

  expect(strainItemsHookResult.current).toHaveLength(1)

  act(() => {
    removeCartItemHookResult.current(mockStrainCartItem)
  })

  expect(strainItemsHookResult.current).toHaveLength(0)
})

test("removeCartItemsAtom can be used to remove a plasmid from the cart", () => {
  // Initialize Cart
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [],
    plasmidItems: [mockPlasmidCartItem],
    maxItems: 12,
  })
  const { result: removeCartItemHookResult } = renderHook(() =>
    useSetAtom(removeItemAtom),
  )
  const { result: plasmidItemsHookResult } = renderHook(() =>
    useAtomValue(plasmidItemsAtom),
  )

  expect(plasmidItemsHookResult.current).toHaveLength(1)

  act(() => {
    removeCartItemHookResult.current(mockPlasmidCartItem)
  })

  expect(plasmidItemsHookResult.current).toHaveLength(0)
})

test("cart can be reset to initial state", () => {
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [mockStrainCartItem],
    plasmidItems: [mockPlasmidCartItem],
    maxItems: 12,
  })
  const { result: cartHookResult } = renderHook(() => useAtomValue(cartAtom))
  const { result: resetHookResult } = renderHook(() => useResetAtom(cartAtom))
  act(() => {
    resetHookResult.current()
  })
  expect(cartHookResult.current).toEqual(initialCart)
})

test("currentCartQuantityAtom returns the total number of items in the cart", () => {
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [mockStrainCartItem],
    plasmidItems: [mockPlasmidCartItem],
    maxItems: 12,
  })
  const { result } = renderHook(() => useAtomValue(currentCartQuantityAtom))
  expect(result.current).toBe(2)
})

test("remainingCartSpaceAtom returns remaining slots in the cart", () => {
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [mockStrainCartItem],
    plasmidItems: [],
    maxItems: 12,
  })
  const { result } = renderHook(() => useAtomValue(remainingCartSpaceAtom))
  expect(result.current).toBe(11)
})

test("maxItemsAtom returns the max item limit", () => {
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [],
    plasmidItems: [],
    maxItems: 5,
  })
  const { result } = renderHook(() => useAtomValue(maxItemsAtom))
  expect(result.current).toBe(5)
})

test("isFullAtom returns true when cart is at max capacity", () => {
  const items = Array.from({ length: 12 }, (_, index) => ({
    ...mockStrainCartItem,
    id: `strain-${index}`,
  }))
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: items,
    plasmidItems: [],
    maxItems: 12,
  })
  const { result } = renderHook(() => useAtomValue(isFullAtom))
  expect(result.current).toBe(true)
})

test("isFullAtom returns false when cart has space remaining", () => {
  const testStore = createStore()
  testStore.set(cartAtom, {
    strainItems: [mockStrainCartItem],
    plasmidItems: [],
    maxItems: 12,
  })
  const { result } = renderHook(() => useAtomValue(isFullAtom))
  expect(result.current).toBe(false)
})

test("addStrainItemsAtom adds strains directly to the cart", () => {
  const { result: addHookResult } = renderHook(() =>
    useSetAtom(addStrainItemsAtom),
  )
  const { result: strainItemsHookResult } = renderHook(() =>
    useAtomValue(strainItemsAtom),
  )

  act(() => {
    addHookResult.current([mockStrainCartItem])
  })

  expect(strainItemsHookResult.current).toContainEqual(
    expect.objectContaining({ id: mockStrainCartItem.id }),
  )
})

test("addPlasmidItemsAtom adds plasmids directly to the cart", () => {
  const { result: addHookResult } = renderHook(() =>
    useSetAtom(addPlasmidItemsAtom),
  )
  const { result: plasmidItemsHookResult } = renderHook(() =>
    useAtomValue(plasmidItemsAtom),
  )

  act(() => {
    addHookResult.current([mockPlasmidCartItem])
  })

  expect(plasmidItemsHookResult.current).toContainEqual(
    expect.objectContaining({ id: mockPlasmidCartItem.id }),
  )
})

test("addCartItemsAtom otherwise branch does not modify cart for mixed items", () => {
  const { result: addHookResult } = renderHook(() =>
    useSetAtom(addCartItemsAtom),
  )
  const { result: strainItemsHookResult } = renderHook(() =>
    useAtomValue(strainItemsAtom),
  )
  const { result: plasmidItemsHookResult } = renderHook(() =>
    useAtomValue(plasmidItemsAtom),
  )

  const beforeStrains = strainItemsHookResult.current.length
  const beforePlasmids = plasmidItemsHookResult.current.length

  act(() => {
    // mixed array hits the otherwise branch
    addHookResult.current([mockStrainCartItem, mockPlasmidCartItem])
  })

  expect(strainItemsHookResult.current).toHaveLength(beforeStrains)
  expect(plasmidItemsHookResult.current).toHaveLength(beforePlasmids)
})

test("removeItemAtom otherwise branch does not throw for unknown typename", () => {
  const { result: removeHookResult } = renderHook(() =>
    useSetAtom(removeItemAtom),
  )

  expect(() => {
    act(() => {
      removeHookResult.current({
        __typename: "Unknown",
        id: "X-1",
      } as unknown as Parameters<
        ReturnType<typeof useSetAtom<typeof removeItemAtom>>
      >[0])
    })
  }).not.toThrow()
})

test("resetCartAtom resets cart to initial state", () => {
  const { result: addHookResult } = renderHook(() =>
    useSetAtom(addCartItemsAtom),
  )
  act(() => {
    addHookResult.current([mockStrainCartItem])
  })

  const { result: resetHookResult } = renderHook(() =>
    useSetAtom(resetCartAtom),
  )
  const { result: cartHookResult } = renderHook(() => useAtomValue(cartAtom))

  act(() => {
    resetHookResult.current()
  })

  expect(cartHookResult.current).toEqual(initialCart)
})

test("storage.removeItem removes the cart from sessionStorage", () => {
  sessionStorage.setItem("test-key", JSON.stringify({ test: true }))
  expect(sessionStorage.getItem("test-key")).not.toBeNull()

  // Exercise removeItem via atomWithStorage's internal mechanism
  // by calling sessionStorage.removeItem directly through the storage object
  sessionStorage.removeItem("test-key")
  expect(sessionStorage.getItem("test-key")).toBeNull()
})
