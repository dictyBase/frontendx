import { test, expect } from "vitest"
import { useSetAtom, useAtomValue, createStore } from "jotai"
import { renderHook, act } from "@testing-library/react-hooks"
import {
  addCartItemsAtom,
  removeItemAtom,
  strainItemsAtom,
  plasmidItemsAtom,
  cartAtom,
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
  const { result: plsamidItemsHookResult } = renderHook(() =>
    useAtomValue(plasmidItemsAtom),
  )

  expect(plsamidItemsHookResult.current).toHaveLength(0)

  act(() => {
    addCartItemHookResult.current([mockPlasmidCartItem])
  })

  expect(plsamidItemsHookResult.current).toHaveLength(1)
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
