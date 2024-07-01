import { createElement } from "react"
import { pipe } from "fp-ts/function"
import { split as Ssplit } from "fp-ts/string"
import { map as Amap } from "fp-ts/Array"
import { map as RNEAmap } from "fp-ts/ReadonlyNonEmptyArray"

const example =
  "Though myosins share a structurally conserved motor domain, single amino acid variations of active site elements, including the P-loop, switch-1 and switch-2, which act as nucleotide sensors, can substantially determine the kinetic signature of a myosin, <i>i.e</i>., to either perform fast movement or enable long-range transport and tension generation. Switch-2 essentially contributes to the ATP hydrolysis reaction and determines product release. With few exceptions, class-1 myosin harbor a tyrosine in the switch-2 consensus sequence DIYGFE, at a position where class-2 myosins and a selection of myosins from other classes have a substitution. Here, we addressed the role of the tyrosine in switch-2 of class-1 myosins as potential determinant of the duty ratio. We generated constitutively active motor domain constructs of two class-1 myosins from the social amoeba <i>Dictyostelium discoideum</i>, namely, Myo1E, a high duty ratio myosin and Myo1B, a low duty ratio myosin. In Myo1E we introduced mutation Y388F and in Myo1B mutation F387Y. The detailed functional characterization by steady-state and transient kinetic experiments, combined with <i><b>in vitro</b></i> motility and landing assays revealed an almost reciprocal relationship of a number of critical kinetic parameters and equilibrium constants between wild-type and mutants that dictate the lifetime of the strongly actin-attached states of myosin. The Y-to-F mutation increased the duty ratio of Moy1B by almost one order of magnitude, while the introduction of the phenylalanine in switch-2 of Myo1E transformed the myosin into a low duty ratio motor. These data together with structural considerations propose a role of switch-2 in fine-tuning ADP release through a mechanism, where the class-specific tyrosine together with surrounding residues contributes to the coordination of Mg<sup>2+</sup> and ADP. Our results highlight the importance of conserved switch-2 residues in class-1 myosins for efficient chemo-mechanical coupling, revealing that switch-2 is important to adjust the duty ratio of the amoeboid class-1 myosins for performing movement, transport or gating functions."

const parseFormattedStringToDOMElements = (s: string) => {
  const tagRegex = /<(\w+)>(.+?)<\/\w+>/g
  const splitRegex = /<\w+>.+?<\/\w+>/g
  console.log([...s.matchAll(tagRegex)])
  const formattedTextElements = pipe(
    [...s.matchAll(tagRegex)],
    Amap((matches) =>
      // eslint-disable-next-line unicorn/no-null
      createElement(matches[1], null, matches[2]),
    ),
  )
  const unformattedTextElements = pipe(
    s,
    Ssplit(splitRegex),
    // eslint-disable-next-line unicorn/no-null
    RNEAmap((text) => createElement("span", null, text)),
  )
  const final = []
  // eslint-disable-next-line unicorn/no-for-loop
  for (let index = 0; index < unformattedTextElements.length; index += 1) {
    final.push(unformattedTextElements[index])
    if (formattedTextElements[index]) final.push(formattedTextElements[index])
  }
  return final
}

console.log(parseFormattedStringToDOMElements(example))
export { parseFormattedStringToDOMElements }
