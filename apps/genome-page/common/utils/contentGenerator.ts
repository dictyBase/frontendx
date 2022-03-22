import ProductInfoPanel from "components/features/Summary/Panels/ProductInfoPanel"
import PanelWrapper from "components/panels/PanelWrapper"
import { Content, GeneQuery, Gene } from "dicty-graphql-schema"
import { Component } from "react"

interface ContentGeneratorProps {
  req: [String]
  gene: Gene
}

interface ReturnProps {
  title: String
  route: String
  subComponent: Component
}

/* 
  This function will take in props and return the container items
*/
const contentGenerator = (params: ContentGeneratorProps) => {}

export default contentGenerator
