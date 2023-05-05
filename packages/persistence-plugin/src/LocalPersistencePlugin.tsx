import { useEffect } from "react"
import SaveButton from "./SaveButton"
import useLocalStorage from "./useLocalStorage"

type LocalPersistencePluginProperties = {
  storageKey: string | undefined
  editable: boolean
}

const LocalPersistencePlugin = ({
  storageKey,
  editable,
}: LocalPersistencePluginProperties) => {
  const { retrieveLocalStorage, saveLocalStorage } = useLocalStorage(storageKey)

  useEffect(() => {
    retrieveLocalStorage()
  }, [retrieveLocalStorage])

  return editable ? <SaveButton handleSave={saveLocalStorage} /> : <></>
}

export default LocalPersistencePlugin
