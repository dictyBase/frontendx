# @dictybase/fp-ts-loom

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](../../LICENSE)

Reusable [fp-ts](https://gcanti.github.io/fp-ts/) and [React 19](https://react.dev/) algebraic primitives — monoidal views, wrapper & state endomorphisms, predicate-guarded event handlers, and lazy `IO` effects. Woven on top of `fp-ts`; importable by any `dictyBase` package or application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Modules](#modules)
- [Usage](#usage)
  - [Void monoid](#void-monoid)
  - [ReactNode monoid & intercalation](#reactnode-monoid--intercalation)
  - [Views (horizontal composition)](#views-horizontal-composition)
  - [Endomorphisms & wrappers (vertical & state composition)](#endomorphisms--wrappers-vertical--state-composition)
  - [Event handlers & predicate guards](#event-handlers--predicate-guards)
  - [Lazy IO effects & cleanups](#lazy-io-effects--cleanups)
- [Pipelines](#pipelines)
  - [Metadata row from optional fields](#metadata-row-from-optional-fields)
  - [Predicate-guarded form submission](#predicate-guarded-form-submission)
  - [Provider flattening & setState transitions](#provider-flattening--setstate-transitions)
  - [Declarative useEffect lifecycle](#declarative-useeffect-lifecycle)
- [Project Structure](#project-structure)
- [Development](#development)
- [License](#license)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (24.x in CI)
- [Yarn](https://classic.yarnpkg.com/) 1.22+ (`corepack yarn`)
- [React](https://react.dev/) 19 & [TypeScript](https://www.typescriptlang.org/) 5
- [fp-ts](https://gcanti.github.io/fp-ts/) `^2.16.1`

## Install

Add the workspace dependency to an application or package `package.json`:

```json
{
  "dependencies": {
    "@dictybase/fp-ts-loom": "*",
    "fp-ts": "^2.16.1",
    "react": "19.*"
  }
}
```

Then link workspaces from the repository root:

```bash
yarn
```

Import from the root barrel or from focused subpath entrypoints:

```ts
import {
  MonoidNode,
  getViewMonoid,
  when,
  foldEffects,
} from "@dictybase/fp-ts-loom"
import { getHandlerMonoid } from "@dictybase/fp-ts-loom/handler"
```

## Modules

| Module         | Algebraic Base                                | Exports                                                                                                                                                         |
| :------------- | :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `void`         | `Semigroup<void>`, `Monoid<void>`             | `SemigroupVoid`, `MonoidVoid`                                                                                                                                   |
| `node`         | `Monoid<ReactNode>`, `Semigroup<ReactNode>`   | `MonoidNode`, `intercalateNode`, `foldNodes`, `joinNodes`, `fromOptionNode`, `whenNode`                                                                         |
| `view`         | `Reader<P, ReactNode>`                        | `View`, `getViewSemigroup`, `getViewMonoid`, `foldViews`, `intercalateViews`, `contramapView`, `wrapView`, `guardView`                                          |
| `endomorphism` | `Endomorphism<ReactNode>`, `Endomorphism<A>`  | `Wrapper`, `MonoidWrapper`, `MonoidWrapperOuter`, `getEndomorphismMonoid`, `foldEndomorphisms`, `foldWrappers`, `nestWrappers`, `whenEndomorphism`, `buildFrom` |
| `handler`      | `Reader<E, void>`, `Endomorphism<Handler<E>>` | `Handler`, `getHandlerMonoid`, `foldHandlers`, `when`, `contramapHandler`                                                                                       |
| `effect`       | `IO<void>`, `IO<IO<void>>`                    | `Cleanup`, `Effect`, `MonoidCleanup`, `MonoidEffect`, `foldCleanups`, `foldEffects`, `fromMount`, `whenEffect`                                                  |

> **Note:** every combinator is implemented purely with `fp-ts` (`pipe`, `Option.fromPredicate`, `Option.match`, `boolean.match`, `ReadonlyArray.matchLeft`, `Monoid.concatAll`, `Semigroup.intercalate`) — zero imperative `if` statements, loops, ternaries, or `null` values.

## Usage

Each snippet shows the module import and a representative call; outputs and rendered JSX structures are shown in inline comments.

### Void monoid

`MonoidVoid` (`concat: constVoid`, `empty: undefined`) turns unit-returning callbacks into composable monoids when lifted through `Reader.getMonoid` (`Handler<E>`) or `IO.getMonoid` (`Cleanup`).

```ts
import { concatAll as MconcatAll } from "fp-ts/Monoid"
import { MonoidVoid, SemigroupVoid } from "@dictybase/fp-ts-loom/void"

SemigroupVoid.concat(undefined, undefined) // undefined
MonoidVoid.empty // undefined
MconcatAll(MonoidVoid)([]) // undefined
```

### ReactNode monoid & intercalation

`MonoidNode` concatenates `ReactNode` values inside `<>{first}{second}</>` with `<></>` as `empty`. `intercalateNode` builds a separated `Semigroup<ReactNode>` via `Semigroup.intercalate`.

```tsx
import { fromNullable as OfromNullable } from "fp-ts/Option"
import {
  MonoidNode,
  intercalateNode,
  foldNodes,
  joinNodes,
  fromOptionNode,
  whenNode,
} from "@dictybase/fp-ts-loom/node"

MonoidNode.concat(<span>DBS01</span>, <span>axeA2</span>)
// <><span>DBS01</span><span>axeA2</span></>

const dotSemigroup = intercalateNode(<span> · </span>)
dotSemigroup.concat(<span>PubMed</span>, <span>DOI</span>)
// <><span>PubMed</span><><span> · </span><span>DOI</span></></>

foldNodes([<span>A</span>, <span>B</span>]) // <><span>A</span><span>B</span></>
foldNodes([]) // <></>

const joinComma = joinNodes(<span>, </span>)
joinComma([]) // <></> (no stray comma)
joinComma([<span>Smith</span>]) // <span>Smith</span>
joinComma([<span>Smith</span>, <span>Lee</span>]) // "Smith, Lee"

fromOptionNode(OfromNullable(undefined)) // <></> (never null)
whenNode(false)(() => <ExpensiveBadge />) // <></> (thunk never called)
```

### Views (horizontal composition)

Every pure React component `(properties: P) => ReactNode` is already a `View<P>` (`Reader<P, ReactNode>`). `getViewMonoid` and `getViewSemigroup` compose multiple views horizontally over the same `P` without creating wrapper glue components.

```tsx
import { pipe } from "fp-ts/function"
import {
  type View,
  getViewMonoid,
  getViewSemigroup,
  foldViews,
  intercalateViews,
  contramapView,
  wrapView,
  guardView,
} from "@dictybase/fp-ts-loom/view"
import { intercalateNode } from "@dictybase/fp-ts-loom/node"

type Strain = {
  readonly id: string
  readonly label: string
  readonly inStock: boolean
}

const IdView: View<Strain> = ({ id }) => <code>{id}</code>
const LabelView: View<Strain> = ({ label }) => <strong>{label}</strong>

// Horizontal monoid fold
const HeaderView = foldViews([IdView, LabelView])
HeaderView({ id: "DBS0235764", label: "axeA2", inStock: true })
// -> <code>DBS0235764</code><strong>axeA2</strong>

// Separated horizontal semigroup
const SeparatedView = getViewSemigroup<Strain>(intercalateNode(" — ")).concat(
  IdView,
  LabelView,
)
SeparatedView({ id: "DBS0235764", label: "axeA2", inStock: true })
// -> "DBS0235764 — axeA2"

// Guard + wrap + contravariant adaptation
const StockBadgeView = pipe(
  ({ id }: Strain) => <span>In Stock ({id})</span>,
  wrapView((node) => <aside className="badge">{node}</aside>),
  guardView(({ inStock }) => inStock),
  contramapView((row: { readonly strain: Strain }) => row.strain),
)
StockBadgeView({ strain: { id: "DBS01", label: "axeA2", inStock: false } }) // <></>
```

### Endomorphisms & wrappers (vertical & state composition)

`Wrapper` (`Endomorphism<ReactNode>`) models vertical JSX wrapping, while `Endomorphism<S>` models pure state/properties transitions (`setState(updater)`).

| Monoid                       | Fold helper         | Evaluation of `[first, second]` on `x`     | Best suited for                    |
| :--------------------------- | :------------------ | :----------------------------------------- | :--------------------------------- |
| `MonoidWrapper`              | `foldWrappers`      | `second(first(x))` (inner-to-outer `flow`) | Bottom-up decorator pipelines      |
| `MonoidWrapperOuter`         | `nestWrappers`      | `first(second(x))` (outer-to-inner tree)   | Flattening React provider pyramids |
| `getEndomorphismMonoid<S>()` | `foldEndomorphisms` | `second(first(x))` (left-to-right `flow`)  | Sequencing `setState` transitions  |

```tsx
import type { Endomorphism } from "fp-ts/Endomorphism"
import {
  type Wrapper,
  foldEndomorphisms,
  nestWrappers,
  whenEndomorphism,
  buildFrom,
} from "@dictybase/fp-ts-loom/endomorphism"

// Flatten nested providers in natural top-down tree order
const withTheme: Wrapper = (node) => <ThemeProvider>{node}</ThemeProvider>
const withRouter: Wrapper = (node) => <MemoryRouter>{node}</MemoryRouter>
const withShell = nestWrappers([withTheme, withRouter])
withShell(<App />) // <ThemeProvider><MemoryRouter><App /></MemoryRouter></ThemeProvider>

// Sequence pure state transitions for React setState
const increment: Endomorphism<number> = (n) => n + 1
const clampMaxTen = whenEndomorphism<number>((n) => n > 10)(() => 10)
const nextCount = foldEndomorphisms([increment, clampMaxTen])
nextCount(4) // 5
nextCount(10) // 10

// Build a configuration object from one input via pure Endomorphism recipes
type Query = { readonly page: number; readonly search: string }
type Filter = {
  readonly offset: number
  readonly limit: number
  readonly term: string
}

const filterOf = buildFrom<Query, Filter>({ offset: 0, limit: 20, term: "" }, [
  ({ page }) =>
    (f) => ({ ...f, offset: (page - 1) * f.limit }),
  ({ search }) =>
    (f) => ({ ...f, term: search.trim() }),
])
filterOf({ page: 3, search: " sadA " }) // { offset: 40, limit: 20, term: "sadA" }
```

### Event handlers & predicate guards

`Handler<E>` (`Reader<E, void>`) turns React callbacks (`onClick`, `onChange`, `onSubmit`) into a monoid via `getHandlerMonoid`. `when` (`<E>(predicate: Predicate<E>) => Endomorphism<Handler<E>>`) guards any handler purely through `Option.fromPredicate` + `Option.match(constVoid, handler)`, unlocking `fp-ts/Predicate` algebra (`getMonoidAll`, `getMonoidAny`, `contramap`, `and`, `or`, `not`).

```tsx
import type { ChangeEvent, KeyboardEvent } from "react"
import { pipe } from "fp-ts/function"
import { concatAll as MconcatAll } from "fp-ts/Monoid"
import {
  contramap as Pcontramap,
  getMonoidAll as PgetMonoidAll,
  not as Pnot,
  type Predicate,
} from "fp-ts/Predicate"
import {
  type Handler,
  getHandlerMonoid,
  foldHandlers,
  when,
  contramapHandler,
} from "@dictybase/fp-ts-loom/handler"

const isEnterKey: Predicate<KeyboardEvent> = (event) => event.key === "Enter"
const isComposing: Predicate<KeyboardEvent> = (event) =>
  event.nativeEvent.isComposing
const isPlainShiftless: Predicate<KeyboardEvent> = (event) => !event.shiftKey

const shouldSubmitOnKey = MconcatAll(PgetMonoidAll<KeyboardEvent>())([
  isEnterKey,
  pipe(isComposing, Pnot),
  isPlainShiftless,
])

const preventDefault: Handler<KeyboardEvent> = (event) => {
  event.preventDefault()
}
const submitDraft: Handler<KeyboardEvent> = () => {
  // dispatch submit
}

const handleKeyDown = pipe(
  foldHandlers([preventDefault, submitDraft]),
  when(shouldSubmitOnKey),
)
// Runs preventDefault -> submitDraft on unmodified Enter; no-op otherwise.

// Adapt a domain handler to a DOM ChangeEvent via contramapHandler
const setQuery: Handler<string> = (query) => {
  // update state
}
const handleSearchChange = pipe(
  setQuery,
  when(
    pipe(
      (text: string) => text.length <= 100,
      Pcontramap((q: string) => q),
    ),
  ),
  contramapHandler(
    (event: ChangeEvent<HTMLInputElement>) => event.target.value,
  ),
)
```

### Lazy IO effects & cleanups

`Cleanup` (`IO<void>`) and `Effect` (`IO<IO<void>>`) model React `useEffect` lifecycles as pure lazy descriptions. Constructing or folding `Effect` values performs zero work; invoking the composed `Effect` inside `useEffect(() => effect(), dependencies)` runs every mount action in order, returns one combined `Cleanup` thunk, and satisfies `react-hooks/exhaustive-deps`.

```tsx
import { useEffect } from "react"
import { pipe } from "fp-ts/function"
import { when } from "@dictybase/fp-ts-loom/handler"
import {
  type Effect,
  foldEffects,
  fromMount,
  whenEffect,
} from "@dictybase/fp-ts-loom/effect"

const trackImpression = (slug: string): Effect =>
  fromMount(() => {
    console.info("viewed", slug)
  })

const subscribeEscape =
  (onClose: () => void): Effect =>
  () => {
    const listener = (event: globalThis.KeyboardEvent) => {
      pipe(
        onClose,
        when((keyEvent: globalThis.KeyboardEvent) => keyEvent.key === "Escape"),
      )(event)
    }
    window.addEventListener("keydown", listener)
    return () => {
      window.removeEventListener("keydown", listener)
    }
  }

const ModalShortcuts = ({
  open,
  slug,
  onClose,
}: {
  readonly open: boolean
  readonly slug: string
  readonly onClose: () => void
}) => {
  useEffect(
    () =>
      pipe(
        foldEffects([trackImpression(slug), subscribeEscape(onClose)]),
        whenEffect(open),
      )(),
    [open, slug, onClose],
  )
  return <div role="dialog">Modal Content</div>
}
```

## Pipelines

These four pipelines combine primitives across modules with `pipe` to build complete, branch-free React + `fp-ts` flows.

### Metadata row from optional fields

Optional citation fields map into `Option<ReactNode>`, `RA.compact` drops missing entries, `joinNodes` intercalates `" · "` only between present nodes, and `wrapView` frames the composed `View<Citation>`:

```tsx
import { pipe } from "fp-ts/function"
import { fromNullable as OfromNullable, map as Omap } from "fp-ts/Option"
import { compact as RAcompact } from "fp-ts/ReadonlyArray"
import { joinNodes, type View, wrapView } from "@dictybase/fp-ts-loom"

type Citation = {
  readonly authors: string
  readonly year: string
  readonly pubmedId?: string
  readonly doi?: string
}

const CitationLine: View<Citation> = pipe(
  (citation: Citation) =>
    pipe(
      [
        OfromNullable(citation.authors),
        pipe(
          OfromNullable(citation.year),
          Omap((year) => `(${year})`),
        ),
        pipe(
          OfromNullable(citation.pubmedId),
          Omap((id) => (
            <a href={`https://pubmed.ncbi.nlm.nih.gov/${id}`}>PMID: {id}</a>
          )),
        ),
        pipe(
          OfromNullable(citation.doi),
          Omap((doi) => <a href={`https://doi.org/${doi}`}>DOI</a>),
        ),
      ],
      RAcompact,
      joinNodes(<span> · </span>),
    ),
  wrapView((node) => <p className="citation-row">{node}</p>),
)
// Missing pubmedId or doi drops out cleanly together with its " · " separator.
```

### Predicate-guarded form submission

Combine atomic domain predicates with `P.getMonoidAll` + `P.contramap`, fold side-effecting handlers with `foldHandlers`, and guard the whole pipeline with `when`.

```tsx
import type { FormEvent } from "react"
import { pipe } from "fp-ts/function"
import { concatAll as MconcatAll } from "fp-ts/Monoid"
import {
  contramap as Pcontramap,
  getMonoidAll as PgetMonoidAll,
  not as Pnot,
  type Predicate,
} from "fp-ts/Predicate"
import { foldHandlers, when, type Handler } from "@dictybase/fp-ts-loom"

type OrderDraft = {
  readonly email: string
  readonly itemCount: number
  readonly submitting: boolean
}

const hasAtSign: Predicate<string> = (value) => value.includes("@")
const hasPositiveItems: Predicate<number> = (count) => count > 0

const isReadyToSubmit: Predicate<OrderDraft> = MconcatAll(
  PgetMonoidAll<OrderDraft>(),
)([
  pipe(
    hasAtSign,
    Pcontramap((draft: OrderDraft) => draft.email),
  ),
  pipe(
    hasPositiveItems,
    Pcontramap((draft: OrderDraft) => draft.itemCount),
  ),
  pipe(({ submitting }: OrderDraft) => submitting, Pnot),
])

const createSubmitHandler = (
  draft: OrderDraft,
  onValidSubmit: Handler<OrderDraft>,
): Handler<FormEvent<HTMLFormElement>> =>
  foldHandlers([
    (event) => {
      event.preventDefault()
    },
    () => {
      pipe(onValidSubmit, when(isReadyToSubmit))(draft)
    },
  ])
```

### Provider flattening & setState transitions

`nestWrappers` collapses provider pyramids, while `foldEndomorphisms` + `whenEndomorphism` compose atomic state updaters for `useState`.

```tsx
import { useState } from "react"
import type { Endomorphism } from "fp-ts/Endomorphism"
import {
  foldEndomorphisms,
  nestWrappers,
  whenEndomorphism,
  type Wrapper,
} from "@dictybase/fp-ts-loom"

type CartState = {
  readonly items: ReadonlyArray<string>
  readonly capacityReached: boolean
}

const MAX_CART_ITEMS = 12

const appendStrain =
  (strainId: string): Endomorphism<CartState> =>
  (state) => ({
    ...state,
    items: [...state.items, strainId],
  })

const syncCapacityFlag: Endomorphism<CartState> = (state) => ({
  ...state,
  capacityReached: state.items.length >= MAX_CART_ITEMS,
})

const addStrainTransition = (strainId: string): Endomorphism<CartState> =>
  whenEndomorphism<CartState>(({ items }) => items.length < MAX_CART_ITEMS)(
    foldEndomorphisms([appendStrain(strainId), syncCapacityFlag]),
  )

const withCartLayout: Wrapper = nestWrappers([
  (node) => <main>{node}</main>,
  (node) => <section className="cart-panel">{node}</section>,
])

const AddStrainButton = ({ strainId }: { readonly strainId: string }) => {
  const [cart, setCart] = useState<CartState>({
    items: [],
    capacityReached: false,
  })
  return withCartLayout(
    <button
      type="button"
      disabled={cart.capacityReached}
      onClick={() => setCart(addStrainTransition(strainId))}>
      Add ({cart.items.length}/{MAX_CART_ITEMS})
    </button>,
  )
}
```

### Declarative useEffect lifecycle

`MonoidEffect` composes multiple independent subscriptions and mount-only effects into a single `useEffect` call while keeping hook invocation unconditional via `whenEffect`.

```tsx
import { useEffect } from "react"
import { pipe } from "fp-ts/function"
import {
  foldEffects,
  fromMount,
  whenEffect,
  type Effect,
} from "@dictybase/fp-ts-loom"

const lockBodyScroll: Effect = () => {
  const previousOverflow = document.body.style.overflow
  document.body.style.overflow = "hidden"
  return () => {
    document.body.style.overflow = previousOverflow
  }
}

const announceDialog = (title: string): Effect =>
  fromMount(() => {
    document.title = title
  })

const useDialogLifecycle = (isOpen: boolean, title: string): void => {
  useEffect(
    () =>
      pipe(
        foldEffects([lockBodyScroll, announceDialog(title)]),
        whenEffect(isOpen),
      )(),
    [isOpen, title],
  )
}
```

## Project Structure

```
packages/fp-ts-loom/
├── src/
│   ├── void.ts                  # SemigroupVoid, MonoidVoid
│   ├── node.tsx                 # MonoidNode, intercalateNode, foldNodes, joinNodes, fromOptionNode, whenNode
│   ├── view.ts                  # View, getViewSemigroup, getViewMonoid, foldViews, intercalateViews, contramapView, wrapView, guardView
│   ├── endomorphism.ts          # Wrapper, MonoidWrapper, MonoidWrapperOuter, getEndomorphismMonoid, foldEndomorphisms, foldWrappers, nestWrappers, whenEndomorphism, buildFrom
│   ├── handler.ts               # Handler, getHandlerMonoid, foldHandlers, when, contramapHandler
│   ├── effect.ts                # Cleanup, Effect, MonoidCleanup, MonoidEffect, foldCleanups, foldEffects, fromMount, whenEffect
│   ├── index.ts                 # Public barrel exports
│   └── __tests__/               # Law and React integration unit tests
│       ├── void.test.ts
│       ├── node.test.tsx
│       ├── view.test.tsx
│       ├── endomorphism.test.tsx
│       ├── handler.test.tsx
│       └── effect.test.tsx
├── .oxlintrc.json
├── package.json
├── README.md
├── setup.ts
├── tsconfig.json
└── vitest.config.ts
```

## Development

Run all package checks from the monorepo root using Yarn workspaces:

```bash
# Run unit & algebraic law tests
yarn workspace @dictybase/fp-ts-loom test

# Run tests with coverage
yarn workspace @dictybase/fp-ts-loom coverage

# Type-check
yarn workspace @dictybase/fp-ts-loom typecheck

# Lint with Oxlint
yarn workspace @dictybase/fp-ts-loom oxlint

# Lint with ESLint
yarn workspace @dictybase/fp-ts-loom lint
```

## License

BSD-2-Clause. See [LICENSE](../../LICENSE).
