// src/mocks/browser.js
import { setupWorker } from "msw/browser"
import { handlers } from "./handlers"

// This configures a Service Worker with the given request handlers.
const worker = setupWorker(...handlers)
// eslint-disable-next-line import/no-default-export
export default worker
