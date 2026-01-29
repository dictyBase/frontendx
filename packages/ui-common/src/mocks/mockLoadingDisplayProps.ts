import type { LoadingDisplayProperties } from "../LoadingDisplay"

const mockLoadingDisplayProps: LoadingDisplayProperties = {
  rows: 3,
  height: 50,
}

const mockLoadingDisplayPropsDefault: LoadingDisplayProperties = {
  rows: 1,
  height: 35,
}

const mockLoadingDisplayPropsStringHeight: LoadingDisplayProperties = {
  rows: 5,
  height: "100px",
}

export {
  mockLoadingDisplayProps,
  mockLoadingDisplayPropsDefault,
  mockLoadingDisplayPropsStringHeight,
}
