# Editor Button Example

This folder contains examples for a basic editor toolbar button that capitalizes the user's selected text.

## Components

1. `capitalizeCommand.ts` - Defines the Lexical command using `createCommand()`
2. `$capitalizeSelection.ts` - A utility function that performs the capitalization (note the `$` prefix indicating it must be used within an editor update)
3. `CapitalizeButton.tsx` - A toolbar button that dispatches the command
4. `CapitalizePlugin.tsx` - A React component that registers the command handler
5. `ExampleEditor.tsx` - A complete example editor with the capitalize feature

## How It Works

This example demonstrates the Lexical command flow:

1. User clicks the Capitalize button
2. Button dispatches the CAPITALIZE_SELECTION_COMMAND
3. Plugin's command handler processes the selection
4. Editor state is updated with capitalized text
5. DOM is updated to reflect the changes

## Plugin Architecture

Following Lexical's plugin architecture pattern:

1. **Access the Editor**: We use `useLexicalComposerContext()` to get access to the editor instance
2. **Register Commands**: In a `useEffect()`, we register our command handler that runs when the command is dispatched
3. **Return React Component**: Our plugin returns a React component (empty in this case)

## Further Reading

- [Creating a React Plugin in Lexical](https://lexical.dev/docs/react/create_plugin)
- [Lexical Commands Documentation](https://lexical.dev/docs/concepts/commands)
