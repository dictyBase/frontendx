import { GoAnnotation } from "dicty-graphql-schema"

const EXPERIMENTAL_GOA = new Set([
  "EXP",
  "IMP",
  "IGI",
  "IDA",
  "IPI",
  "IEP",
  "HTP",
  "HDA",
  "HMP",
  "HGI",
  "HEP",
])

const isAny = () => true

const isExperimental = ({ evidence_code }: GoAnnotation) =>
  EXPERIMENTAL_GOA.has(evidence_code)

const isManual = ({ evidence_code }: GoAnnotation) => evidence_code !== "IEA"

const isElectronic = ({ evidence_code }: GoAnnotation) =>
  evidence_code === "IEA"

export { isAny, isExperimental, isManual, isElectronic }
