import { useRef } from "react"

export type BasicImageComponentProperties = {
  src: string
}

const BasicImageComponent = ({ src }: BasicImageComponentProperties) => {
  const imageReference = useRef<HTMLImageElement>(null)

  return <img ref={imageReference} alt="Sample" src={src} height="250px" width="250px" />
}

export { BasicImageComponent }
