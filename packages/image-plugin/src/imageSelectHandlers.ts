import { pipe } from "fp-ts/function"
import {
  of as Oof,
  filter as Ofilter,
  map as Omap,
  fromNullable as OfromNullable,
  flatMap as OflatMap,
  getOrElse as OgetOrElse,
} from "fp-ts/Option"
import { Eq as SEq } from "fp-ts/string"
import { $getNodeFromDOMNode } from "lexical"

const targetIsNode = (target: EventTarget): target is Node => {
  return target instanceof Node
}
const targetIsImage = (target: EventTarget) => {
  return pipe(
    target,
    Oof,
    Ofilter(targetIsNode),
    Omap($getNodeFromDOMNode),
    OflatMap(OfromNullable),
    Omap((node) => SEq.equals(node.getType(), "image")),
    OgetOrElse(() => false),
  )
}

export { targetIsImage }
