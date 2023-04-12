import useResizerStyles from "./useResizerStyles"
import { Direction, useResize } from "./useResize"

const directions: Direction[] = ["ne", "nw", "se", "sw"]

export type ImageResizerProperties = {
  onResize: (width: number, height: number) => void
}

/**
 * Renders draggable handles that can be used to resize their parent element.
 *
 * @param handleResize a callback function used to set the new dimensions of the parent element.
 */
const ImageResizer = ({ onResize }: ImageResizerProperties) => {
  const classes = useResizerStyles()
  const { onMouseDown } = useResize(onResize)

  return (
    <>
      {directions.map((direction) => (
        <div
          key={direction}
          className={`${classes.root} ${classes[direction]}`}
          onMouseDown={(event) => onMouseDown(event, direction)}
        />
      ))}
    </>
  )
}

export default ImageResizer
