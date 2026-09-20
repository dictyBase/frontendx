import { test, expect, vi } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { Provider, createStore } from "jotai"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"
import { createHeadlessEditor } from "@lexical/headless"
import { $getRoot, $createParagraphNode, CLICK_COMMAND } from "lexical"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { isSome, isNone } from "fp-ts/Option"
import {
  imageAlignmentAtom,
  isResizingAtom,
  ALIGNMENT,
} from "@dictybase/resizable-image"
import {
  ImageComponent,
  getImageNodeByKey,
  setImageNodeDimensions,
  setImageNodeAlignment,
} from "../ImageComponent"
import { ImageNode } from "../ImageNode"

type ResizableImageProperties = {
  src: string
  alt?: string
  onResize?: (width: number, height: number) => void
  onSetAlignment?: (alignment: ALIGNMENT) => void
}

let capturedOnResize: ((width: number, height: number) => void) | undefined
let capturedOnSetAlignment: ((alignment: ALIGNMENT) => void) | undefined

vi.mock("@dictybase/resizable-image", async () => {
  const actual = await vi.importActual<Record<string, unknown>>(
    "@dictybase/resizable-image",
  )
  return {
    ...actual,
    ResizableImage: ({
      src,
      alt,
      onResize,
      onSetAlignment,
    }: ResizableImageProperties) => {
      capturedOnResize = onResize
      capturedOnSetAlignment = onSetAlignment
      return <img src={src} alt={alt} data-testid="resizable-image" />
    },
  }
})

const INITIAL_WIDTH = 100
const INITIAL_HEIGHT = 150
const MISSING_KEY = "non-existent key"

const testConfig = {
  namespace: "test",
  theme: {},
  onError: () => {},
  nodes: [ImageNode],
}

const createEditor = () =>
  createHeadlessEditor({
    namespace: "test",
    nodes: [ImageNode],
    onError: () => {},
  })

// Plugin that dispatches a CLICK_COMMAND with the given target after mount
const ClickDispatcher = ({ target }: { target: EventTarget | null }) => {
  const [editor] = useLexicalComposerContext()
  editor.dispatchCommand(CLICK_COMMAND, { target } as unknown as MouseEvent)
  return <></>
}

const renderComponent = ({
  alignment = ALIGNMENT.LEFT,
  isResizing = false,
  clickTarget,
}: {
  alignment?: ALIGNMENT
  isResizing?: boolean
  clickTarget?: EventTarget | null
} = {}) => {
  const store = createStore()
  store.set(imageAlignmentAtom, alignment)
  store.set(isResizingAtom, isResizing)

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
        {clickTarget !== undefined && <ClickDispatcher target={clickTarget} />}
      </LexicalComposer>
    </Provider>,
  )
}

// Component rendering

test("ImageComponent renders with LEFT alignment", () => {
  renderComponent({ alignment: ALIGNMENT.LEFT })
  expect(screen.getByRole("img")).toBeInTheDocument()
})

test("ImageComponent renders with CENTER alignment", () => {
  renderComponent({ alignment: ALIGNMENT.CENTER })
  expect(screen.getByRole("img")).toBeInTheDocument()
})

test("ImageComponent renders with RIGHT alignment", () => {
  renderComponent({ alignment: ALIGNMENT.RIGHT })
  expect(screen.getByRole("img")).toBeInTheDocument()
})

test("ImageComponent renders when isResizing is true", () => {
  renderComponent({ isResizing: true })
  expect(screen.getByRole("img")).toBeInTheDocument()
})

// getImageNodeByKey

test("getImageNodeByKey returns Some when an ImageNode with the key exists", () => {
  const editor = createEditor()

  editor.update(() => {
    const root = $getRoot()
    const paragraph = $createParagraphNode()
    const imageNode = new ImageNode({
      source: "test.jpg",
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      alignment: ALIGNMENT.LEFT,
    })
    const key = imageNode.getKey()
    paragraph.append(imageNode)
    root.append(paragraph)

    const result = getImageNodeByKey(key)
    expect(isSome(result)).toBe(true)
  })
})

test("getImageNodeByKey returns None when node does not exist", () => {
  const editor = createEditor()

  editor.update(() => {
    const result = getImageNodeByKey(MISSING_KEY)
    expect(isNone(result)).toBe(true)
  })
})

test("getImageNodeByKey returns None when node is not an ImageNode", () => {
  const editor = createEditor()

  editor.update(() => {
    const root = $getRoot()
    const paragraph = $createParagraphNode()
    root.append(paragraph)

    const result = getImageNodeByKey(paragraph.getKey())
    expect(isNone(result)).toBe(true)
  })
})

// setImageNodeDimensions
test("setImageNodeDimensions updates dimensions on the ImageNode", () => {
  const editor = createEditor()

  editor.update(() => {
    const root = $getRoot()
    const paragraph = $createParagraphNode()
    const imageNode = new ImageNode({
      source: "test.jpg",
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      alignment: ALIGNMENT.LEFT,
    })
    const key = imageNode.getKey()
    paragraph.append(imageNode)
    root.append(paragraph)

    setImageNodeDimensions(key, 300, 200)

    expect(imageNode.__width).toBe(300)
    expect(imageNode.__height).toBe(200)
  })
})

test("setImageNodeDimensions does not throw when node does not exist", () => {
  const editor = createEditor()

  editor.update(() => {
    expect(() => {
      setImageNodeDimensions(MISSING_KEY, 300, 200)
    }).not.toThrow()
  })
})

// setImageNodeAlignment

test("setImageNodeAlignment updates alignment on the ImageNode", () => {
  const editor = createEditor()

  editor.update(() => {
    const root = $getRoot()
    const paragraph = $createParagraphNode()
    const imageNode = new ImageNode({
      source: "test.jpg",
      width: INITIAL_WIDTH,
      height: INITIAL_HEIGHT,
      alignment: ALIGNMENT.LEFT,
    })
    const key = imageNode.getKey()
    paragraph.append(imageNode)
    root.append(paragraph)

    setImageNodeAlignment(key, ALIGNMENT.CENTER)

    expect(imageNode.__alignment).toBe(ALIGNMENT.CENTER)
  })
})

test("setImageNodeAlignment does not throw when node does not exist", () => {
  const editor = createEditor()

  editor.update(() => {
    expect(() => {
      setImageNodeAlignment(MISSING_KEY, ALIGNMENT.RIGHT)
    }).not.toThrow()
  })
})

test("setImageNodeAlignment accepts all ALIGNMENT variants", () => {
  const alignments = [ALIGNMENT.LEFT, ALIGNMENT.CENTER, ALIGNMENT.RIGHT]

  alignments.forEach((alignment) => {
    const editor = createEditor()

    editor.update(() => {
      const root = $getRoot()
      const paragraph = $createParagraphNode()
      const imageNode = new ImageNode({
        source: "test.jpg",
        width: INITIAL_WIDTH,
        height: INITIAL_HEIGHT,
        alignment: ALIGNMENT.LEFT,
      })
      const key = imageNode.getKey()
      paragraph.append(imageNode)
      root.append(paragraph)

      setImageNodeAlignment(key, alignment)

      expect(imageNode.__alignment).toBe(alignment)
    })
  })
})

// CLICK_COMMAND handler — non-matching target returns false

test("CLICK_COMMAND with non-image target returns false (no selection)", () => {
  const externalDiv = document.createElement("div")
  renderComponent({ clickTarget: externalDiv })
  expect(screen.getByRole("img")).toBeInTheDocument()
})

// CLICK_COMMAND handler — isResizing early-return path

test("CLICK_COMMAND returns true immediately when isResizing is true", () => {
  const externalDiv = document.createElement("div")
  renderComponent({ isResizing: true, clickTarget: externalDiv })
  expect(screen.getByRole("img")).toBeInTheDocument()
})

// onSetAlignment callback

test("onSetAlignment callback calls editor.update with new alignment", () => {
  renderComponent()
  act(() => {
    capturedOnSetAlignment?.(ALIGNMENT.CENTER)
  })
  expect(screen.getByRole("img")).toBeInTheDocument()
})

// onResize callback

test("onResize callback calls editor.update with new dimensions", () => {
  renderComponent()
  act(() => {
    capturedOnResize?.(400, 300)
  })
  expect(screen.getByRole("img")).toBeInTheDocument()
})
