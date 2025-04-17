import localForage from "localforage"
import { STORAGE_NAME } from "./namespace"

const initializeStorage = () =>
  localForage.createInstance({
    storeName: STORAGE_NAME,
    driver: localForage.LOCALSTORAGE,
  })

export { initializeStorage }
