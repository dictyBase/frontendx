import React, { Component } from "react"
import ProtVista from "ProtVista"
import "ProtVista/style/main.css"

class ProteinInformationContainer extends Component {
  constructor(props) {
    super(props)
    this.protRef = React.createRef()
  }
  componentDidMount() {
    new ProtVista({
      el: this.protRef.current,
      uniprotacc: "P05067",

      exclusions: [
        "SEQUENCE_INFORMATION",
        "STRUCTURAL",
        "TOPOLOGY",
        "MUTAGENESIS",
        "MOLECULE_PROCESSING",
        "PROTEOMICS",
        "VARIATION",
        "ANTIGEN",
      ],
    })
  }
  render() {
    return <div ref={this.protRef} />
  }
}

export default ProteinInformationContainer
