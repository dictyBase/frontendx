import { type ReactElement } from "react"
import {
  LexicalComposer,
  InitialConfigType,
} from "@lexical/react/LexicalComposer"

type LexicalTestComposerProperties = {
  children: ReactElement | string | (ReactElement | string)[]
  config?: Partial<InitialConfigType>
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

export const testConfig = { namespace: "Testing", onError, theme: {} }

const LexicalTestComposer = ({
  children,
  config,
}: LexicalTestComposerProperties) => (
  <LexicalComposer initialConfig={{ ...testConfig, ...config }}>
    {children}
  </LexicalComposer>
)

export { LexicalTestComposer }
