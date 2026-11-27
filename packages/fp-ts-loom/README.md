# @dictybase/fp-ts-loom

[![License](https://img.shields.io/badge/License-BSD%202--Clause-blue.svg)](../../LICENSE)

Reusable [fp-ts](https://gcanti.github.io/fp-ts/) and [React 19](https://react.dev/) algebraic primitives — monoidal views, wrapper & state endomorphisms, predicate-guarded event handlers, and lazy `IO` effects. Woven on top of `fp-ts`; importable by any `dictyBase` package or application.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Install](#install)
- [Modules](#modules)
- [Usage](#usage)
  - [Effects and cleanups](#effects-and-cleanups)
  - [Void monoid](#void-monoid)
  - [ReactNode monoid & intercalation](#reactnode-monoid--intercalation)
  - [Views (horizontal composition)](#views-horizontal-composition)
  - [Endomorphisms & wrappers (vertical & state composition)](#endomorphisms--wrappers-vertical--state-composition)
  - [Event handlers & predicate guards](#event-handlers--predicate-guards)
  - [Predicates, parsers and errors](#predicates-parsers-and-errors)
  - [Option matching](#option-matching)
  - [String monoids](#string-monoids)
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

Add `monocle-ts` when a package updates record fields with lenses in endomorphism or state pipelines.

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

| Module             | Algebraic Base                                | Exports                                                                                                                                                                                                                                                                             |
| :----------------- | :-------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `void`             | `Semigroup<void>`, `Monoid<void>`             | `SemigroupVoid`, `MonoidVoid`                                                                                                                                                                                                                                                       |
| `node`             | `Monoid<ReactNode>`, `Semigroup<ReactNode>`   | `MonoidNode`, `intercalateNode`, `foldNodes`, `joinNodes`, `fromOptionNode`, `whenNode`                                                                                                                                                                                             |
| `view`             | `Reader<P, ReactNode>`                        | `View`, `getViewSemigroup`, `getViewMonoid`, `foldViews`, `intercalateViews`, `contramapView`, `wrapView`, `guardView`                                                                                                                                                              |
| `endomorphism`     | `Endomorphism<ReactNode>`, `Endomorphism<A>`  | `Wrapper`, `MonoidWrapper`, `MonoidWrapperOuter`, `getEndomorphismMonoid`, `foldEndomorphisms`, `foldWrappers`, `nestWrappers`, `whenEndomorphism`, `buildFrom`                                                                                                                     |
| `handler`          | `Reader<E, void>`, `Endomorphism<Handler<E>>` | `Handler`, `getHandlerMonoid`, `foldHandlers`, `when`, `contramapHandler`                                                                                                                                                                                                           |
| `effect`           | `IO<void>`, `IO<IO<void>>`                    | `Cleanup`, `Effect`, `MonoidCleanup`, `MonoidEffect`, `foldCleanups`, `foldEffects`, `fromMount`, `whenEffect`                                                                                                                                                                      |
| `predicate/ord`    | `Predicate<number>`, `Predicate<string>`      | `intBetween`, `intBetweenInclusive`, `minStringLength`, `maxStringLength`, `stringLengthEq`, `stringEq`, `notEqualString`, `notEqualNumber`                                                                                                                                         |
| `predicate/string` | `Predicate<string>`                           | `containsMatch`, `stringLengthBetween`                                                                                                                                                                                                                                              |
| `predicate/array`  | `Predicate<ReadonlyArray<A>>`                 | `minLength`, `maxLength`, `lengthEq`                                                                                                                                                                                                                                                |
| `error`            | `LoomError<T>`                                | `LoomError`, `constError`                                                                                                                                                                                                                                                           |
| `parse`            | `Either<ParseError, number>`                  | `ParseError`, `parseInt`, `parseFloat`                                                                                                                                                                                                                                              |
| `array`            | `ReadonlyArray.filterMap`                     | `parseWith`                                                                                                                                                                                                                                                                         |
| `matchopt`         | `Option<B>`, `ReadonlyArray.findFirstMap`     | `Case`, `matchCase`, `matchConst`, `matchDefault`, `match`                                                                                                                                                                                                                          |
| `string`           | `Monoid<string>`                              | `separatorMonoid`, `Space`, `Comma`, `Semicolon`, `Colon`, `Label`, `MiddleDot`, `EmDash`, `Newline`, `joinSpace`, `joinComma`, `joinSemicolon`, `joinMiddleDot`, `joinLines`, `collapseWhitespace`, `wrap`, `parens`, `brackets`, `quote`, `period`, `mapNonEmpty`, `concatFields` |

> **Note:** every combinator is implemented purely with `fp-ts` (`pipe`, `Option.fromPredicate`, `Option.match`, `boolean.match`, `ReadonlyArray.matchLeft`, `Monoid.concatAll`, `Semigroup.intercalate`) — zero imperative `if` statements, loops, ternaries, or `null` values.

## Usage

Each snippet shows the module import and a representative call; outputs and rendered JSX structures are shown in inline comments.

### Effects and cleanups

React `useEffect` takes a function that runs mount work and returns a cleanup function:

```ts
type Cleanup = IO<void> // () => void
type Effect = IO<Cleanup> // () => () => void
```

The `effect` module treats `Effect` and `Cleanup` as plain values so you can lift, guard, and sequence them without imperative control flow.

#### fromMount

`fromMount` turns a one-shot action `() => void` into an `Effect` by returning an empty `Cleanup` (`() => undefined`). Use it when a mount action sets a value once and leaves no active listener to remove.

**Signature:** `fromMount: (mount: IO<void>) => Effect`

**Call:** `fromMount(() => { document.title = title })`

```tsx
import { useEffect, type ReactNode } from "react"
import { type Effect, fromMount } from "@dictybase/fp-ts-loom/effect"

type PageTitleProperties = Readonly<{ title: string }>

const setDocumentTitle = (title: string): Effect =>
  fromMount(() => {
    document.title = title
  })

const PageTitle = ({ title }: PageTitleProperties): ReactNode => {
  useEffect(() => setDocumentTitle(title)(), [title])

  return <h1>{title}</h1>
}

export { PageTitle }
```

**Renders:**

```html
<h1>Strain Catalog</h1>
```

**Result:** When `<PageTitle title="Strain Catalog" />` mounts or `title` changes, `document.title` becomes `"Strain Catalog"`. When the effect ends, the empty `Cleanup` returned by `fromMount` does no work.

#### foldEffects

`foldEffects` runs a list of `Effect` values in sequence from first to last, and returns one `Cleanup` that runs every effect's cleanup in that same sequence. One-shot `fromMount` effects and listener `Effect` values have the same `Effect` type, so you can mix both styles in the same list.

**Signature:** `foldEffects: (effects: ReadonlyArray<Effect>) => Effect`

**Call:** `foldEffects([stepOne, mountTwo, stepThree])()`

```ts
import { useEffect } from "react"
import {
  type Effect,
  foldEffects,
  fromMount,
} from "@dictybase/fp-ts-loom/effect"

const trackStep = (stepName: string, log: Array<string>): Effect => {
  const startStep: Effect = () => {
    log.push(`start:${stepName}`)
    return () => {
      log.push(`stop:${stepName}`)
    }
  }
  return startStep
}

const useOrderedSteps = (log: Array<string>): void => {
  useEffect(() => {
    const stepOne = trackStep("first", log)
    const mountTwo = fromMount(() => {
      log.push("mount:second")
    })
    const stepThree = trackStep("third", log)

    return foldEffects([stepOne, mountTwo, stepThree])()
  }, [log])
}

export { useOrderedSteps }
```

**Result:**

- On mount, `log` receives `["start:first", "mount:second", "start:third"]` in sequence.
- On unmount, the returned `Cleanup` runs in sequence (`mountTwo` has an empty cleanup), so `log` becomes `["start:first", "mount:second", "start:third", "stop:first", "stop:third"]`.
- For an empty list, `foldEffects([])` does no work on mount or unmount.

#### whenEffect

`whenEffect` wraps an `Effect` with a boolean condition. When the condition is `true`, the effect runs normally. When the condition is `false`, `whenEffect` returns `MonoidEffect.empty`, so nothing runs on mount or cleanup.

**Signature:** `whenEffect: (condition: boolean) => Endomorphism<Effect>`

**Call:** `pipe(lockBodyScroll, whenEffect(isOpen))()`

```tsx
import { useEffect, useState, type ReactNode } from "react"
import { match as Bmatch } from "fp-ts/boolean"
import { pipe } from "fp-ts/function"
import { type Effect, whenEffect } from "@dictybase/fp-ts-loom/effect"

const lockBodyScroll: Effect = () => {
  const previousOverflow = document.body.style.overflow
  document.body.style.overflow = "hidden"
  return () => {
    document.body.style.overflow = previousOverflow
  }
}

const DialogDemo = (): ReactNode => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => pipe(lockBodyScroll, whenEffect(isOpen))(), [isOpen])

  return (
    <button
      type="button"
      onClick={() => {
        setIsOpen((open) => !open)
      }}>
      {pipe(
        isOpen,
        Bmatch(
          () => "Open dialog",
          () => "Close dialog",
        ),
      )}
    </button>
  )
}

export { DialogDemo }
```

**Renders:**

```html
<button type="button">Open dialog</button>
```

**Result:** Initially `isOpen` is `false`, so `whenEffect(false)` skips `lockBodyScroll` while keeping `useEffect` unconditional. Clicking the button sets `isOpen` to `true`, which locks `document.body.style.overflow` to `"hidden"` until `isOpen` becomes `false` again or the component unmounts.

#### foldCleanups

When one `Effect` sets up two listeners together, `foldCleanups` joins their teardown functions into the single `Cleanup` that the `Effect` returns.

**Signature:** `foldCleanups: (cleanups: ReadonlyArray<Cleanup>) => Cleanup`

**Call:** `foldCleanups([stopMouseMove, stopMouseUp])`

```ts
import { useEffect } from "react"
import {
  type Cleanup,
  type Effect,
  foldCleanups,
} from "@dictybase/fp-ts-loom/effect"

const addDocumentListener = (
  eventName: string,
  listener: EventListener,
): Cleanup => {
  document.addEventListener(eventName, listener)
  return () => {
    document.removeEventListener(eventName, listener)
  }
}

const dragListenersEffect = (
  onMove: EventListener,
  onUp: EventListener,
): Effect => {
  const attachDragListeners: Effect = () => {
    const stopMouseMove = addDocumentListener("mousemove", onMove)
    const stopMouseUp = addDocumentListener("mouseup", onUp)

    return foldCleanups([stopMouseMove, stopMouseUp])
  }
  return attachDragListeners
}

const useDragListeners = (onMove: EventListener, onUp: EventListener): void => {
  useEffect(() => dragListenersEffect(onMove, onUp)(), [onMove, onUp])
}

export { useDragListeners }
```

**Result:** On mount, `dragListenersEffect` attaches `mousemove` and `mouseup` and returns one `Cleanup`. When the effect ends, that `Cleanup` removes `mousemove` first, then `mouseup`.

#### MonoidEffect

`foldEffects` is built on `MonoidEffect`. A monoid joins two values into one value, and it also has an `empty` value so it can join an empty list. Use `MonoidEffect.concat` to join two `Effect` values directly.

**Signature:** `MonoidEffect: Monoid<Effect>`

**Call:** `MonoidEffect.concat(scrollToTop, listenResize)()`

```ts
import { useEffect } from "react"
import {
  type Effect,
  fromMount,
  MonoidEffect,
} from "@dictybase/fp-ts-loom/effect"

const scrollToTop: Effect = fromMount(() => {
  window.scrollTo(0, 0)
})

const listenResizeEffect = (onResize: EventListener): Effect => {
  const attachResize: Effect = () => {
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
    }
  }
  return attachResize
}

const useScrollAndResize = (onResize: EventListener): void => {
  useEffect(
    () => MonoidEffect.concat(scrollToTop, listenResizeEffect(onResize))(),
    [onResize],
  )
}

export { useScrollAndResize }
```

**Result:** On mount, the hook runs `scrollToTop` first, then attaches the `resize` listener. On cleanup, React removes the `resize` listener. `MonoidEffect.empty` is an `Effect` that does no work and returns an empty `Cleanup`.

#### MonoidCleanup

`foldCleanups` is built on `MonoidCleanup`. Use `MonoidCleanup.concat` inside an `Effect` to join two `Cleanup` functions into one `Cleanup`.

**Signature:** `MonoidCleanup: Monoid<Cleanup>`

**Call:** `MonoidCleanup.concat(stopClick, stopKeyDown)`

```ts
import { useEffect } from "react"
import {
  type Cleanup,
  type Effect,
  MonoidCleanup,
} from "@dictybase/fp-ts-loom/effect"

const addDocumentListener = (
  eventName: string,
  listener: EventListener,
): Cleanup => {
  document.addEventListener(eventName, listener)
  return () => {
    document.removeEventListener(eventName, listener)
  }
}

const closeMenuListenersEffect = (
  onClickOutside: EventListener,
  onEscape: EventListener,
): Effect => {
  const attachCloseListeners: Effect = () => {
    const stopClick = addDocumentListener("click", onClickOutside)
    const stopKeyDown = addDocumentListener("keydown", onEscape)

    return MonoidCleanup.concat(stopClick, stopKeyDown)
  }
  return attachCloseListeners
}

const useCloseMenuListeners = (
  onClickOutside: EventListener,
  onEscape: EventListener,
): void => {
  useEffect(
    () => closeMenuListenersEffect(onClickOutside, onEscape)(),
    [onClickOutside, onEscape],
  )
}

export { useCloseMenuListeners }
```

**Result:** On mount, the effect attaches `click` and `keydown`. On cleanup, the joined `Cleanup` removes `click` first, then `keydown`. `MonoidCleanup.empty` is a `Cleanup` that does no work.

#### Building blocks

The `effect` helpers come from `MonoidVoid` in the `void` module:

- `MonoidCleanup` is `IOgetMonoid(MonoidVoid)`.
- `MonoidEffect` is `IOgetMonoid(MonoidCleanup)`.
- `foldCleanups` is `MconcatAll(MonoidCleanup)`.
- `foldEffects` is `MconcatAll(MonoidEffect)`.

The next section, [Void monoid](#void-monoid), shows `SemigroupVoid` and `MonoidVoid`.

### Void monoid

The `void` module joins two things that return nothing into one thing that returns nothing. The `effect` and `handler` modules build their monoids from it.

#### SemigroupVoid

A semigroup joins two values into one value. It can also join a list of values, if the list has at least one value. Lift `SemigroupVoid` with `RgetSemigroup` to join event handlers.

**Signature:** `SemigroupVoid: Semigroup<void>`

**Call:** `ClickHandlerSemigroup.concat(closeMenu, clearSelection)`

```ts
import type { MouseEvent } from "react"
import { getSemigroup as RgetSemigroup } from "fp-ts/Reader"
import { SemigroupVoid } from "@dictybase/fp-ts-loom/void"

type SetMenuOpen = (open: boolean) => void
type ClearSelection = () => void
type ClickHandler = (event: MouseEvent) => void

const ClickHandlerSemigroup = RgetSemigroup<MouseEvent, void>(SemigroupVoid)

const makeResetHandler = (
  setIsOpen: SetMenuOpen,
  clearSelection: ClearSelection,
): ClickHandler => {
  const closeMenu: ClickHandler = () => {
    setIsOpen(false)
  }
  const resetCell: ClickHandler = () => {
    clearSelection()
  }

  return ClickHandlerSemigroup.concat(closeMenu, resetCell)
}

export { makeResetHandler }
```

**Result:** The joined handler runs `setIsOpen(false)` first, then `clearSelection()`, and returns `undefined`.

To join a non-empty list with a semigroup, pass the first handler and then the remaining handlers to `SconcatAll`.

**Call:** `joinHandlers(deleteRow)([closeMenu, resetCell])`

```ts
import type { MouseEvent } from "react"
import { getSemigroup as RgetSemigroup } from "fp-ts/Reader"
import { concatAll as SconcatAll } from "fp-ts/Semigroup"
import { SemigroupVoid } from "@dictybase/fp-ts-loom/void"

type ClickHandler = (event: MouseEvent) => void

const ClickHandlerSemigroup = RgetSemigroup<MouseEvent, void>(SemigroupVoid)
const joinHandlers = SconcatAll(ClickHandlerSemigroup)

const makeDeleteRowHandler = (
  deleteRow: ClickHandler,
  closeMenu: ClickHandler,
  resetCell: ClickHandler,
): ClickHandler => joinHandlers(deleteRow)([closeMenu, resetCell])

export { makeDeleteRowHandler }
```

**Result:** The handler runs `deleteRow`, then `closeMenu`, then `resetCell`. If the list of remaining handlers is empty, the result is `deleteRow`.

Use [foldHandlers](#event-handlers--predicate-guards) from the `handler` module when the list of handlers can be empty.

#### MonoidVoid

A monoid is a semigroup that also has an `empty` value (`undefined`). Lift `MonoidVoid` with `IOgetMonoid` to build `MonoidCleanup` and join two `Cleanup` functions inside an `Effect`.

**Signature:** `MonoidVoid: Monoid<void>`

**Call:** `CleanupMonoid.concat(stopMove, stopUp)`

```ts
import { getMonoid as IOgetMonoid, type IO } from "fp-ts/IO"
import { MonoidVoid } from "@dictybase/fp-ts-loom/void"

type Cleanup = IO<void>
type Effect = IO<Cleanup>

const CleanupMonoid = IOgetMonoid(MonoidVoid)

const addDocumentListener = (
  eventName: string,
  listener: EventListener,
): Cleanup => {
  document.addEventListener(eventName, listener)
  return () => {
    document.removeEventListener(eventName, listener)
  }
}

const dragEffect = (onMove: EventListener, onUp: EventListener): Effect => {
  const attachDrag: Effect = () => {
    const stopMove = addDocumentListener("mousemove", onMove)
    const stopUp = addDocumentListener("mouseup", onUp)

    return CleanupMonoid.concat(stopMove, stopUp)
  }
  return attachDrag
}

export { dragEffect }
```

**Result:** `dragEffect` attaches both listeners and returns one `Cleanup` that removes `mousemove` first, then `mouseup`. Joining any `Cleanup` with `CleanupMonoid.empty` runs only that `Cleanup`.

Pass `CleanupMonoid` to `MconcatAll` to fold a list of `Cleanup` functions of any length, including `[]`.

**Call:** `foldCleanupList([stopMove, stopUp])`

```ts
import { getMonoid as IOgetMonoid, type IO } from "fp-ts/IO"
import { concatAll as MconcatAll } from "fp-ts/Monoid"
import { MonoidVoid } from "@dictybase/fp-ts-loom/void"

type Cleanup = IO<void>

const CleanupMonoid = IOgetMonoid(MonoidVoid)
const foldCleanupList = MconcatAll(CleanupMonoid)

const stopAll = (cleanups: ReadonlyArray<Cleanup>): Cleanup =>
  foldCleanupList(cleanups)

export { stopAll }
```

**Result:** `stopAll` runs every `Cleanup` in list order. When `cleanups` is `[]`, `stopAll([])` returns `CleanupMonoid.empty`, which does no work. `CleanupMonoid` and `foldCleanupList` are the exact definitions of `MonoidCleanup` and `foldCleanups` in [Effects and cleanups](#effects-and-cleanups).

### ReactNode monoid & intercalation

The `node` module treats React elements (`ReactNode`) as algebraic values. You can render optional elements, guard elements with a condition, join lists of elements, or place separators between elements without `null`, `&&`, or ternaries. Every empty branch renders an empty React fragment `<></>`.

#### fromOptionNode

`fromOptionNode` unwraps an `Option<ReactNode>`. On `Some(node)`, it renders `node`. On `None`, it renders an empty fragment `<></>` so `null` never enters the JSX tree.

**Signature:** `fromOptionNode: (node: Option<ReactNode>) => ReactNode`

**Call:** `fromOptionNode(doiLink)`

```tsx
import type { ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { fromNullable as OfromNullable, map as Omap } from "fp-ts/Option"
import { fromOptionNode } from "@dictybase/fp-ts-loom/node"

type DoiLinkProperties = Readonly<{
  doi: string | null | undefined
}>

const DoiLink = ({ doi }: DoiLinkProperties): ReactNode => {
  const doiLink = pipe(
    doi,
    OfromNullable,
    Omap(
      (value): ReactNode => <a href={`https://doi.org/${value}`}>Full Text</a>,
    ),
  )

  return <nav>{fromOptionNode(doiLink)}</nav>
}

export { DoiLink }
```

**Renders (`doi="10.1093/nar/gkn841"`):**

```html
<nav><a href="https://doi.org/10.1093/nar/gkn841">Full Text</a></nav>
```

**Renders (`doi={null}`):**

```html
<nav></nav>
```

#### whenNode

`whenNode` takes a boolean condition and a `() => ReactNode` function. When the condition is `true`, it calls the function and renders its result. When the condition is `false`, it skips the function and returns `<></>`.

**Signature:** `whenNode: (condition: boolean) => (render: () => ReactNode) => ReactNode`

**Call:** `whenNode(isUnavailable)(() => <span>Currently unavailable at the DSC</span>)`

```tsx
import type { ReactNode } from "react"
import { whenNode } from "@dictybase/fp-ts-loom/node"

type StrainStatusProperties = Readonly<{
  inStock: boolean
}>

const StrainStatus = ({ inStock }: StrainStatusProperties): ReactNode => {
  const isUnavailable = !inStock

  return (
    <div>
      {whenNode(isUnavailable)(() => (
        <span>Currently unavailable at the DSC</span>
      ))}
    </div>
  )
}

export { StrainStatus }
```

**Renders (`inStock={false}`):**

```html
<div><span>Currently unavailable at the DSC</span></div>
```

**Renders (`inStock={true}`):**

```html
<div></div>
```

#### foldNodes

`foldNodes` joins a list of `ReactNode` elements in sequence inside React fragments. When the list is empty, it returns `<></>`.

**Signature:** `foldNodes: (nodes: ReadonlyArray<ReactNode>) => ReactNode`

**Call:** `foldNodes([<code>{id}</code>, <strong>{label}</strong>])`

```tsx
import type { ReactNode } from "react"
import { foldNodes } from "@dictybase/fp-ts-loom/node"

type CatalogTitleProperties = Readonly<{
  id: string
  label: string
}>

const CatalogTitle = ({ id, label }: CatalogTitleProperties): ReactNode => (
  <header>
    {foldNodes([
      <code key="id">{id}</code>,
      " ",
      <strong key="label">{label}</strong>,
    ])}
  </header>
)

export { CatalogTitle }
```

**Renders (`id="DBS0235764"`, `label="axeA2"`):**

```html
<header><code>DBS0235764</code> <strong>axeA2</strong></header>
```

**Result:** Passing `[]` to `foldNodes([])` renders `<></>`.

#### joinNodes

`joinNodes` places a `ReactNode` separator between adjacent elements in a list. It adds no separator when the list has zero or one element.

**Signature:** `joinNodes: (separator: ReactNode) => (nodes: ReadonlyArray<ReactNode>) => ReactNode`

**Call:** `joinWithComma(authorSpans)`

```tsx
import type { ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { map as RAmap } from "fp-ts/ReadonlyArray"
import { joinNodes } from "@dictybase/fp-ts-loom/node"

type AuthorListProperties = Readonly<{
  authors: ReadonlyArray<string>
}>

const joinWithComma = joinNodes(<span>, </span>)

const AuthorList = ({ authors }: AuthorListProperties): ReactNode => {
  const authorSpans = pipe(
    authors,
    RAmap((name): ReactNode => <span key={name}>{name}</span>),
  )

  return <p>{joinWithComma(authorSpans)}</p>
}

export { AuthorList }
```

**Renders (`authors={["R. Chisholm", "G. Shaulsky"]}`):**

```html
<p><span>R. Chisholm</span><span>, </span><span>G. Shaulsky</span></p>
```

**Renders (`authors={["R. Chisholm"]}`):**

```html
<p><span>R. Chisholm</span></p>
```

**Renders (`authors={[]}`):**

```html
<p></p>
```

#### MonoidNode

`foldNodes` is built on `MonoidNode`. `MonoidNode.concat` places two `ReactNode` values side by side inside `<>{first}{second}</>`, and `MonoidNode.empty` is `<></>`.

**Signature:** `MonoidNode: Monoid<ReactNode>`

**Call:** `MonoidNode.concat(<code>{id}</code>, <strong>{label}</strong>)`

```tsx
import type { ReactNode } from "react"
import { MonoidNode } from "@dictybase/fp-ts-loom/node"

type StrainPairProperties = Readonly<{
  id: string
  label: string
}>

const StrainPair = ({ id, label }: StrainPairProperties): ReactNode => (
  <div>{MonoidNode.concat(<code>{id}</code>, <strong>{label}</strong>)}</div>
)

export { StrainPair }
```

**Renders (`id="DBS0235764"`, `label="axeA2"`):**

```html
<div><code>DBS0235764</code><strong>axeA2</strong></div>
```

**Result:** Joining any node with `MonoidNode.empty` renders only that node.

#### intercalateNode

`joinNodes` is built on `intercalateNode`. `intercalateNode(separator)` returns a `Semigroup<ReactNode>` whose `concat` places `separator` between two `ReactNode` values. It is a semigroup rather than a monoid because a separator applies only when at least two elements exist.

**Signature:** `intercalateNode: (separator: ReactNode) => Semigroup<ReactNode>`

**Call:** `DotNodeSemigroup.concat(pmidLink, doiLink)`

```tsx
import type { ReactNode } from "react"
import { intercalateNode } from "@dictybase/fp-ts-loom/node"

type CitationLinksProperties = Readonly<{
  pubmedId: string
  doi: string
}>

const DotNodeSemigroup = intercalateNode(<span> · </span>)

const CitationLinks = ({
  pubmedId,
  doi,
}: CitationLinksProperties): ReactNode => {
  const pmidLink: ReactNode = (
    <a href={`https://pubmed.gov/${pubmedId}`}>PMID: {pubmedId}</a>
  )
  const doiLink: ReactNode = <a href={`https://doi.org/${doi}`}>DOI</a>

  return <p>{DotNodeSemigroup.concat(pmidLink, doiLink)}</p>
}

export { CitationLinks }
```

**Renders (`pubmedId="19015125"`, `doi="10.1093/nar/gkn841"`):**

```html
<p>
  <a href="https://pubmed.gov/19015125">PMID: 19015125</a><span> · </span
  ><a href="https://doi.org/10.1093/nar/gkn841">DOI</a>
</p>
```

#### Building blocks

- `foldNodes` is `MconcatAll(MonoidNode)`.
- `intercalateNode(separator)` is `pipe(MonoidNode, Sintercalate(separator))`.
- `joinNodes(separator)` matches a non-empty list and folds the tail onto the head with `SconcatAll(intercalateNode(separator))`, returning `MonoidNode.empty` on `[]`.

### Views (horizontal composition)

A `View<P>` is a function that takes properties `P` and returns a `ReactNode`. Every React component that takes props is already a `View`. The `view` module joins, separates, guards, wraps, and adapts views that share the same props, without new glue components.

```ts
type View<P> = (properties: P) => ReactNode
```

All examples in this section use one catalog row type:

```ts
type Strain = Readonly<{ id: string; label: string; inStock: boolean }>
```

#### foldViews

`foldViews` joins a list of views into one view. The new view gives the same props to each view and renders the results in list order. For an empty list, it renders `<></>`.

**Signature:** `foldViews: <P>(views: ReadonlyArray<View<P>>) => View<P>`

**Call:** `foldViews([StrainId, StrainLabel])`

```tsx
import type { ReactNode } from "react"
import { foldViews, type View } from "@dictybase/fp-ts-loom/view"

type Strain = Readonly<{ id: string; label: string; inStock: boolean }>

const StrainId: View<Strain> = ({ id }: Strain) => <code>{id}</code>
const StrainLabel: View<Strain> = ({ label }: Strain) => (
  <strong>{label}</strong>
)

const StrainHeading = foldViews([StrainId, StrainLabel])

const CatalogRow = (strain: Strain): ReactNode => (
  <h2>
    <StrainHeading {...strain} />
  </h2>
)

export { CatalogRow }
```

**Renders (`id="DBS0235764"`, `label="axeA2"`):**

```html
<h2><code>DBS0235764</code><strong>axeA2</strong></h2>
```

#### intercalateViews

`intercalateViews` joins a list of views and puts a separator between each two views. It adds no separator for a list with zero or one view.

**Signature:** `intercalateViews: (separator: ReactNode) => <P>(views: ReadonlyArray<View<P>>) => View<P>`

**Call:** `intercalateViews(" — ")([StrainId, StrainLabel])`

```tsx
import type { ReactNode } from "react"
import { intercalateViews, type View } from "@dictybase/fp-ts-loom/view"

type Strain = Readonly<{ id: string; label: string; inStock: boolean }>

const StrainId: View<Strain> = ({ id }: Strain) => <code>{id}</code>
const StrainLabel: View<Strain> = ({ label }: Strain) => (
  <strong>{label}</strong>
)

const joinWithDash = intercalateViews(" — ")
const StrainHeading = joinWithDash([StrainId, StrainLabel])

const CatalogRow = (strain: Strain): ReactNode => (
  <h2>
    <StrainHeading {...strain} />
  </h2>
)

export { CatalogRow }
```

**Renders (`id="DBS0235764"`, `label="axeA2"`):**

```html
<h2><code>DBS0235764</code> — <strong>axeA2</strong></h2>
```

#### guardView

`guardView` renders a view only when a predicate on the props is true. When the predicate is false, it renders `<></>`.

**Signature:** `guardView: <P>(predicate: Predicate<P>) => Endomorphism<View<P>>`

**Call:** `pipe(StockBadge, guardView(isInStock))`

```tsx
import type { ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { guardView, type View } from "@dictybase/fp-ts-loom/view"

type Strain = Readonly<{ id: string; label: string; inStock: boolean }>

const isInStock = ({ inStock }: Strain): boolean => inStock

const StockBadge: View<Strain> = () => <span>In stock</span>

const GuardedStockBadge = pipe(StockBadge, guardView(isInStock))

const CatalogRow = (strain: Strain): ReactNode => (
  <div>
    <GuardedStockBadge {...strain} />
  </div>
)

export { CatalogRow }
```

**Renders (`inStock={true}`):**

```html
<div><span>In stock</span></div>
```

**Renders (`inStock={false}`):**

```html
<div></div>
```

#### wrapView

`wrapView` puts the output of a view inside an outer element. The wrapper is a function `(node: ReactNode) => ReactNode`.

**Signature:** `wrapView: <P>(wrapper: Wrapper) => Endomorphism<View<P>>`

**Call:** `pipe(StockBadge, wrapView(inBadgeBox))`

```tsx
import type { ReactNode } from "react"
import { pipe } from "fp-ts/function"
import type { Wrapper } from "@dictybase/fp-ts-loom/endomorphism"
import { type View, wrapView } from "@dictybase/fp-ts-loom/view"

type Strain = Readonly<{ id: string; label: string; inStock: boolean }>

const inBadgeBox: Wrapper = (node) => <aside className="badge">{node}</aside>

const StockBadge: View<Strain> = ({ id }: Strain) => (
  <span>In stock ({id})</span>
)

const BoxedStockBadge = pipe(StockBadge, wrapView(inBadgeBox))

const CatalogRow = (strain: Strain): ReactNode => (
  <BoxedStockBadge {...strain} />
)

export { CatalogRow }
```

**Renders (`id="DBS0235764"`):**

```html
<aside class="badge"><span>In stock (DBS0235764)</span></aside>
```

#### contramapView

`contramapView` lets a view read a different props type. You give a function that takes the new props and returns the props that the view needs.

**Signature:** `contramapView: <Source, Target>(adapt: (source: Source) => Target) => (view: View<Target>) => View<Source>`

**Call:** `pipe(StrainHeading, contramapView(strainOf))`

```tsx
import type { ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { contramapView, foldViews, type View } from "@dictybase/fp-ts-loom/view"

type Strain = Readonly<{ id: string; label: string; inStock: boolean }>
type CartLine = Readonly<{ strain: Strain; quantity: number }>

const StrainId: View<Strain> = ({ id }: Strain) => <code>{id}</code>
const StrainLabel: View<Strain> = ({ label }: Strain) => (
  <strong>{label}</strong>
)
const StrainHeading = foldViews([StrainId, StrainLabel])

const strainOf = ({ strain }: CartLine): Strain => strain

const CartLineHeading = pipe(StrainHeading, contramapView(strainOf))

const CartRow = (line: CartLine): ReactNode => (
  <li>
    <CartLineHeading {...line} />
  </li>
)

export { CartRow }
```

**Renders (`strain.id="DBS0235764"`, `strain.label="axeA2"`):**

```html
<li><code>DBS0235764</code><strong>axeA2</strong></li>
```

#### Join the operations

The operations return views, so you can join them in one `pipe`. Each step changes the view from the step before it.

**Call:** `pipe(StockBadge, wrapView(inBadgeBox), guardView(isInStock), contramapView(strainOf))`

```tsx
import type { ReactNode } from "react"
import { pipe } from "fp-ts/function"
import type { Wrapper } from "@dictybase/fp-ts-loom/endomorphism"
import {
  contramapView,
  guardView,
  type View,
  wrapView,
} from "@dictybase/fp-ts-loom/view"

type Strain = Readonly<{ id: string; label: string; inStock: boolean }>
type CartLine = Readonly<{ strain: Strain; quantity: number }>

const inBadgeBox: Wrapper = (node) => <aside className="badge">{node}</aside>
const isInStock = ({ inStock }: Strain): boolean => inStock
const strainOf = ({ strain }: CartLine): Strain => strain

const StockBadge: View<Strain> = ({ id }: Strain) => (
  <span>In stock ({id})</span>
)

const CartStockBadge = pipe(
  StockBadge,
  wrapView(inBadgeBox),
  guardView(isInStock),
  contramapView(strainOf),
)

const CartRow = (line: CartLine): ReactNode => (
  <li>
    <CartStockBadge {...line} />
  </li>
)

export { CartRow }
```

**Renders (`strain.inStock={true}`, `strain.id="DBS0235764"`):**

```html
<li>
  <aside class="badge"><span>In stock (DBS0235764)</span></aside>
</li>
```

**Renders (`strain.inStock={false}`):**

```html
<li></li>
```

#### getViewMonoid

`foldViews` is built on `getViewMonoid`. The monoid joins two views that share props, and its empty value is a view that renders `<></>`.

**Signature:** `getViewMonoid: <P>() => Monoid<View<P>>`

**Call:** `StrainViewMonoid.concat(StrainId, StrainLabel)`

```tsx
import type { ReactNode } from "react"
import { getViewMonoid, type View } from "@dictybase/fp-ts-loom/view"

type Strain = Readonly<{ id: string; label: string; inStock: boolean }>

const StrainViewMonoid = getViewMonoid<Strain>()

const StrainId: View<Strain> = ({ id }: Strain) => <code>{id}</code>
const StrainLabel: View<Strain> = ({ label }: Strain) => (
  <strong>{label}</strong>
)

const StrainHeading = StrainViewMonoid.concat(StrainId, StrainLabel)

const CatalogRow = (strain: Strain): ReactNode => (
  <h2>
    <StrainHeading {...strain} />
  </h2>
)

export { CatalogRow }
```

**Renders (`id="DBS0235764"`, `label="axeA2"`):**

```html
<h2><code>DBS0235764</code><strong>axeA2</strong></h2>
```

**Result:** `StrainViewMonoid.empty` renders `<></>`. Joining a view with `StrainViewMonoid.empty` renders only that view.

#### getViewSemigroup

`intercalateViews` is built on `getViewSemigroup`. Give it a semigroup for `ReactNode`, for example `intercalateNode(" — ")`, and it joins two views with that semigroup. Without an argument, it uses `MonoidNode`.

**Signature:** `getViewSemigroup: <P>(semigroup?: Semigroup<ReactNode>) => Semigroup<View<P>>`

**Call:** `DashViewSemigroup.concat(StrainId, StrainLabel)`

```tsx
import type { ReactNode } from "react"
import { intercalateNode } from "@dictybase/fp-ts-loom/node"
import { getViewSemigroup, type View } from "@dictybase/fp-ts-loom/view"

type Strain = Readonly<{ id: string; label: string; inStock: boolean }>

const DashViewSemigroup = getViewSemigroup<Strain>(intercalateNode(" — "))

const StrainId: View<Strain> = ({ id }: Strain) => <code>{id}</code>
const StrainLabel: View<Strain> = ({ label }: Strain) => (
  <strong>{label}</strong>
)

const StrainHeading = DashViewSemigroup.concat(StrainId, StrainLabel)

const CatalogRow = (strain: Strain): ReactNode => (
  <h2>
    <StrainHeading {...strain} />
  </h2>
)

export { CatalogRow }
```

**Renders (`id="DBS0235764"`, `label="axeA2"`):**

```html
<h2><code>DBS0235764</code> — <strong>axeA2</strong></h2>
```

#### Building blocks

- `getViewMonoid<P>()` is `RgetMonoid<P, ReactNode>(MonoidNode)`.
- `getViewSemigroup<P>(semigroup)` is `RgetSemigroup<P, ReactNode>(semigroup)`.
- `foldViews` is `MconcatAll(getViewMonoid<P>())`.
- `intercalateViews(separator)` folds the list with `getViewSemigroup<P>(intercalateNode(separator))`, and returns the empty view for `[]`.
- `wrapView` is `Reader.map`, and `contramapView` is `Reader.local`.

See [ReactNode monoid & intercalation](#reactnode-monoid--intercalation) for `MonoidNode` and `intercalateNode`.

### Endomorphisms & wrappers (vertical & state composition)

An endomorphism is a function that takes a value and returns a value of the same type. The `endomorphism` module uses it for two jobs:

```ts
type Endomorphism<A> = (value: A) => A
type Wrapper = Endomorphism<ReactNode> // (node: ReactNode) => ReactNode
```

- A `Wrapper` puts a React node inside another element, for example a provider or a link.
- An `Endomorphism<S>` changes a state value. React `setState` accepts it directly as an updater function.

#### nestWrappers

`nestWrappers` joins a list of wrappers into one wrapper. Write the list in the same order as the JSX tree: the first wrapper is the outermost element. Use it to replace a stack of nested providers.

**Signature:** `nestWrappers: (wrappers: ReadonlyArray<Wrapper>) => Wrapper`

**Call:** `nestWrappers([withTheme("dark"), withUser(user)])`

```tsx
import { createContext, type ReactNode } from "react"
import { nestWrappers, type Wrapper } from "@dictybase/fp-ts-loom/endomorphism"

type Theme = "light" | "dark"
type User = Readonly<{ name: string }>
type AppShellProperties = Readonly<{ user: User; children: ReactNode }>

const ThemeContext = createContext<Theme>("light")
const UserContext = createContext<User>({ name: "guest" })

const withTheme = (theme: Theme): Wrapper => {
  const wrapInTheme: Wrapper = (node) => (
    <ThemeContext.Provider value={theme}>{node}</ThemeContext.Provider>
  )
  return wrapInTheme
}

const withUser = (user: User): Wrapper => {
  const wrapInUser: Wrapper = (node) => (
    <UserContext.Provider value={user}>{node}</UserContext.Provider>
  )
  return wrapInUser
}

const AppShell = ({ user, children }: AppShellProperties): ReactNode => {
  const withProviders = nestWrappers([withTheme("dark"), withUser(user)])

  return withProviders(<main>{children}</main>)
}

export { AppShell }
```

**Result:** `AppShell` returns this JSX tree. The providers add no HTML, so the page renders only `<main>`.

```tsx
<ThemeContext.Provider value="dark">
  <UserContext.Provider value={user}>
    <main>{children}</main>
  </UserContext.Provider>
</ThemeContext.Provider>
```

#### foldWrappers

`foldWrappers` also joins a list of wrappers into one wrapper, but in the opposite order. It applies the first wrapper first, so the first wrapper is the innermost element. Use it when each step decorates the result of the step before it.

**Signature:** `foldWrappers: (wrappers: ReadonlyArray<Wrapper>) => Wrapper`

**Call:** `foldWrappers([asCode, asLink(href)])`

```tsx
import type { ReactNode } from "react"
import { foldWrappers, type Wrapper } from "@dictybase/fp-ts-loom/endomorphism"

type StockIdProperties = Readonly<{ id: string }>

const asCode: Wrapper = (node) => <code>{node}</code>

const asLink = (href: string): Wrapper => {
  const wrapInLink: Wrapper = (node) => <a href={href}>{node}</a>
  return wrapInLink
}

const StockId = ({ id }: StockIdProperties): ReactNode => {
  const decorate = foldWrappers([asCode, asLink(`/strains/${id}`)])

  return <td>{decorate(id)}</td>
}

export { StockId }
```

**Renders (`id="DBS0235764"`):**

```html
<td>
  <a href="/strains/DBS0235764"><code>DBS0235764</code></a>
</td>
```

#### foldEndomorphisms

`foldEndomorphisms` joins a list of state updaters into one updater. The new updater applies each updater in list order. Give the result to `setState`.

**Signature:** `foldEndomorphisms: <A>(endomorphisms: ReadonlyArray<Endomorphism<A>>) => Endomorphism<A>`

**Call:** `foldEndomorphisms([decrement, atLeast(NO_SELECTION)])`

```tsx
import { useState, type ReactNode } from "react"
import type { Endomorphism } from "fp-ts/Endomorphism"
import { foldEndomorphisms } from "@dictybase/fp-ts-loom/endomorphism"

const NO_SELECTION = -1

const decrement: Endomorphism<number> = (index) => index - 1

const atLeast = (minimum: number): Endomorphism<number> => {
  const clampIndex: Endomorphism<number> = (index) => Math.max(index, minimum)
  return clampIndex
}

const moveUp = foldEndomorphisms([decrement, atLeast(NO_SELECTION)])

const ResultCursor = (): ReactNode => {
  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <button
      type="button"
      onClick={() => {
        setActiveIndex(moveUp)
      }}>
      Active result: {activeIndex}
    </button>
  )
}

export { ResultCursor }
```

**Renders:**

```html
<button type="button">Active result: 2</button>
```

**Result:** Each click moves the active result up by one: `2`, `1`, `0`, `-1`. Then `moveUp(-1)` returns `-1`, because `atLeast(NO_SELECTION)` stops the index at `-1`. For an empty list, `foldEndomorphisms([])` returns the value unchanged.

#### whenEndomorphism

`whenEndomorphism` applies a state updater only when a predicate on the current value is true. When the predicate is false, the value stays the same.

**Signature:** `whenEndomorphism: <A>(predicate: Predicate<A>) => Endomorphism<Endomorphism<A>>`

**Call:** `pipe(increment, whenEndomorphism(isBefore(lastIndex)))`

```tsx
import { useState, type ReactNode } from "react"
import type { Endomorphism } from "fp-ts/Endomorphism"
import { pipe } from "fp-ts/function"
import type { Predicate } from "fp-ts/Predicate"
import { whenEndomorphism } from "@dictybase/fp-ts-loom/endomorphism"

type ResultCursorProperties = Readonly<{ lastIndex: number }>

const increment: Endomorphism<number> = (index) => index + 1

const isBefore = (lastIndex: number): Predicate<number> => {
  const isBeforeLast: Predicate<number> = (index) => index < lastIndex
  return isBeforeLast
}

const moveDown = (lastIndex: number): Endomorphism<number> =>
  pipe(increment, whenEndomorphism(isBefore(lastIndex)))

const ResultCursor = ({ lastIndex }: ResultCursorProperties): ReactNode => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <button
      type="button"
      onClick={() => {
        setActiveIndex(moveDown(lastIndex))
      }}>
      Active result: {activeIndex}
    </button>
  )
}

export { ResultCursor }
```

**Renders (`lastIndex={2}`):**

```html
<button type="button">Active result: 0</button>
```

**Result:** Each click moves the active result down: `0`, `1`, `2`. At `2`, `isBefore(2)` is false, so further clicks keep `2`.

#### buildFrom

`buildFrom` makes a value from one input. You give a start value and a list of recipes. Each recipe reads the input and returns an updater for the value. `buildFrom` applies the updaters in list order to the start value.

**Signature:** `buildFrom: <Input, Target>(initial: Target, recipes: ReadonlyArray<(input: Input) => Endomorphism<Target>>) => (input: Input) => Target`

**Call:** `buildFrom(INITIAL_FILTER, [setOffset, setTerm])`

```ts
import { flow, pipe } from "fp-ts/function"
import { trim as Strim } from "fp-ts/string"
import { id as Lid, prop as Lprop } from "monocle-ts/Lens"
import { buildFrom } from "@dictybase/fp-ts-loom/endomorphism"

type CatalogQuery = Readonly<{ page: number; search: string }>
type CatalogFilter = Readonly<{ offset: number; limit: number; term: string }>

const PAGE_SIZE = 20
const INITIAL_FILTER: CatalogFilter = { offset: 0, limit: PAGE_SIZE, term: "" }

const offsetLens = pipe(Lid<CatalogFilter>(), Lprop("offset"))
const termLens = pipe(Lid<CatalogFilter>(), Lprop("term"))

const pageOf = ({ page }: CatalogQuery): number => page
const searchOf = ({ search }: CatalogQuery): string => search
const toOffset = (page: number): number => (page - 1) * PAGE_SIZE

const setOffset = flow(pageOf, toOffset, offsetLens.set)
const setTerm = flow(searchOf, Strim, termLens.set)

const toCatalogFilter = buildFrom(INITIAL_FILTER, [setOffset, setTerm])

export { toCatalogFilter }
```

**Result:** `toCatalogFilter({ page: 3, search: " sadA " })` returns `{ offset: 40, limit: 20, term: "sadA" }`. If two recipes change the same field, the last recipe wins.

#### MonoidWrapperOuter

`nestWrappers` is built on `MonoidWrapperOuter`. Its `concat(outer, inner)` puts `inner` inside `outer`. Its `empty` value is a wrapper that returns the node unchanged.

**Signature:** `MonoidWrapperOuter: Monoid<Wrapper>`

**Call:** `MonoidWrapperOuter.concat(inMain, inSection)`

```tsx
import type { ReactNode } from "react"
import {
  MonoidWrapperOuter,
  type Wrapper,
} from "@dictybase/fp-ts-loom/endomorphism"

const inMain: Wrapper = (node) => <main>{node}</main>
const inSection: Wrapper = (node) => <section>{node}</section>

const withLayout = MonoidWrapperOuter.concat(inMain, inSection)

const CartPage = (): ReactNode => withLayout(<h1>Cart</h1>)

export { CartPage }
```

**Renders:**

```html
<main>
  <section><h1>Cart</h1></section>
</main>
```

#### MonoidWrapper

`foldWrappers` is built on `MonoidWrapper`. Its `concat(first, second)` applies `first`, then `second`, so `second` is the outer element.

**Signature:** `MonoidWrapper: Monoid<Wrapper>`

**Call:** `MonoidWrapper.concat(inMain, inSection)`

```tsx
import type { ReactNode } from "react"
import { MonoidWrapper, type Wrapper } from "@dictybase/fp-ts-loom/endomorphism"

const inMain: Wrapper = (node) => <main>{node}</main>
const inSection: Wrapper = (node) => <section>{node}</section>

const withLayout = MonoidWrapper.concat(inMain, inSection)

const CartPage = (): ReactNode => withLayout(<h1>Cart</h1>)

export { CartPage }
```

**Renders:**

```html
<section>
  <main><h1>Cart</h1></main>
</section>
```

**Result:** With the same two wrappers, `MonoidWrapper` and `MonoidWrapperOuter` give opposite nesting.

#### getEndomorphismMonoid

`foldEndomorphisms` is built on `getEndomorphismMonoid`. Its `concat(first, second)` applies `first`, then `second`. Its `empty` value returns the value unchanged.

**Signature:** `getEndomorphismMonoid: <A>() => Monoid<Endomorphism<A>>`

**Call:** `IndexUpdaterMonoid.concat(decrement, atLeast(NO_SELECTION))`

```ts
import type { Endomorphism } from "fp-ts/Endomorphism"
import { getEndomorphismMonoid } from "@dictybase/fp-ts-loom/endomorphism"

const NO_SELECTION = -1

const IndexUpdaterMonoid = getEndomorphismMonoid<number>()

const decrement: Endomorphism<number> = (index) => index - 1

const atLeast = (minimum: number): Endomorphism<number> => {
  const clampIndex: Endomorphism<number> = (index) => Math.max(index, minimum)
  return clampIndex
}

const moveUp = IndexUpdaterMonoid.concat(decrement, atLeast(NO_SELECTION))

export { moveUp }
```

**Result:** `moveUp(2)` returns `1`, and `moveUp(-1)` returns `-1`. `IndexUpdaterMonoid.empty(5)` returns `5`.

#### Building blocks

- `getEndomorphismMonoid<A>()` is `Endomorphism.getMonoid<A>()` from fp-ts.
- `MonoidWrapper` is `Endomorphism.getMonoid<ReactNode>()`.
- `MonoidWrapperOuter` is `Monoid.reverse(MonoidWrapper)`.
- `foldEndomorphisms`, `foldWrappers` and `nestWrappers` are `MconcatAll` of these monoids.
- `whenEndomorphism` and `buildFrom` use `Option.fromPredicate` and `ReadonlyArray.flap`.

### Event handlers & predicate guards

A `Handler<E>` is a function that takes an event and returns nothing. React props such as `onClick`, `onChange` and `onKeyDown` take this type.

```ts
type Handler<E> = (event: E) => void
```

The `handler` module joins handlers, guards them with a predicate, and adapts them to a different event type. A predicate is a function that returns `true` or `false`.

#### foldHandlers

`foldHandlers` joins a list of handlers into one handler. The new handler gives the same event to each handler in list order. For an empty list, it does no work.

**Signature:** `foldHandlers: <E>(handlers: ReadonlyArray<Handler<E>>) => Handler<E>`

**Call:** `foldHandlers([onDeleteRow, closeMenu, clearSelection])`

```tsx
import type { MouseEvent, ReactNode } from "react"
import { foldHandlers, type Handler } from "@dictybase/fp-ts-loom/handler"

type ClickHandler = Handler<MouseEvent<HTMLButtonElement>>
type SetMenuOpen = (open: boolean) => void
type SetTableCellKey = (key: string | undefined) => void
type DeleteRowButtonProperties = Readonly<{
  onDeleteRow: ClickHandler
  setIsOpen: SetMenuOpen
  setTableCellKey: SetTableCellKey
}>

const DeleteRowButton = ({
  onDeleteRow,
  setIsOpen,
  setTableCellKey,
}: DeleteRowButtonProperties): ReactNode => {
  const closeMenu: ClickHandler = () => {
    setIsOpen(false)
  }
  const clearSelection: ClickHandler = () => {
    setTableCellKey(undefined)
  }
  const handleClick = foldHandlers([onDeleteRow, closeMenu, clearSelection])

  return (
    <button type="button" onClick={handleClick}>
      Delete row
    </button>
  )
}

export { DeleteRowButton }
```

**Renders:**

```html
<button type="button">Delete row</button>
```

**Result:** A click calls `onDeleteRow`, then `setIsOpen(false)`, then `setTableCellKey(undefined)`.

#### when

`when` calls a handler only when a predicate on the event is true. When the predicate is false, the handler does no work.

**Signature:** `when: <E>(predicate: Predicate<E>) => Endomorphism<Handler<E>>`

**Call:** `pipe(submitSearch, when(isEnterKey))`

```tsx
import type { KeyboardEvent, ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { contramap as Pcontramap } from "fp-ts/Predicate"
import { stringEq } from "@dictybase/fp-ts-loom/predicate/ord"
import { type Handler, when } from "@dictybase/fp-ts-loom/handler"

type SearchKeyEvent = KeyboardEvent<HTMLInputElement>
type SearchBoxProperties = Readonly<{ onSubmit: Handler<SearchKeyEvent> }>

const keyOf = ({ key }: SearchKeyEvent): string => key
const isEnterKey = pipe(stringEq("Enter"), Pcontramap(keyOf))

const SearchBox = ({ onSubmit }: SearchBoxProperties): ReactNode => {
  const handleKeyDown = pipe(onSubmit, when(isEnterKey))

  return <input type="search" onKeyDown={handleKeyDown} />
}

export { SearchBox }
```

**Renders:**

```html
<input type="search" />
```

**Result:** The `Enter` key calls `onSubmit`. Other keys do nothing.

#### contramapHandler

`contramapHandler` lets a handler accept a different event type. You give a function that takes the new event and returns the value that the handler needs. Use it to keep a handler free of DOM event types.

**Signature:** `contramapHandler: <Source, Target>(extract: (source: Source) => Target) => (handler: Handler<Target>) => Handler<Source>`

**Call:** `pipe(setQuery, contramapHandler(inputValue))`

```tsx
import type { ChangeEvent, ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { contramapHandler, type Handler } from "@dictybase/fp-ts-loom/handler"

type InputChangeEvent = ChangeEvent<HTMLInputElement>
type SearchInputProperties = Readonly<{ setQuery: Handler<string> }>

const inputValue = ({ target }: InputChangeEvent): string => target.value

const SearchInput = ({ setQuery }: SearchInputProperties): ReactNode => {
  const handleChange = pipe(setQuery, contramapHandler(inputValue))

  return <input type="search" onChange={handleChange} />
}

export { SearchInput }
```

**Renders:**

```html
<input type="search" />
```

**Result:** When the user types `sadA`, React calls `handleChange` with the change event, and `setQuery` receives the string `"sadA"`.

#### Join the operations

The operations return handlers, so you can join them in one `pipe`. Join the predicates with `PgetMonoidAll`: the joined predicate is true only when each predicate is true.

**Call:** `pipe(foldHandlers([preventDefault, onSubmit]), when(isPlainEnter))`

```tsx
import type { KeyboardEvent, ReactNode } from "react"
import { pipe } from "fp-ts/function"
import { concatAll as MconcatAll } from "fp-ts/Monoid"
import {
  contramap as Pcontramap,
  getMonoidAll as PgetMonoidAll,
  not as Pnot,
} from "fp-ts/Predicate"
import { stringEq } from "@dictybase/fp-ts-loom/predicate/ord"
import { foldHandlers, type Handler, when } from "@dictybase/fp-ts-loom/handler"

type CommentKeyEvent = KeyboardEvent<HTMLTextAreaElement>
type CommentBoxProperties = Readonly<{ onSubmit: Handler<CommentKeyEvent> }>

const keyOf = ({ key }: CommentKeyEvent): string => key
const isShiftKey = ({ shiftKey }: CommentKeyEvent): boolean => shiftKey
const isComposing = ({ nativeEvent }: CommentKeyEvent): boolean =>
  nativeEvent.isComposing

const isPlainEnter = MconcatAll(PgetMonoidAll<CommentKeyEvent>())([
  pipe(stringEq("Enter"), Pcontramap(keyOf)),
  Pnot(isShiftKey),
  Pnot(isComposing),
])

const preventDefault: Handler<CommentKeyEvent> = (event) => {
  event.preventDefault()
}

const CommentBox = ({ onSubmit }: CommentBoxProperties): ReactNode => {
  const handleKeyDown = pipe(
    foldHandlers([preventDefault, onSubmit]),
    when(isPlainEnter),
  )

  return <textarea onKeyDown={handleKeyDown} />
}

export { CommentBox }
```

**Renders:**

```html
<textarea></textarea>
```

**Result:**

- `Enter` stops the new line and calls `onSubmit`.
- `Shift` + `Enter` adds a new line and does not call `onSubmit`.
- An `Enter` key that completes an input method composition does not call `onSubmit`.

#### getHandlerMonoid

`foldHandlers` is built on `getHandlerMonoid`. The monoid joins two handlers: `concat(first, second)` calls `first`, then `second`. Its `empty` value is a handler that does no work.

**Signature:** `getHandlerMonoid: <E>() => Monoid<Handler<E>>`

**Call:** `ClickHandlerMonoid.concat(closeMenu, clearSelection)`

```tsx
import type { MouseEvent, ReactNode } from "react"
import { getHandlerMonoid, type Handler } from "@dictybase/fp-ts-loom/handler"

type ButtonClick = MouseEvent<HTMLButtonElement>
type ClickHandler = Handler<ButtonClick>
type SetMenuOpen = (open: boolean) => void
type SetTableCellKey = (key: string | undefined) => void
type CancelButtonProperties = Readonly<{
  setIsOpen: SetMenuOpen
  setTableCellKey: SetTableCellKey
}>

const ClickHandlerMonoid = getHandlerMonoid<ButtonClick>()

const CancelButton = ({
  setIsOpen,
  setTableCellKey,
}: CancelButtonProperties): ReactNode => {
  const closeMenu: ClickHandler = () => {
    setIsOpen(false)
  }
  const clearSelection: ClickHandler = () => {
    setTableCellKey(undefined)
  }
  const handleClick = ClickHandlerMonoid.concat(closeMenu, clearSelection)

  return (
    <button type="button" onClick={handleClick}>
      Cancel
    </button>
  )
}

export { CancelButton }
```

**Renders:**

```html
<button type="button">Cancel</button>
```

**Result:** A click calls `setIsOpen(false)`, then `setTableCellKey(undefined)`. `ClickHandlerMonoid.empty` does no work.

#### Building blocks

- `getHandlerMonoid<E>()` is `RgetMonoid<E, void>(MonoidVoid)`.
- `foldHandlers` is `MconcatAll(getHandlerMonoid<E>())`.
- `when(predicate)` is `Option.fromPredicate(predicate)`, then `Option.match(constVoid, handler)`.
- `contramapHandler` is `Reader.local`.

See [Void monoid](#void-monoid) for `MonoidVoid`.

### Predicates, parsers and errors

The predicate modules supply ready-made `Predicate` values. Compose them with `Predicate.and`, `Predicate.or` and `Predicate.not`. Use `constError` to make an error factory for `Either.fromPredicate`. The factory returns the same frozen error object on every call.

```ts
import {
  flatMap as EflatMap,
  fromPredicate as EfromPredicate,
} from "fp-ts/Either"
import { pipe } from "fp-ts/function"
import {
  constError,
  intBetween,
  maxStringLength,
  minStringLength,
  parseInt,
} from "@dictybase/fp-ts-loom"

const validateUsername = (username: string) =>
  pipe(
    username,
    EfromPredicate(
      minStringLength(3),
      constError("USERNAME", "at least 3 characters"),
    ),
    EflatMap(
      EfromPredicate(
        maxStringLength(20),
        constError("USERNAME", "at most 20 characters"),
      ),
    ),
  )

const parsePort = (text: string) =>
  pipe(
    parseInt(text),
    EflatMap(
      EfromPredicate(
        intBetween(1, 65_536),
        constError("PORT", "port must be 1 to 65535"),
      ),
    ),
  )

parsePort("8080") // right(8080)
parsePort("12abc") // left({ type: "PARSE_ERROR", ... })
```

`intBetween` includes the lower end and excludes the upper end. `intBetweenInclusive` includes both ends. The string length predicates count UTF-16 code units, not characters. `parseInt` rejects partial input such as `"12abc"`. `Number.parseInt` accepts this input. `parseInt` also rejects an integer outside the safe range. `parseFloat` rejects a value that overflows to `Infinity`.

### Option matching

A `Case<A, B>` is one arm: `(value: A) => Option<B>`. The `match` function tries the arms in order and stops at the first `Some`. The later arms do not run.

```ts
import { pipe } from "fp-ts/function"
import { and as Pand } from "fp-ts/Predicate"
import {
  containsMatch,
  match,
  matchConst,
  maxStringLength,
  minStringLength,
} from "@dictybase/fp-ts-loom"

const isMedium = pipe(
  minStringLength(8),
  Pand(containsMatch(/[A-Z]/)),
  Pand(containsMatch(/[a-z]/)),
)
const isStrong = pipe(isMedium, Pand(containsMatch(/\d/)))

const classifyPassword = match<string, string>("unknown", [
  matchConst(isStrong, "strong"),
  matchConst(isMedium, "medium"),
  matchConst(maxStringLength(7), "weak"),
])

classifyPassword("Password123") // "strong"
```

### String monoids

A separator monoid puts a separator between two non-empty strings. An empty operand drops out together with its separator. Thus an optional part needs no branch.

```ts
import { pipe } from "fp-ts/function"
import {
  concatFields,
  joinComma,
  mapNonEmpty,
  MiddleDot,
  parens,
} from "@dictybase/fp-ts-loom"

joinComma(["Smith", "", "Lee"]) // "Smith, Lee"

type Citation = Readonly<{ authors: string; year: string; doi: string }>

const citationLine = concatFields<Citation>(MiddleDot)([
  ({ authors }) => authors,
  ({ year }) => pipe(year, mapNonEmpty(parens)),
  ({ doi }) => doi,
])

citationLine({ authors: "Lee", year: "2020", doi: "" }) // "Lee · (2020)"
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
import { pipe } from "fp-ts/function"
import { contramap as Pcontramap, type Predicate } from "fp-ts/Predicate"
import { append as RAappend } from "fp-ts/ReadonlyArray"
import { id as Lid, modify as Lmodify, prop as Lprop } from "monocle-ts/Lens"
import {
  maxLength,
  minLength,
  nestWrappers,
  whenEndomorphism,
  type Wrapper,
} from "@dictybase/fp-ts-loom"

type CartState = Readonly<{ items: ReadonlyArray<string> }>

const MAX_CART_ITEMS = 12

const itemsLens = pipe(Lid<CartState>(), Lprop("items"))

const hasRoom: Predicate<CartState> = pipe(
  maxLength<string>(MAX_CART_ITEMS - 1),
  Pcontramap(itemsLens.get),
)

const isAtCapacity: Predicate<CartState> = pipe(
  minLength<string>(MAX_CART_ITEMS),
  Pcontramap(itemsLens.get),
)

const appendStrain = (strainId: string): Endomorphism<CartState> => {
  const addStrain: Endomorphism<CartState> = pipe(
    itemsLens,
    Lmodify(RAappend(strainId)),
  )
  return addStrain
}

const addStrainTransition = (strainId: string): Endomorphism<CartState> => {
  const tryAdd: Endomorphism<CartState> = pipe(
    appendStrain(strainId),
    whenEndomorphism(hasRoom),
  )
  return tryAdd
}

const withCartLayout: Wrapper = nestWrappers([
  (node) => <main>{node}</main>,
  (node) => <section className="cart-panel">{node}</section>,
])

const AddStrainButton = ({ strainId }: { readonly strainId: string }) => {
  const [cart, setCart] = useState<CartState>({ items: [] })
  return withCartLayout(
    <button
      type="button"
      disabled={isAtCapacity(cart)}
      onClick={() => {
        setCart(addStrainTransition(strainId))
      }}>
      Add ({cart.items.length}/{MAX_CART_ITEMS})
    </button>,
  )
}

export { AddStrainButton }
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
│   ├── predicate/ord.ts         # intBetween, intBetweenInclusive, string length and equality predicates
│   ├── predicate/string.ts      # containsMatch, stringLengthBetween
│   ├── predicate/array.ts       # minLength, maxLength, lengthEq
│   ├── error.ts                 # LoomError, constError
│   ├── parse.ts                 # ParseError, parseInt, parseFloat
│   ├── array.ts                 # parseWith
│   ├── matchopt.ts              # Case, matchCase, matchConst, matchDefault, match
│   ├── string.ts                # separator monoids, joins, wrap helpers, mapNonEmpty, concatFields
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
