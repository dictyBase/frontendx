// worker.ts
import { WebWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

const options = {
  modelId: "xxx",
}
// A handler that resides in the worker thread
const handler = new WebWorkerMLCEngineHandler();

self.onmessage = (msg: MessageEvent) => {
  handler.onmessage(msg);
};
