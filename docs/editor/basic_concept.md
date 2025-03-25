# Lexical at a Glance

This guide assumes that you are familiar with building UI with React. 

![Lexical Diagram](lexical-concept-diagram.drawio.svg)

## How It Works

The **Editor Instance** is the central hub that connects to a DOM element and orchestrates everything. When you want to change content, you trigger an **update** which modifies the **Editor State**.

```js
editor.update(() => {
  // Make changes to the editor state here
  // All $-prefixed functions must be called within this context
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  root.append(paragraph);
});
```

The **Editor State** contains two key parts:
- A tree of **Nodes** (paragraphs, headings, lists, etc.)
- The current **Selection** (cursor position)

After an update, the **DOM Reconciler** efficiently applies only the necessary changes to the actual DOM.

## Communication Flow

1. User interactions (typing, clicking) → DOM events
2. DOM events → Editor commands
3. Commands → State updates
4. State updates → DOM changes

Plugins and extensions hook into this flow using **Listeners** and **Commands** without needing to directly manipulate the DOM.

## Toolbar Button Example

A typical pattern for extending Lexical involves:

1. Create a command with `createCommand()`
2. Create a button that dispatches the command
3. Register a command listener in a plugin that updates the editor state

See the `packages/editor-toolbar/src/examples` folder for a complete example of a capitalize button.
