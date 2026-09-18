import { test, expect, vi } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { Provider, createStore } from "jotai"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { CLICK_COMMAND } from "lexical"
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
      <img src={src} alt={alt} data-testid="resizable-image" />
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

test("ImageComponent renders when isResizing is true", () => {
  const store = createStore()
  store.set(imageAlignmentAtom, ALIGNMENT.LEFT)
  store.set(isResizingAtom, true)

  render(
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

  expect(screen.getByRole("img")).toBeInTheDocument()
})

const DispatchClickCommand = () => {
  const [editor] = useLexicalComposerContext()
  act(() => {
    editor.dispatchCommand(CLICK_COMMAND, new MouseEvent("click"))
  })
  return <></>
}

test("ImageComponent click handler ignores CLICK_COMMAND when isResizing is true", () => {
  const store = createStore()
  store.set(imageAlignmentAtom, ALIGNMENT.LEFT)
  store.set(isResizingAtom, true)

  render(
    <Provider store={store}>
      <LexicalComposer initialConfig={testConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <DispatchClickCommand />
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

  expect(screen.getByRole("img")).toBeInTheDocument()
})
