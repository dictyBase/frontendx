import { test, expect } from "vitest"
import { createHeadlessEditor } from "@lexical/headless"
import { $getRoot, $createParagraphNode, $createTextNode } from "lexical"
import { DownloadLinkNode, $createDownloadLinkNode } from "../DownloadLinkNode"

const createEditor = () =>
  createHeadlessEditor({
    namespace: "test",
    nodes: [DownloadLinkNode],
    onError: (error: Error) => {
      throw error
    },
  })

const testUrl = "https://example.com/file.pdf"
const testFile = "document.pdf"
const nodeTypeName = "download-link"
test("creates download link node with factory function", () => {
  const editor = createEditor()
  editor.update(() => {
    const node = $createDownloadLinkNode(testUrl, {
      download: testFile,
    })
    expect(node).toBeInstanceOf(DownloadLinkNode)
    expect(node.getDownload()).toBe(testFile)
  })
})

test("getType returns download-link", () => {
  expect(DownloadLinkNode.getType()).toBe(nodeTypeName)
})

test("creates node without download attribute", () => {
  const editor = createEditor()
  editor.update(() => {
    const node = $createDownloadLinkNode(testUrl, {})
    expect(node.getDownload()).toBeNull()
  })
})

test("setDownload updates download attribute", () => {
  const editor = createEditor()
  editor.update(() => {
    const node = $createDownloadLinkNode(testUrl, {
      download: "old.pdf",
    })
    expect(node.getDownload()).toBe("old.pdf")

    node.setDownload("new.pdf")
    expect(node.getDownload()).toBe("new.pdf")
  })
})

test("clone creates copy with same attributes", () => {
  const editor = createEditor()
  editor.update(() => {
    const original = $createDownloadLinkNode(testUrl, {
      download: testFile,
      rel: "noopener",
      target: "_blank",
      title: "Download File",
    })

    const cloned = DownloadLinkNode.clone(original)

    expect(cloned.getDownload()).toBe(testFile)
    expect(cloned.__url).toBe(testUrl)
    expect(cloned.__rel).toBe("noopener")
    expect(cloned.__target).toBe("_blank")
    expect(cloned.__title).toBe("Download File")
  })
})

test("exportJSON includes download attribute", () => {
  const editor = createEditor()
  editor.update(() => {
    const node = $createDownloadLinkNode(testUrl, {
      download: testFile,
    })

    const json = node.exportJSON()

    expect(json.type).toBe(nodeTypeName)
    expect(json.download).toBe(testFile)
    expect(json.url).toBe(testUrl)
  })
})

test("importJSON creates node from serialized data", () => {
  const editor = createEditor()
  editor.update(() => {
    const serialized = {
      type: nodeTypeName,
      url: testUrl,
      download: testFile,
      rel: "noopener",
      target: "_blank",
      title: "Download",
      format: 0,
      indent: 0,
      direction: null,
      version: 1,
      children: [],
    }

    const node = DownloadLinkNode.importJSON(serialized)

    expect(node.getDownload()).toBe(testFile)
    expect(node.__url).toBe(testUrl)
    expect(node.__rel).toBe("noopener")
    expect(node.__target).toBe("_blank")
    expect(node.__title).toBe("Download")
  })
})

test("createDOM is called during node creation", () => {
  const editor = createEditor()
  editor.update(() => {
    const node = $createDownloadLinkNode(testUrl, {
      download: testFile,
    })

    const root = $getRoot()
    const paragraph = $createParagraphNode()
    const textNode = $createTextNode("Download")

    node.append(textNode)
    paragraph.append(node)
    root.append(paragraph)

    expect(node.getDownload()).toBe(testFile)
  })
})

test("createDOM works without download attribute", () => {
  const editor = createEditor()
  editor.update(() => {
    const node = $createDownloadLinkNode(testUrl, {})

    const root = $getRoot()
    const paragraph = $createParagraphNode()
    const textNode = $createTextNode("Link")

    node.append(textNode)
    paragraph.append(node)
    root.append(paragraph)

    expect(node.getDownload()).toBeNull()
  })
})

test("updateDOM updates download attribute when changed", () => {
  const editor = createEditor()
  editor.update(() => {
    const node = $createDownloadLinkNode(testUrl, {
      download: "old.pdf",
    })

    const root = $getRoot()
    const paragraph = $createParagraphNode()
    const textNode = $createTextNode("Download")

    node.append(textNode)
    paragraph.append(node)
    root.append(paragraph)

    node.setDownload("new.pdf")
    expect(node.getDownload()).toBe("new.pdf")
  })
})

test("can set download to null", () => {
  const editor = createEditor()

  editor.update(() => {
    const node = $createDownloadLinkNode(testUrl, {
      download: testFile,
    })

    const root = $getRoot()
    const paragraph = $createParagraphNode()
    const textNode = $createTextNode("Download")

    node.append(textNode)
    paragraph.append(node)
    root.append(paragraph)

    const writable = node.getWritable()
    writable.__download = null
    expect(node.getDownload()).toBeNull()
  })
})
