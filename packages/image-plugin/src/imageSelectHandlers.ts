import { pipe } from "fp-ts/function"
import {
  of as Oof,
  filter as Ofilter,
  map as Omap,
  fromNullable as OfromNullable,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { $isImageNode } from "./ImageNode"
import { $getNodeFromDOMNode } from "lexical"

const targetIsNode = (target: EventTarget): target is Node =>
  target instanceof Node
const targetIsImage = (target: EventTarget) =>
  pipe(
    target,
    Oof,
    Ofilter(targetIsNode),
    Omap($getNodeFromDOMNode),
    OflatMap(OfromNullable),
    Omap($isImageNode),
    OgetOrElse(() => false),
  )

export { targetIsImage }
