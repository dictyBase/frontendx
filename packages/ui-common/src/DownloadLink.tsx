import { FC, MouseEventHandler } from "react"

const downloadFromAPI: (
  filename: string,
) => MouseEventHandler<HTMLAnchorElement> =
  (filename: string) => async (event) => {
    event.preventDefault()
    const response = await fetch(event.currentTarget.href)
    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = objectUrl
    link.download = filename
    link.click()
    URL.revokeObjectURL(objectUrl)
  }

type DownloadLinkProperties = {
  resourceUrl: string
  text: string
  filename: string
}

const DownloadLink: FC<DownloadLinkProperties> = ({
  resourceUrl,
  text,
  filename,
}) => (
  <a href={resourceUrl} onClick={downloadFromAPI(filename)}>
    {text}
  </a>
)

export { DownloadLink }
