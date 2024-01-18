import { useState } from "react"

/** The props for {@link useCounter} hook */
export interface useCounterProps {
  /** The initial number to start with */
  start?: number
}

/** React hook that provides a counter and a function
* to change its value 
*/
export function useCounter({start = 0}:useCounterProps) {
  const [counter, setCount] = useState<number>(start)
  return { counter, setCount }
}
