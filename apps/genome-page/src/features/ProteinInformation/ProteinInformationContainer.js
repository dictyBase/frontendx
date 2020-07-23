import React from "react"
import GeneralInformation from "./Tables/GeneralInformation"
import Links from "./Tables/Links"
import ProteinDomains from "./Tables/ProteinDomains"
import ProteinSequence from "./Tables/ProteinSequence"

const ProteinInformationContainer = () => (
  <div>
    <GeneralInformation />
    <Links />
    <ProteinDomains />
    <ProteinSequence />
  </div>
)

export default ProteinInformationContainer
