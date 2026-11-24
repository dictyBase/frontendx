/**
 * fp-ts Guidance Extension
 *
 * Injects condensed functional programming patterns using fp-ts
 * into the system prompt on every agent start. Keeps the codebase's
 * fp-ts conventions front-of-mind without needing to invoke a skill.
 *
 * Usage:
 *   pi --extension ~/.pi/agent/extensions/fp-ts-guidance.ts
 * Or copy to ~/.pi/agent/extensions/ for automatic loading.
 */

import type {
  BuildSystemPromptOptions,
  ExtensionAPI,
} from "@earendil-works/pi-coding-agent"

const FP_TS_GUIDANCE = `
## fp-ts Functional Programming Patterns

You are working in a codebase that uses fp-ts extensively. If available, invoke a dedicated fp-ts skill. Follow these patterns:

### Core Principles
1. Use \`pipe\` for all composition — never use nested calls or method chains
2. Avoid \`null\`/\`undefined\` entirely — use \`Option\` from fp-ts
3. Use \`TaskEither\` for async operations with error handling, \`Either\` for sync
4. Prefer aliased imports to avoid naming conflicts (e.g., \`Omap\`, \`TEmap\`, \`Amap\`)
5. Never use \`chain\` — always use \`flatMap\` (the modern name)

### Option (replace null/undefined)
\`\`\`ts
import { fromNullable as OfromNullable, map as Omap, getOrElse as OgetOrElse, match as Omatch, flatMap as OflatMap, filter as Ofilter } from "fp-ts/Option"

// Core pattern: OfromNullable → Omap → OgetOrElse
pipe(value, OfromNullable, Omap(transform), OgetOrElse(() => fallback))

// Match for branching
pipe(value, OfromNullable, Omatch(() => <Empty />, (v) => <Content data={v} />))
\`\`\`

### TaskEither (async + errors)
\`\`\`ts
import { Do as TEDo, bind as TEbind, tryCatch as TEtryCatch, map as TEmap, mapLeft as TEmapLeft, fromOption as TEfromOption, flatMap as TEflatMap, filterOrElse as TEfilterOrElse } from "fp-ts/TaskEither"

const task = pipe(
  TEDo,
  TEbind("token", () => TEtryCatch(() => getToken(), () => tokenError)),
  TEbind("data", ({ token }) => TEtryCatch(() => fetch(token), () => fetchError)),
  TEmap(({ data }) => transform(data)),
)
return task() // Always execute the TaskEither with ()
\`\`\`

### Either (sync validation)
\`\`\`ts
import { fromPredicate as EfromPredicate, map as Emap, match as Ematch, left as Eleft, right as Eright } from "fp-ts/Either"

pipe(value, EfromPredicate(isValid, () => errorValue), Emap(transform), Ematch(handleLeft, handleRight))
\`\`\`

### Array operations
\`\`\`ts
import { map as Amap, filter as Afilter, reduce as Areduce, compact as Acompact, uniq as Auniq, head as Ahead, elem as Aelem, concat as Aconcat } from "fp-ts/Array"

pipe(items, Afilter(pred), Amap(transform), Auniq(eq), Acompact)
\`\`\`

### Boolean matching (prefer over ternaries)
\`\`\`ts
import { match as Bmatch } from "fp-ts/boolean"
pipe(condition, Bmatch(() => "false case", () => "true case"))
\`\`\`

### Common Mistakes to Avoid
- Never mix raw \`null\`/\`undefined\` inside a pipe — wrap in Option first
- Never put side effects inside \`TEmap\` — handle at the call site after executing the task
- Use \`flatMap\` not \`chain\` (deprecated)
- Use \`fp-ts/boolean\` \`match\` instead of ternary expressions
- Use \`Acompact\` to filter out \`none\` values from an array of Options
- Prefix imports with module letter: \`O\` (Option), \`TE\` (TaskEither), \`E\` (Either), \`A\` (Array), \`B\` (boolean), \`S\` (string), \`R\` (Record)
`.trim()

export default function fpTsGuidance(pi: ExtensionAPI) {
  pi.on("before_agent_start", (event) => {
    const options: BuildSystemPromptOptions = event.systemPromptOptions
    options.sections.fp_ts_guidance = FP_TS_GUIDANCE
  })

}

