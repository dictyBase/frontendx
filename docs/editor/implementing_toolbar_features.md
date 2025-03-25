# Implementing a Text Capitalization Feature in Lexical

This guide walks through the process of adding a text capitalization feature to a Lexical editor toolbar.

See the `packages/editor-toolbar/src/examples` folder for the complete code.

## Overview

Adding the capitalize feature to Lexical involves these components:

1. **Command** - Defines the capitalization action
2. **Utility Function** - Implements the text capitalization logic
3. **Button Component** - UI element that triggers the command
4. **Plugin** - Registers the command handler with the editor
5. **Integration** - Adding the button and plugin to your editor

## Step 1: Create a Command

First, define a command using Lexical's `createCommand()`:

```typescript
// capitalizeCommand.ts
import { createCommand } from "lexical"

const CAPITALIZE_SELECTION_COMMAND = createCommand()

export { CAPITALIZE_SELECTION_COMMAND }
```

This command will be the communication channel between your button and the editor.

## Step 2: Create a Utility Function

Next, implement the capitalization functionality in a utility function:

```typescript
// $capitalizeSelection.ts
import { RangeSelection, TextNode } from "lexical"

const $capitalizeSelection = (selection: RangeSelection) => {
  // Apply capitalization to each selected node
  selection.getNodes().forEach((node) => {
    if (node instanceof TextNode) {
      // Get the text portions that are within the selection
      const textContent = node.getTextContent()
      const capitalized = textContent.toUpperCase()

      // Replace the text with capitalized version
      node.setTextContent(capitalized)
    }
  })
}

export { $capitalizeSelection }
```

Note the `$` prefix, which is a Lexical convention indicating this function must be called within an editor update context.

## Step 3: Create a Button Component

Create a React component for your toolbar button:

```typescript
// CapitalizeButton.tsx
import { Button } from "@material-ui/core"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { CAPITALIZE_SELECTION_COMMAND } from "./capitalizeCommand"

const CapitalizeButton = () => {
  const [editor] = useLexicalComposerContext()
  
  const onClick = () => {
    editor.dispatchCommand(CAPITALIZE_SELECTION_COMMAND, undefined)
  }
  
  return <Button onClick={onClick}>Capitalize</Button>
}

export { CapitalizeButton }
```

This button:
1. Gets access to the editor using `useLexicalComposerContext()`
2. Dispatches our command when clicked
3. Renders a simple button with "Capitalize" text

## Step 4: Create a Plugin

Create a React component that registers your command handler:

```typescript
// CapitalizePlugin.tsx
import { useEffect } from "react"
import { $getSelection, $isRangeSelection } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { CAPITALIZE_SELECTION_COMMAND } from "./capitalizeCommand"
import { $capitalizeSelection } from "./$capitalizeSelection"

const CapitalizePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(
    () =>
      // Register the command listener
      editor.registerCommand(
        CAPITALIZE_SELECTION_COMMAND,
        () => {
          // Get the current selection
          const selection = $getSelection()

          // Only process if we have a range selection (text is selected)
          if (!$isRangeSelection(selection)) {
            return false
          }

          $capitalizeSelection(selection)
          return true
        },
        // Set priority (lower number = higher priority)
        1
      ),
    [editor]
  )

  return <></>
}

export { CapitalizePlugin }
```

The plugin:
1. Gets access to the editor
2. Registers a command handler in a `useEffect` hook
3. When the command is received, it:
   - Gets the current selection
   - Validates it's a range selection (text is selected)
   - Calls our utility function to capitalize the text
   - Returns `true` to indicate the command was handled

## Step 5: Integrate with Your Editor

Finally, add your button to the toolbar and your plugin to the editor:

```tsx
// ExampleEditor.tsx
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { CapitalizeButton } from "./CapitalizeButton"
import { CapitalizePlugin } from "./CapitalizePlugin"

const ExampleEditor = () => {
  const initialConfig = {
    namespace: "CapitalizeExample",
    theme: {},
    onError: () => {},
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <div className="editor-toolbar">
          <CapitalizeButton />
        </div>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Enter some text</div>}
        />
        {/* Register the capitalize plugin */}
        <CapitalizePlugin />
      </div>
    </LexicalComposer>
  )
}

export { ExampleEditor }
```

## How It Works: The Complete Flow

1. User selects text in the editor
2. User clicks the "Capitalize" button
3. Button dispatches the `CAPITALIZE_SELECTION_COMMAND`
4. Plugin's command handler receives the command
5. Handler validates the selection and calls `$capitalizeSelection`
6. The utility function transforms the text to uppercase
7. Lexical's reconciler updates the DOM to show the capitalized text
