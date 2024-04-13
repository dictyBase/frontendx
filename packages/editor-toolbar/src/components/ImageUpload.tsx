import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { Container, InputLabel, Button } from "@material-ui/core"
import { useState } from "react"
import { INSERT_IMAGE_COMMAND } from "image-plugin"

type ImageUploadProperties = {
  handleImageUpload: (file: File) => Promise<string>
}

const ImageUpload = ({ handleImageUpload }: ImageUploadProperties) => {
  const [editor] = useLexicalComposerContext()
  const [selectedFile, setSelectedFile] = useState<File>()

  const onClick = async () => {
    if (!selectedFile) return
    const source = await handleImageUpload(selectedFile)
    editor.dispatchCommand(INSERT_IMAGE_COMMAND, { source, width: 400, height: 400 })
}

  return (
    <Container>
      <InputLabel htmlFor="image-upload">Choose an image to upload</InputLabel>
      <input
        type="file"
        id="image-upload"
        onChange={({ target: { validity, files } }) => {
          if (validity.valid && files && files[0]) setSelectedFile(files[0])
        }}
      />
      <Button type="button" onClick={onClick}>
        Submit
      </Button>
    </Container>
  )
}

export { ImageUpload }
