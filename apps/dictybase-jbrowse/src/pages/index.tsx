import { ACCESS } from "@dictybase/auth"
import { useState, useEffect } from "react"
import { createViewState, JBrowseApp } from "@jbrowse/react-app2"
import { TestPlugin } from "../plugins/testPlugin"
// import './App.css'
import config from "../config.dev.json"

type ViewModel = ReturnType<typeof createViewState>
const App = () => {
  const [viewState, setViewState] = useState<ViewModel>()

  useEffect(() => {
    const state = createViewState({ config: JSON.parse(config), plugins: [TestPlugin] })
    setViewState(state)
  }, [])

  if (!viewState) {
    return null
  }

  return <JBrowseApp viewState={viewState} />
}

export default App
export const access = ACCESS.public
