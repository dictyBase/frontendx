# Implementing a New Editor Toolbar Feature

This guide walks through the process of adding a new feature to the Lexical editor toolbar, using the capitalize feature as an example.

See the `packages/editor-toolbar/src/examples` folder for the files that this guide refers to.

## Overview

Adding a new toolbar feature in Lexical typically involves these components:

1. **Command** - Defines the action to be performed
2. **Utility Function** - Implements the actual functionality
3. **Button Component** - UI element that triggers the command
4. **Plugin** - Registers the command handler with the editor
5. **Integration** - Adding the button and plugin to your editor

## Step 1: Create a Command

First, define a command using Lexical's `createCommand()`:

```typescript
// myFeatureCommand.ts
import { createCommand } from "lexical"

const MY_FEATURE_COMMAND = createCommand()

export { MY_FEATURE_COMMAND }
```

Commands are the communication system in Lexical that connect UI interactions to editor state changes.

## Step 2: Create a Utility Function

Next, implement the core functionality in a utility function. By convention, functions that operate within Lexical's editor context are prefixed with `$`:

```typescript
// $myFeatureFunction.ts
import { RangeSelection, TextNode } from "lexical"

/**
 * This function must be called in an update context (editor.update() or command handler)
 */
const $myFeatureFunction = (selection: RangeSelection) => {
  // Implement your feature logic here
  selection.getNodes().forEach((node) => {
    if (node instanceof TextNode) {
      // Modify the node as needed
      // Example: node.setTextContent(transformedText)
    }
  })
}

export { $myFeatureFunction }
```

## Step 3: Create a Button Component

Create a React component for your toolbar button:

```typescript
// MyFeatureButton.tsx
import { Button } from "@material-ui/core" // or your UI library
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { MY_FEATURE_COMMAND } from "./myFeatureCommand"

const MyFeatureButton = () => {
  const [editor] = useLexicalComposerContext()
  
  const onClick = () => {
    editor.dispatchCommand(MY_FEATURE_COMMAND, undefined)
    // Pass payload if needed: editor.dispatchCommand(MY_FEATURE_COMMAND, payload)
  }
  
  return <Button onClick={onClick}>My Feature</Button>
}

export { MyFeatureButton }
```

## Step 4: Create a Plugin

Create a React component that registers your command handler:

```typescript
// MyFeaturePlugin.tsx
import { useEffect } from "react"
import { $getSelection, $isRangeSelection } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { MY_FEATURE_COMMAND } from "./myFeatureCommand"
import { $myFeatureFunction } from "./$myFeatureFunction"

const MyFeaturePlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    // Register the command handler
    return editor.registerCommand(
      MY_FEATURE_COMMAND,
      () => {
        const selection = $getSelection()
        
        // Validate selection
        if (!$isRangeSelection(selection)) {
          return false
        }
        
        // Apply your feature
        $myFeatureFunction(selection)
        
        // Return true to indicate command was handled
        return true
      },
      // Priority (lower number = higher priority)
      1
    )
  }, [editor])

  // Plugin components can return UI elements or null
  return null
}

export { MyFeaturePlugin }
```

## Step 5: Integrate with Your Editor

Finally, add your button to the toolbar and your plugin to the editor:

```tsx
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { MyFeatureButton } from "./MyFeatureButton"
import { MyFeaturePlugin } from "./MyFeaturePlugin"

const Editor = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme: {},
    onError: (error) => console.error(error),
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
        <div className="editor-toolbar">
          {/* Add your button here */}
          <MyFeatureButton />
        </div>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Enter some text...</div>}
        />
        {/* Add your plugin here */}
        <MyFeaturePlugin />
      </div>
    </LexicalComposer>
  )
}
```

## Advanced Considerations

1. **Command Payload**: If your feature needs additional data, pass it when dispatching the command.
2. **Selection Types**: Handle different selection types (range, node, grid) as needed.
3. **Node Types**: Consider how your feature should interact with different node types.
4. **Undo/Redo**: Lexical handles this automatically for changes made within an update.
5. **UI State**: For toggleable features, you may need to track state to update button appearance.

## Example: Capitalize Feature

For a complete working example, see the capitalize feature implementation in the `packages/editor-toolbar/src/examples` directory:

- `capitalizeCommand.ts` - Defines the command
- `$capitalizeSelection.ts` - Implements the text capitalization
- `CapitalizeButton.tsx` - Provides the UI button
- `CapitalizePlugin.tsx` - Registers the command handler
- `ExampleEditor.tsx` - Shows the complete integration

This pattern can be adapted for various editor features like text formatting, inserting elements, or applying custom transformations to selected content.
