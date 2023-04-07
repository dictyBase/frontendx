import { LexicalComposer } from "@lexical/react/LexicalComposer"

type LexicalTestComposerProperties = {
  children: JSX.Element | string | (JSX.Element | string)[]
}

const onError = (error: Error) => {
  // eslint-disable-next-line no-console
  console.error(error)
}

export const testConfig = { namespace: "Testing", onError, theme: {} }

const LexicalTestComposer = ({ children }: LexicalTestComposerProperties) => (
  <LexicalComposer initialConfig={testConfig}>{children}</LexicalComposer>
)

export default LexicalTestComposer
