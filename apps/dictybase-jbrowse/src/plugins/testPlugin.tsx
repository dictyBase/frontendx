import { useState, useEffect } from "react"
import Plugin from "@jbrowse/core/Plugin"
import type PluginManager from "@jbrowse/core/PluginManager"

const requestBody = { operationName: "GeneGeneralInformationSummary", variables: { gene: "aslA-2" }, query: "query GeneGeneralInformationSummary($gene: String!) {\n  geneGeneralInformation(gene: $gene) {\n    id\n    name_description\n    gene_product\n    synonyms\n    description\n    __typename\n  }\n}" }

const GeneInfoPanel = ({ feature }) => {
  const [info, setInfo] = useState(null)
  useEffect(() => {
    const getGeneInfo = async () => {
      const response = await fetch("https://graphql.dictybase.dev/graphql", {
        method: "POST", body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const { data } = await response.json()
      setInfo(data.geneGeneralInformation)
    }
    getGeneInfo()

  }, [setInfo])
  console.log(info)
  return (
    <div>
      <p>{info.id}</p>
      <p>{feature.name}</p>
      <p>{info.description}</p>
    </div>
  )
}
// Define a class that implements `install`.
class TestPlugin extends Plugin {
  name = "GeneInfoPlugin"
  install(pluginManager: PluginManager) {
    pluginManager.addToExtensionPoint("Core-extraFeaturePanel", (_, { feature }) => {
      console.log(feature)
      if (feature.type === "gene") return ({ name: "Gene Info", Component: GeneInfoPanel })
      return null
    })
  }
}

export { TestPlugin }
