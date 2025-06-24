import { useRef, useState, useEffect } from "react"
import { CreateWebWorkerMLCEngine, WebWorkerMLCEngine, Embedding } from "@mlc-ai/web-llm"

const useMLCEngine = () => {
  const [loading, setLoading] = useState(true)
  const engineReference = useRef<WebWorkerMLCEngine>()

  useEffect(() => {
    const initMLC = async () => {
      if (!engineReference.current) {
        engineReference.current = await CreateWebWorkerMLCEngine(
          new Worker(new URL("../../worker.ts", import.meta.url), {
            type: "module",
          }),
          "snowflake-arctic-embed-s-q0f32-MLC-b4",
        )
      }
      setLoading(false)
    }
    initMLC()
  }, [])
  return { engine: engineReference.current, loading }
}

export { useMLCEngine }
