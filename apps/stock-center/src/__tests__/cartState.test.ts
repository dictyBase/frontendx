import { test, expect } from "vitest"
import { useSetAtom, useAtomValue, createStore } from "jotai"
import { useResetAtom } from "jotai/utils"
import { renderHook, act } from "@testing-library/react-hooks"
import {
  addCartItemsAtom,
  removeItemAtom,
  strainItemsAtom,
  plasmidItemsAtom,
  cartAtom,
  initialCart,
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
