# Lexical at a Glance

This guide assumes that you are familiar with building UI with React. 

![Lexical Diagram](lexical-concept-diagram.drawio.svg)

## How It Works

The **Editor Instance** is the central hub that connects to a DOM element and orchestrates everything. When you want to change content, you trigger an **update** which modifies the **Editor State**.

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

## Further Reading
[Lexical Overview](https://lexical.dev/docs/intro)
