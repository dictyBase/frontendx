# Editor Toolbar Developer Guide

This guide explains how to build a toolbar control in `@dictybase/editor-toolbar`.
First, it teaches the five-stage lifecycle that every control uses.
Next, it compares five controls in this package and walks through four of them step by step.
Finally, it explains toolbar registration, decoupled Lexical plugins, and unit tests.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Five-Stage Lifecycle of a Toolbar Control](#five-stage-lifecycle-of-a-toolbar-control)
  - [Stage 1: Toolbar Trigger](#stage-1-toolbar-trigger)
  - [Stage 2: Secondary UI Surface](#stage-2-secondary-ui-surface)
  - [Stage 3: Editor State Read](#stage-3-editor-state-read)
  - [Stage 4: Editor State Write](#stage-4-editor-state-write)
  - [Stage 5: Surface Dismissal or Persistence](#stage-5-surface-dismissal-or-persistence)
- [Control Comparison](#control-comparison)
- [Control Walkthroughs](#control-walkthroughs)
  - [Walkthrough 1: FormatBoldButton](#walkthrough-1-formatboldbutton)
  - [Walkthrough 2: FontSizeDropdown](#walkthrough-2-fontsizedropdown)
  - [Walkthrough 3: ColorPickerButton](#walkthrough-3-colorpickerbutton)
  - [Walkthrough 4: LineSpacingButton](#walkthrough-4-linespacingbutton)
- [Toolbar Registration](#toolbar-registration)
- [Decoupled Lexical Plugins](#decoupled-lexical-plugins)
  - [Case 1: No Plugin Necessary](#case-1-no-plugin-necessary)
  - [Case 2: Mounted Plugin in Editor](#case-2-mounted-plugin-in-editor)
  - [Case 3: Custom Headless Plugin](#case-3-custom-headless-plugin)
- [Control Tests](#control-tests)

## Prerequisites

Make sure that these tools are installed before you start:

| Tool | Purpose | Command |
|---|---|---|
| Node.js | JavaScript runtime | `node --version` |
| Yarn | Package manager | `yarn --version` |

Obey these TypeScript rules when you write new code in this repository:

- Use `pipe` and `flow` from `fp-ts/function`.
- Use `Option` from `fp-ts/Option` for values that can be absent.
- Use `match` from `fp-ts/boolean` (`Bmatch`) instead of `if` statements or ternary expressions.
- Do not use `let`, `var`, `for`, `throw`, or `try`.
- Do not write an arrow function that returns another arrow function directly. Give the outer function a block body. Name the inner function with its type. Return that inner function.
- Do not use object spread, array spread, or implicit object returns (`=> ({ ... })`). Use `ReadonlyArray` helpers such as `RAconcat` and explicit `return` statements.

## Five-Stage Lifecycle of a Toolbar Control

Every toolbar control connects a user action on the toolbar to a read or write on the Lexical `EditorState`.
Each control moves through five stages.
Understand these five stages before you select a pattern for a new feature.

### Stage 1: Toolbar Trigger

A control starts with a trigger element inside a toolbar row in [`src/DictybaseToolbar.tsx`](./src/DictybaseToolbar.tsx) and [`src/DebugToolbar.tsx`](./src/DebugToolbar.tsx).
This package uses three MUI trigger elements:

- `IconButton` for icon triggers (`FormatBoldButton`, `ColorPickerButton`, `LineSpacingButton`).
- `Button` for text and icon triggers (`InsertTableButton`).
- `StyledSelect` for inline dropdown triggers (`FontSizeDropdown`, `FontFamilyDropdown`, `BlockFormatDropdown`).

A trigger can display active selection state directly on the toolbar.
For example, `FormatBoldButton` applies `useActiveClass(isBoldAtom)` for a shaded background, and `ColorPickerButton` tints its icon with `fontColorAtom`.
Other triggers, such as `LineSpacingButton`, keep a neutral face until the user opens the menu.

### Stage 2: Secondary UI Surface

After the user clicks the trigger, the control uses one of four secondary surfaces:

- **No secondary surface**: The trigger runs the editor command immediately (`FormatBoldButton`).
- **Inline `Select` menu**: `StyledSelect` renders a list of MUI `MenuItem` options (`FontSizeDropdown`).
- **Anchored `Popover` or `Popper`**: An overlay panel opens next to the trigger (`ColorPickerButton`, `LineSpacingButton`).
- **Modal `Dialog`**: A dialog collects structured form input (`InsertTableButton`).

Controls store open state and anchor state with one of two methods:

- **Jotai open atom**: Legacy controls store a boolean in `openAtom` in [`src/context/atomConfigs.ts`](./src/context/atomConfigs.ts), such as `colorPickerOpenAtom` or `insertTableDialogOpenAtom`. Any child component can read or clear that atom without callback props.
- **Local `Option<HTMLElement>` anchor**: Newer controls store `useState<Option<HTMLElement>>(Onone)` from `event.currentTarget`, as in `LineSpacingButton`. One state value provides both `open={OisSome(anchorElement)}` and `anchorEl={OtoNullable(anchorElement)}`.

When a control opens a secondary surface, it splits component duties in one of two ways:

- **Parent-Callback Split**: The parent component owns all Lexical reads and writes. It passes plain values and `onSelect` callbacks to presentational child items (`LineSpacingButton` to `SpacingOptionItem`).
- **Child-Context Split**: The parent component only opens the surface. Child components call `useLexicalComposerContext()` and Jotai atoms directly (`ColorPickerButton` to `ColorPicker` to `ColorOptionButton`, and `InsertTableButton` to `TableDialogContents`).

### Stage 3: Editor State Read

A control reads the Lexical `EditorState` through one of two data-flow loops.

**Loop A: Continuous Selection Synchronization**

```text
Lexical update / SELECTION_CHANGE_COMMAND
  --> useCleanup (in DictybaseToolbar / DebugToolbar)
  --> useUpdateToolbar
  --> property hooks (useFontProperties, useFontColorProperties, useBlockTypeProperties)
  --> Jotai focusAtom (isBoldAtom, fontSizeAtom, fontColorAtom, blockTypeAtom)
  --> toolbar trigger face
```

Both `DictybaseToolbar` and `DebugToolbar` call [`useCleanup`](./src/hooks/useCleanup.ts).
`useCleanup` registers an editor update listener and a `SELECTION_CHANGE_COMMAND` listener.
Each editor update or selection change runs [`useUpdateToolbar`](./src/hooks/useUpdateToolbar.ts), which calls `useFontProperties`, `useFontColorProperties`, and `useBlockTypeProperties`.
Those hooks write values into `focusAtom` lenses on `formatAtom` in [`src/context/atomConfigs.ts`](./src/context/atomConfigs.ts).
Use Loop A when the control displays selection state on the toolbar face at all times (`FormatBoldButton`, `FontSizeDropdown`, `ColorPickerButton`).

**Loop B: On-Open Snapshot**

```text
Trigger click (onOpen)
  --> editor.getEditorState().read(...)
  --> local React useState
  --> selection marks inside the open surface
```

In Loop B, the trigger reads the selection when the user clicks it and writes the snapshot to local `useState`.
Use Loop B when selection marks appear only inside an open popover (`LineSpacingButton`).
Loop B avoids Jotai atom updates on every cursor movement.

### Stage 4: Editor State Write

When the user clicks a trigger or selects a surface option, the control changes Lexical with one of two APIs:

- **`editor.dispatchCommand(command, payload)`**: Use this API for built-in Lexical commands (`FORMAT_TEXT_COMMAND`) or plugin commands (`INSERT_WIDTH_TABLE_COMMAND`).
- **`editor.update(() => { ... })`**: Use this API to update nodes or selections directly. Call `$patchStyleText` from `@lexical/selection` for inline CSS styles (`FontSizeDropdown`, `ColorPickerButton`), or call `$setState` from `lexical` for custom per-block `NodeState` (`LineSpacingButton`).

### Stage 5: Surface Dismissal or Persistence

After the write completes, a control with a secondary surface either closes or stays open:

- **Close automatically after one choice**: The control closes the surface immediately so that the user returns to the text. For example, `LineSpacingButton` calls `onClose()`, and `useTableFormControls` calls `setIsDialogOpen(false)` on Confirm.
- **Stay open across choices**: The surface stays open so that the user can click several options in sequence. For example, `ColorPickerButton` stays open until an outside click or the `Escape` key triggers `onClose`.

## Control Comparison

This table maps five controls in `@dictybase/editor-toolbar` across all five lifecycle stages:

| Control | Stage 1: Trigger | Stage 2: Surface and Split | Stage 3: State Read | Stage 4: State Write | Stage 5: Dismissal | Plugin |
|---|---|---|---|---|---|---|
| [`FormatBoldButton`](./src/components/FormatBoldButton.tsx) | `IconButton` with `useActiveClass(isBoldAtom)` | None | Loop A (`isBoldAtom` from `useFontProperties`) | `editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")` | None | Core `RichTextPlugin` |
| [`FontSizeDropdown`](./src/components/FontSizeDropdown.tsx) | Inline `StyledSelect` | Inline `Select` menu | Loop A (`fontSizeAtom` from `useFontProperties`) | `applyTextStyles` (`$patchStyleText` in `editor.update`) | Closes automatically on selection | None |
| [`ColorPickerButton`](./src/components/ColorPickerButton.tsx) | `IconButton` tinted by `fontColorAtom` | `Popover`, `colorPickerOpenAtom`, Child-Context Split | Loop A (`fontColorAtom` from `useFontColorProperties`) | Child `ColorOptionButton` calls `setColor` and `applyTextStyles` | Stays open until outside click or `Escape` | None |
| [`InsertTableButton`](./src/components/InsertTableButton.tsx) | Labeled `Button` ("Table") | Modal `Dialog`, `insertTableDialogOpenAtom`, Child-Context Split | Local form `useState` for rows and columns | Child `useTableFormControls` dispatches `INSERT_WIDTH_TABLE_COMMAND` | Closes on Confirm or outside click | Mounted `WidthTablePlugin` |
| [`LineSpacingButton`](./src/components/LineSpacingButton.tsx) | `IconButton` | `Popover`, local `Option<HTMLElement>`, Parent-Callback Split | Loop B (`readCurrentSpacing` on open into local `useState`) | `updateSelectedBlocks` sets `NodeState` with `$setState` in `editor.update` | Closes automatically on selection (`onClose()`) | Custom [`BlockSpacingPlugin`](./src/components/BlockSpacingPlugin.tsx) |

## Control Walkthroughs

The four walkthroughs that follow trace every stage of the lifecycle.
Code samples omit decorative MUI layout styles so that you can focus on UI events, state flow, and Lexical calls.
All code samples obey the `fp-ts` rules of this repository.

### Walkthrough 1: FormatBoldButton

Refer to [`src/components/FormatBoldButton.tsx`](./src/components/FormatBoldButton.tsx), [`src/hooks/useActiveClass.ts`](./src/hooks/useActiveClass.ts), and [`src/hooks/useFontProperties.ts`](./src/hooks/useFontProperties.ts).

- **Stage 1 (Trigger)**: Renders an `IconButton` with `FormatBold` and active styles from `useActiveClass(isBoldAtom)`.
- **Stage 2 (Surface)**: None. A click runs the command directly.
- **Stage 3 (State Read)**: Loop A. `useCleanup` triggers `useFontProperties`, which calls `setIsBold(selection.hasFormat("bold"))`.
- **Stage 4 (State Write)**: Click handler calls `editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")`.
- **Stage 5 (Dismissal)**: None.

```tsx
import { type ReactElement } from "react"
import { FORMAT_TEXT_COMMAND } from "lexical"
import { IconButton } from "@mui/material"
import { FormatBold } from "@mui/icons-material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isBoldAtom } from "../context/atomConfigs"
import { useActiveClass } from "../hooks/useActiveClass"

const TITLE = "Format Bold"

const FormatBoldButton = (): ReactElement => {
  const [editor] = useLexicalComposerContext()
  const buttonStyle = useActiveClass(isBoldAtom)

  const handleClick = (): void => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
  }

  return (
    <IconButton
      title={TITLE}
      aria-label={TITLE}
      onClick={handleClick}
      sx={buttonStyle}
      size="large">
      <FormatBold fontSize="small" />
    </IconButton>
  )
}

export { FormatBoldButton }
```

### Walkthrough 2: FontSizeDropdown

Refer to [`src/components/FontSizeDropdown.tsx`](./src/components/FontSizeDropdown.tsx), [`src/utils/textStyles.ts`](./src/utils/textStyles.ts), and [`src/hooks/useFontProperties.ts`](./src/hooks/useFontProperties.ts).

- **Stage 1 (Trigger)**: Renders an inline `StyledSelect` whose displayed value comes from `fontSizeAtom`.
- **Stage 2 (Surface)**: Uses the built-in MUI `Select` dropdown menu with `MenuItem` rows.
- **Stage 3 (State Read)**: Loop A. `useFontProperties` writes `$getSelectionStyleValueForProperty(selection, "font-size", "15px")` into `fontSizeAtom`.
- **Stage 4 (State Write)**: `handleSelect` calls `applyTextStyles(editor, { "font-size": String(event.target.value) })`, which calls `$patchStyleText` inside `editor.update`.
- **Stage 5 (Dismissal)**: MUI `Select` closes its menu automatically after the user clicks a `MenuItem`.

Note: The legacy [`src/utils/textStyles.ts`](./src/utils/textStyles.ts) file uses an `if` statement, and [`src/components/FontSizeDropdown.tsx`](./src/components/FontSizeDropdown.tsx) uses array spread.
Write new helpers with `Option` and `ReadonlyArray` as shown in the two samples that follow:

```ts
import {
  $getSelection,
  $isRangeSelection,
  type LexicalEditor,
} from "lexical"
import { $patchStyleText } from "@lexical/selection"
import { pipe } from "fp-ts/function"
import {
  fromPredicate as OfromPredicate,
  match as Omatch,
} from "fp-ts/Option"

const applyTextStyles = (
  editor: LexicalEditor,
  styles: Readonly<Record<string, string>>,
): void => {
  editor.update(() => {
    pipe(
      $getSelection(),
      OfromPredicate($isRangeSelection),
      Omatch(
        () => undefined,
        (selection) => {
          $patchStyleText(selection, styles)
        },
      ),
    )
  })
}

export { applyTextStyles }
```

Connect the `StyledSelect` trigger to `fontSizeAtom` and `applyTextStyles`:

```tsx
import { type ReactElement } from "react"
import { type SelectChangeEvent, MenuItem } from "@mui/material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue } from "jotai"
import { pipe } from "fp-ts/function"
import { map as RAmap } from "fp-ts/ReadonlyArray"
import { StyledSelect } from "./StyledSelect"
import { fontSizeAtom } from "../context/atomConfigs"
import { applyTextStyles } from "../utils/textStyles"

const TITLE = "Font Size"
const FONT_SIZES: readonly string[] = ["12px", "14px", "15px", "18px", "20px"]

const FontSizeDropdown = (): ReactElement => {
  const [editor] = useLexicalComposerContext()
  const fontSize = useAtomValue(fontSizeAtom)

  const handleSelect = (event: SelectChangeEvent<unknown>): void => {
    applyTextStyles(editor, { "font-size": String(event.target.value) })
  }

  return (
    <StyledSelect
      variant="standard"
      title={TITLE}
      onChange={handleSelect}
      value={fontSize}>
      {pipe(
        FONT_SIZES,
        RAmap((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        )),
      )}
    </StyledSelect>
  )
}

export { FontSizeDropdown }
```

### Walkthrough 3: ColorPickerButton

Refer to [`src/components/ColorPickerButton.tsx`](./src/components/ColorPickerButton.tsx), [`src/components/ColorPicker.tsx`](./src/components/ColorPicker.tsx), [`src/components/ColorOptionButton.tsx`](./src/components/ColorOptionButton.tsx), and [`src/hooks/useFontColorProperties.ts`](./src/hooks/useFontColorProperties.ts).

- **Stage 1 (Trigger)**: Renders an `IconButton` with an `SvgIcon` tinted by `fontColorAtom` (`htmlColor={color}`).
- **Stage 2 (Surface)**: Opens an anchored `Popover` that uses the Child-Context Split (`ColorPickerButton` renders `ColorPicker`, which renders `ColorOptionButton` items).
- **Stage 3 (State Read)**: Loop A. `useFontColorProperties` reads `$getSelectionStyleValueForProperty(selection, "color", "#000000")` into `fontColorAtom`.
- **Stage 4 (State Write)**: Each `ColorOptionButton` calls `useLexicalComposerContext()` and `useSetAtom(fontColorAtom)`. On click, it calls `setColor(color)` and `applyTextStyles(editor, { color })`.
- **Stage 5 (Dismissal)**: `ColorOptionButton` leaves the popover open so that the user can compare colors. An outside click or `Escape` runs `onClose`.

Note: The legacy [`src/components/ColorPickerButton.tsx`](./src/components/ColorPickerButton.tsx) file uses `useRef(null)` with `colorPickerOpenAtom`.
For new controls, hold the anchor in `useState<Option<HTMLElement>>(Onone)` and convert it with `OtoNullable` for `Popover`:

```tsx
import { useState, type MouseEvent, type ReactElement } from "react"
import FormatColorTextIcon from "@mui/icons-material/FormatColorText"
import { Button, Grid, IconButton, Popover, SvgIcon } from "@mui/material"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useAtomValue, useSetAtom } from "jotai"
import { pipe } from "fp-ts/function"
import {
  type Option,
  isSome as OisSome,
  none as Onone,
  some as Osome,
  toNullable as OtoNullable,
} from "fp-ts/Option"
import { map as RAmap } from "fp-ts/ReadonlyArray"
import { fontColorAtom } from "../context/atomConfigs"
import { applyTextStyles } from "../utils/textStyles"

const TITLE = "Font Color"
const COLOR_OPTIONS: readonly string[] = [
  "hsl(0, 0%, 0%)",
  "hsl(210, 100%, 25.1%)",
  "hsl(210, 100%, 45%)",
  "hsl(53, 100%, 60%)",
]

type ColorOptionButtonProperties = Readonly<{ color: string }>

const ColorOptionButton = ({
  color,
}: ColorOptionButtonProperties): ReactElement => {
  const [editor] = useLexicalComposerContext()
  const setColor = useSetAtom(fontColorAtom)

  const handleClick = (): void => {
    setColor(color)
    applyTextStyles(editor, { color })
  }

  return <Button aria-label={color} onClick={handleClick} />
}

type ColorPickerProperties = Readonly<{ colorOptions: readonly string[] }>

const ColorPicker = ({ colorOptions }: ColorPickerProperties): ReactElement => (
  <Grid container spacing={1}>
    {pipe(
      colorOptions,
      RAmap((color) => (
        <Grid key={color} item>
          <ColorOptionButton color={color} />
        </Grid>
      )),
    )}
  </Grid>
)

const ColorPickerButton = (): ReactElement => {
  const color = useAtomValue(fontColorAtom)
  const [anchorElement, setAnchorElement] = useState<Option<HTMLElement>>(Onone)

  const onOpen = (event: MouseEvent<HTMLElement>): void => {
    setAnchorElement(Osome(event.currentTarget))
  }

  const onClose = (): void => {
    setAnchorElement(Onone)
  }

  return (
    <>
      <IconButton
        title={TITLE}
        aria-label={TITLE}
        onClick={onOpen}
        size="large">
        <SvgIcon fontSize="small" htmlColor={color}>
          <FormatColorTextIcon />
        </SvgIcon>
      </IconButton>
      <Popover
        open={OisSome(anchorElement)}
        anchorEl={OtoNullable(anchorElement)}
        onClose={onClose}>
        <ColorPicker colorOptions={COLOR_OPTIONS} />
      </Popover>
    </>
  )
}

export { ColorOptionButton, ColorPicker, ColorPickerButton }
```

### Walkthrough 4: LineSpacingButton

Refer to [`src/components/LineSpacingButton.tsx`](./src/components/LineSpacingButton.tsx) and [`src/utils/blockSpacing.ts`](./src/utils/blockSpacing.ts).

- **Stage 1 (Trigger)**: Renders an `IconButton` with `FormatLineSpacing`, `aria-haspopup="dialog"`, and `aria-expanded={isOpen}`.
- **Stage 2 (Surface)**: Opens an anchored `Popover` controlled by local `anchorElement` (`Option<HTMLElement>`). It uses the Parent-Callback Split: `LineSpacingButton` renders three `SECTIONS` of `SpacingOptionItem` radio items (`role="menuitemradio"`, selected checkmark with `OPTION_EQ.equals` and `Bmatch`). It also renders two footer buttons (`Remove space between paragraphs` and `Reset`).
- **Stage 3 (State Read)**: Loop B. `onOpen` calls `readCurrentSpacing()`, which runs `editor.getEditorState().read(...)` and reads the first block with `RAhead`. It saves the `BlockSpacing` snapshot in local `current` state.
- **Stage 4 (State Write)**: When the user clicks an option or footer button, the handler calls `updateSelectedBlocks(changes)`. That function runs `editor.update(...)` across all selected block nodes (`ParagraphNode`, `HeadingNode`, `QuoteNode`, `ListItemNode`) and writes custom `NodeState` with `$setState`.
- **Stage 5 (Dismissal)**: `updateSelectedBlocks` calls `onClose()` (`setAnchorElement(Onone)`) to close the popover after one choice.

First, define the custom `NodeState` configuration in [`src/utils/blockSpacing.ts`](./src/utils/blockSpacing.ts) with `createState` from `lexical`.
Lexical serializes `NodeState` values under the `"$"` key in the node JSON.
Unset values stay `Onone` in memory and convert to `undefined` with `OtoUndefined`, so Lexical omits them from JSON output.

```ts
import {
  $setState,
  createState,
  type LexicalNode,
  type StateConfig,
} from "lexical"
import { flow } from "fp-ts/function"
import { type Option, toUndefined as OtoUndefined } from "fp-ts/Option"

enum SpacingProperty {
  LINE_HEIGHT = "lineHeight",
  SPACE_BEFORE = "spaceBefore",
  SPACE_AFTER = "spaceAfter",
}

type SpacingChange = readonly [SpacingProperty, Option<number>]

const createSpacingState = (
  key: SpacingProperty,
  max: number,
  parseSpacingValue: (limit: number) => (value: unknown) => Option<number>,
): StateConfig<SpacingProperty, number | undefined> =>
  createState(key, { parse: flow(parseSpacingValue(max), OtoUndefined) })

const applySpacingChanges = (
  states: Readonly<
    Record<SpacingProperty, StateConfig<SpacingProperty, number | undefined>>
  >,
  changes: readonly SpacingChange[],
): ((node: LexicalNode) => void) => {
  const applyToNode = (node: LexicalNode): void => {
    changes.forEach(([property, value]) => {
      $setState(node, states[property], OtoUndefined(value))
    })
  }
  return applyToNode
}

export { SpacingProperty, applySpacingChanges, createSpacingState }
```

Next, wire the `IconButton` trigger, the `Popover` surface, the presentational `SpacingOptionItem` children, and the footer action buttons in `LineSpacingButton`.
The sample that follows adapts the option list to strict `fp-ts` rules (`RAconcat` and explicit `return` statements) and omits decorative layout styles:

```tsx
import { useState, type MouseEvent, type ReactElement } from "react"
import { $getSelection } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
} from "@mui/material"
import { Check, FormatLineSpacing } from "@mui/icons-material"
import { pipe } from "fp-ts/function"
import {
  type Option,
  getEq as OgetEq,
  getOrElse as OgetOrElse,
  isSome as OisSome,
  map as Omap,
  none as Onone,
  some as Osome,
  toNullable as OtoNullable,
} from "fp-ts/Option"
import { match as Bmatch } from "fp-ts/boolean"
import {
  concat as RAconcat,
  head as RAhead,
  map as RAmap,
} from "fp-ts/ReadonlyArray"
import { Eq as NumberEq } from "fp-ts/number"
import {
  $applySpacingChanges,
  $getBlockSpacing,
  $getSelectedSpacingBlocks,
  EMPTY_SPACING,
  SpacingProperty,
  toSpacingChanges,
  type BlockSpacing,
  type SpacingChange,
} from "../utils/blockSpacing"

type SpacingOption = Readonly<{ label: string; value: Option<number> }>
type SpacingSection = Readonly<{
  heading: string
  property: SpacingProperty
  options: readonly SpacingOption[]
}>

const TITLE = "Line & paragraph spacing"
const DEFAULT_LABEL = "Default"
const NO_PARAGRAPH_SPACE = 0

const LINE_SPACING_OPTIONS: readonly SpacingOption[] = [
  { label: DEFAULT_LABEL, value: Onone },
  { label: "Single", value: Osome(1) },
  { label: "1.15", value: Osome(1.15) },
  { label: "1.5", value: Osome(1.5) },
  { label: "Double", value: Osome(2) },
]

const PIXEL_OPTIONS: readonly SpacingOption[] = pipe(
  [4, 8, 12, 16, 24],
  RAmap((px): SpacingOption => {
    return { label: `${px} px`, value: Osome(px) }
  }),
)

const PARAGRAPH_SPACE_OPTIONS: readonly SpacingOption[] = pipe(
  [
    { label: DEFAULT_LABEL, value: Onone },
    { label: "None", value: Osome(NO_PARAGRAPH_SPACE) },
  ],
  RAconcat(PIXEL_OPTIONS),
)

const SECTIONS: readonly SpacingSection[] = [
  {
    heading: "Line spacing",
    property: SpacingProperty.LINE_HEIGHT,
    options: LINE_SPACING_OPTIONS,
  },
  {
    heading: "Space before",
    property: SpacingProperty.SPACE_BEFORE,
    options: PARAGRAPH_SPACE_OPTIONS,
  },
  {
    heading: "Space after",
    property: SpacingProperty.SPACE_AFTER,
    options: PARAGRAPH_SPACE_OPTIONS,
  },
]

const OPTION_EQ = OgetEq(NumberEq)

const REMOVE_PARAGRAPH_SPACE: readonly SpacingChange[] = [
  [SpacingProperty.SPACE_BEFORE, Osome(NO_PARAGRAPH_SPACE)],
  [SpacingProperty.SPACE_AFTER, Osome(NO_PARAGRAPH_SPACE)],
]

const RESET_SPACING: readonly SpacingChange[] = toSpacingChanges(EMPTY_SPACING)

type SpacingOptionItemProperties = Readonly<{
  label: string
  isSelected: boolean
  onSelect: () => void
}>

const SpacingOptionItem = ({
  label,
  isSelected,
  onSelect,
}: SpacingOptionItemProperties): ReactElement => (
  <MenuItem
    selected={isSelected}
    aria-checked={isSelected}
    role="menuitemradio"
    onClick={onSelect}>
    <ListItemIcon>
      {pipe(
        isSelected,
        Bmatch(
          () => undefined,
          () => <Check fontSize="small" />,
        ),
      )}
    </ListItemIcon>
    <ListItemText>{label}</ListItemText>
  </MenuItem>
)

const LineSpacingButton = (): ReactElement => {
  const [editor] = useLexicalComposerContext()
  const [anchorElement, setAnchorElement] = useState<Option<HTMLElement>>(Onone)
  const [current, setCurrent] = useState<BlockSpacing>(EMPTY_SPACING)
  const isOpen = OisSome(anchorElement)

  const readCurrentSpacing = (): BlockSpacing =>
    editor.getEditorState().read(() =>
      pipe(
        $getSelectedSpacingBlocks($getSelection()),
        RAhead,
        Omap($getBlockSpacing),
        OgetOrElse(() => EMPTY_SPACING),
      ),
    )

  const onOpen = (event: MouseEvent<HTMLElement>): void => {
    setCurrent(readCurrentSpacing())
    setAnchorElement(Osome(event.currentTarget))
  }

  const onClose = (): void => {
    setAnchorElement(Onone)
  }

  const updateSelectedBlocks = (changes: readonly SpacingChange[]): void => {
    editor.update(() => {
      $getSelectedSpacingBlocks($getSelection()).forEach(
        $applySpacingChanges(changes),
      )
    })
    onClose()
  }

  return (
    <>
      <IconButton
        title={TITLE}
        aria-label={TITLE}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        onClick={onOpen}
        size="large">
        <FormatLineSpacing fontSize="small" />
      </IconButton>
      <Popover
        open={isOpen}
        anchorEl={OtoNullable(anchorElement)}
        onClose={onClose}>
        <Box>
          {pipe(
            SECTIONS,
            RAmap(({ heading, property, options }) => (
              <Box key={property} component="section" aria-label={heading}>
                <Typography variant="overline">{heading}</Typography>
                <MenuList dense aria-label={heading} autoFocusItem={false}>
                  {pipe(
                    options,
                    RAmap(({ label, value }) => (
                      <SpacingOptionItem
                        key={label}
                        label={label}
                        isSelected={OPTION_EQ.equals(current[property], value)}
                        onSelect={() => {
                          updateSelectedBlocks([[property, value]])
                        }}
                      />
                    )),
                  )}
                </MenuList>
              </Box>
            )),
          )}
          <Divider />
          <Stack direction="row">
            <Button
              size="small"
              color="inherit"
              onClick={() => {
                updateSelectedBlocks(REMOVE_PARAGRAPH_SPACE)
              }}>
              Remove space between paragraphs
            </Button>
            <Button
              size="small"
              color="inherit"
              onClick={() => {
                updateSelectedBlocks(RESET_SPACING)
              }}>
              Reset
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  )
}

export { LineSpacingButton }
```

## Toolbar Registration

Register every new toolbar control in both toolbar layouts so that production and debug views stay aligned:

1. Open [`src/DictybaseToolbar.tsx`](./src/DictybaseToolbar.tsx) and import your control component.
2. Put the component in the `<Stack direction="row">` group for its category. The four groups are history, font and layout, inline text style, and tables and media.
3. Open [`src/DebugToolbar.tsx`](./src/DebugToolbar.tsx) and import the same control component.
4. Put the component in the same `<Stack direction="row">` group.

Do not export ordinary toolbar buttons from [`src/index.ts`](./src/index.ts) because host packages import `DictybaseToolbar` or `DebugToolbar`.
Add an export to [`src/index.ts`](./src/index.ts) only when another package must import a plugin, a custom node, or an atom.
Examples in [`src/index.ts`](./src/index.ts) are `BlockSpacingPlugin`, `DownloadLinkNode`, and `atomConfigs`.

## Decoupled Lexical Plugins

A toolbar control and a Lexical plugin have separate responsibilities.
You do not need a custom plugin for every toolbar control.
Match your feature to one of the three cases that follow.

### Case 1: No Plugin Necessary

Inline style updates (`$patchStyleText` in `FontSizeDropdown` and `ColorPickerButton`) and core `RichTextPlugin` text commands (`FORMAT_TEXT_COMMAND` in `FormatBoldButton`) need no feature plugin.

### Case 2: Mounted Plugin in Editor

Both [`packages/editor/src/Editor.tsx`](../editor/src/Editor.tsx) and [`packages/editor/src/DebugEditor.tsx`](../editor/src/DebugEditor.tsx) already mount these plugins:

- `ListPlugin`
- `LinkPlugin`
- `ImagePlugin`
- `WidthTablePlugin`
- `TableActionPlugin`
- `HistoryPlugin`

Inspect those two files before you create a new plugin.
For example, `InsertTableButton` (through [`src/hooks/useTableFormControls.ts`](./src/hooks/useTableFormControls.ts)) dispatches `INSERT_WIDTH_TABLE_COMMAND` to the mounted `WidthTablePlugin`.
Similarly, [`UndoButton`](./src/components/UndoButton.tsx) and [`RedoButton`](./src/components/RedoButton.tsx) dispatch `UNDO_COMMAND` and `REDO_COMMAND` (through `useUndo` and `useRedo`) to `HistoryPlugin`.

### Case 3: Custom Headless Plugin

Create a custom headless plugin when custom `NodeState` must update DOM styles or keep state across keyboard commands.
A headless plugin returns `undefined`.
[`BlockSpacingPlugin`](./src/components/BlockSpacingPlugin.tsx) shows the standard structure.
Neither `LineSpacingButton` nor `BlockSpacingPlugin` imports the other component, and both share [`src/utils/blockSpacing.ts`](./src/utils/blockSpacing.ts).

Do these steps to add a custom headless plugin:

1. Create the plugin file in `packages/editor-toolbar/src/components/`.
2. Register mutation listeners on each target node class with `skipInitialization: false` so that saved state renders on initial mount.
3. Register command listeners when keyboard actions must keep custom state (for example, `INSERT_PARAGRAPH_COMMAND` copies `BlockSpacing` on `Enter`).
4. Combine every unregister function with `mergeRegister`. Return the combined cleanup function from `useEffect`.
5. Export the plugin from [`src/index.ts`](./src/index.ts).
6. Mount the plugin outside the `editable` branch in [`packages/editor/src/Editor.tsx`](../editor/src/Editor.tsx) and [`packages/editor/src/DebugEditor.tsx`](../editor/src/DebugEditor.tsx).

Because you mount the plugin outside the `editable` branch, read-only editors render saved state without the toolbar.
The excerpt that follows shows only the `useEffect` listener registration shell from `BlockSpacingPlugin`.
[`src/components/BlockSpacingPlugin.tsx`](./src/components/BlockSpacingPlugin.tsx) defines `renderSpacing` and `$insertParagraphKeepingSpacing`.

```tsx
import { useEffect } from "react"
import {
  COMMAND_PRIORITY_LOW,
  INSERT_PARAGRAPH_COMMAND,
  ParagraphNode,
  mergeRegister,
  type Klass,
  type LexicalNode,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { ListItemNode } from "@lexical/list"
import { pipe } from "fp-ts/function"
import { filter as RAfilter, map as RAmap } from "fp-ts/ReadonlyArray"

const SPACING_NODE_CLASSES: readonly Klass<LexicalNode>[] = [
  ParagraphNode,
  HeadingNode,
  QuoteNode,
  ListItemNode,
]

const BlockSpacingPlugin = (): undefined => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    const mutationUnregisters = pipe(
      SPACING_NODE_CLASSES,
      RAfilter((klass) => editor.hasNodes([klass])),
      RAmap((klass) =>
        editor.registerMutationListener(klass, renderSpacing(editor), {
          skipInitialization: false,
        }),
      ),
    )

    const unregisterMutations = (): void => {
      mutationUnregisters.forEach((unregister) => {
        unregister()
      })
    }

    const unregisterCommand = editor.registerCommand(
      INSERT_PARAGRAPH_COMMAND,
      () => $insertParagraphKeepingSpacing(editor)(),
      COMMAND_PRIORITY_LOW,
    )

    return mergeRegister(unregisterMutations, unregisterCommand)
  }, [editor])

  return undefined
}

export { BlockSpacingPlugin }
```

## Control Tests

Put unit tests in `packages/editor-toolbar/src/__tests__/`.
Mount your control inside [`LexicalTestComposer`](./src/utils/LexicalTestComposer.tsx) with Vitest and React Testing Library (`@testing-library/react`).

Use this template to mount a control, select text in `act`, click an option, and examine the updated `EditorState`:

```tsx
import { test, expect } from "vitest"
import { act, fireEvent, render, screen } from "@testing-library/react"
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  type LexicalEditor,
} from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { pipe } from "fp-ts/function"
import {
  type Option,
  flatMap as OflatMap,
  map as Omap,
  none as Onone,
  some as Osome,
} from "fp-ts/Option"
import { LexicalTestComposer } from "../utils/LexicalTestComposer"
import { LineSpacingButton } from "../components/LineSpacingButton"
import { $getBlockSpacing, SpacingProperty } from "../utils/blockSpacing"

const mountControl = (): Option<LexicalEditor> => {
  const editorBox: { current: Option<LexicalEditor> } = { current: Onone }

  const CaptureEditor = (): undefined => {
    const [editor] = useLexicalComposerContext()
    editorBox.current = Osome(editor)
    return undefined
  }

  render(
    <LexicalTestComposer>
      <LineSpacingButton />
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <CaptureEditor />
    </LexicalTestComposer>,
  )

  return editorBox.current
}

const readLineHeight = (editor: LexicalEditor): Option<number> =>
  editor.getEditorState().read(() => {
    const spacing = $getBlockSpacing($getRoot().getFirstChildOrThrow())
    return spacing[SpacingProperty.LINE_HEIGHT]
  })

test("updates line spacing when the user clicks a popover option", () => {
  const editorOption = mountControl()

  act(() => {
    pipe(
      editorOption,
      Omap((editor) => {
        editor.update(
          () => {
            const paragraph = $createParagraphNode().append(
              $createTextNode("Dicty Stock Center"),
            )
            $getRoot().clear().append(paragraph)
            paragraph.select(0, 1)
          },
          { discrete: true },
        )
      }),
    )
  })

  fireEvent.click(
    screen.getByRole("button", { name: "Line & paragraph spacing" }),
  )
  fireEvent.click(screen.getByRole("menuitemradio", { name: "1.5" }))

  act(() => {
    pipe(
      editorOption,
      Omap((editor) => {
        editor.update(() => undefined, { discrete: true })
      }),
    )
  })

  const lineHeight = pipe(editorOption, OflatMap(readLineHeight))
  expect(lineHeight).toEqual(Osome(1.5))
})
```

The current [`src/__tests__/blockSpacing.test.tsx`](./src/__tests__/blockSpacing.test.tsx) file already covers these behaviors:

- Pure helpers keep unset values (`Onone`) separate from explicit zero (`Osome(0)`) and accept or reject values at numeric bounds.
- `BlockSpacingPlugin` applies inline styles to the paragraph DOM element and removes them on reset.
- Lexical serializes `BlockSpacing` into `editorState.toJSON()` and restores it through `editor.parseEditorState(json)`.
- `INSERT_PARAGRAPH_COMMAND` keeps the `BlockSpacing` of the source paragraph on the new paragraph.

When you add a new control or extend an old feature, add tests for these cases too:

- Select text across multiple blocks. Click the toolbar control. Select one option. Make sure that all touched blocks update.
- Mount a read-only editor (`editable={false}`) with saved JSON. Make sure that the DOM renders the saved state without a toolbar.

Run all verification commands from the repository root:

```bash
yarn workspace @dictybase/editor-toolbar test
yarn workspace @dictybase/editor-toolbar lint
yarn workspace @dictybase/editor-toolbar oxlint
yarn workspace @dictybase/editor test
yarn workspace @dictybase/editor lint
yarn workspace @dictybase/editor oxlint
```
