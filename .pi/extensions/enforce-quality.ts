/**
 * Enforce Quality Extension
 *
 * After each turn where the assistant writes or edits code, injects
 * reminders to write tests, document newly written functions, and
 * verify type safety.
 *
 * Loaded automatically from .pi/extensions/
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent"

const CODE_MODIFYING_TOOLS = new Set(["write", "edit"])

const QUALITY_PROMPT = `Before continuing, please ensure:

1. **Tests**: Write unit tests for any new or modified code. Use the project's
   testing patterns (Vitest + Testing Library for components, follow
   testing conventions from CLAUDE.md).

2. **Documentation**: Add JSDoc comments to all newly written functions,
   including parameter descriptions and return types. Follow the project's
   naming and structure conventions.

3. **Type safety**: Run \`tsc --noEmit\` (or the workspace build command
   which includes \`tsc\`) to verify there are no type errors in new or
   modified code.

If no new code was written in the last turn, you may ignore this message.`

export default function (pi: ExtensionAPI) {
  pi.on("turn_end", (event, _ctx) => {
    // Skip if a continuation is already queued by another handler
    if (event.continue) return

    // Check if this turn involved code-modifying tools
    const modifiedCode = event.toolResults.some(
      (result) =>
        result.toolName && CODE_MODIFYING_TOOLS.has(result.toolName as string),
    )

    if (!modifiedCode) return

    return {
      entries: [
        {
          type: "custom_message",
          customType: "quality_reminder",
          content: QUALITY_PROMPT,
          display: true,
        },
      ],
      continue: true,
    }
  })
}

