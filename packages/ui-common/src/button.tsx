/**
* The props for {@link Button} component
*/
export interface ButtonProps {
  /** text to be displayed on the button */
  text: string
}

/** Button component*/
export function Button({text}:ButtonProps) {
  return <button>{text}</button>
}
