import { ReactNode } from "react"

type IEditorHolderProperties = {
  minHeight: string
  children: ReactNode
}

const EditorHolder = ({ minHeight, children }: IEditorHolderProperties) => (
  <div style={{ minHeight }}>{children}</div>
)

export { EditorHolder }
