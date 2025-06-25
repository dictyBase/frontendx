// worker.ts
import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm"

// A handler that resides in the worker thread
const handler = new WebWorkerMLCEngineHandler()

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", (message: MessageEvent) => {
  handler.onmessage(message)
})
