import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { Provider, createStore } from "jotai"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import {
  imageAlignmentAtom,
  isResizingAtom,
  ALIGNMENT,
} from "@dictybase/resizable-image"
import { ImageComponent } from "../ImageComponent"
import { ImageNode } from "../ImageNode"

vi.mock("@dictybase/resizable-image", async () => {
  const actual = await vi.importActual<Record<string, unknown>>(
    "@dictybase/resizable-image",
  )
  return {
    ...actual,
    ResizableImage: ({ src, alt }: { src: string; alt?: string }) => (
      <img src={src} alt={alt} />
    ),
  }
})

const testConfig = {
  namespace: "test",
  theme: {},
  onError: () => {},
  nodes: [ImageNode],
}

const renderWithAlignment = (alignment: ALIGNMENT) => {
  const store = createStore()
  store.set(imageAlignmentAtom, alignment)
  store.set(isResizingAtom, false)

  return render(
    <Provider store={store}>
      <LexicalComposer initialConfig={testConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <ImageComponent
          src="test.jpg"
          nodeKey="test-key"
          alt="test image"
          fit="fill"
          duration={200}
          easing="linear"
        />
      </LexicalComposer>
    </Provider>,
  )
}

test("ImageComponent renders with LEFT alignment", () => {
  renderWithAlignment(ALIGNMENT.LEFT)
  expect(screen.getByRole("img")).toBeInTheDocument()
})

test("ImageComponent renders with CENTER alignment", () => {
  renderWithAlignment(ALIGNMENT.CENTER)
  expect(screen.getByRole("img")).toBeInTheDocument()
})

test("ImageComponent renders with RIGHT alignment", () => {
  renderWithAlignment(ALIGNMENT.RIGHT)
  expect(screen.getByRole("img")).toBeInTheDocument()
})
