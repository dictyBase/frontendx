import React from "react"

const reactVirtualized = jest.genMockFromModule("react-virtualized")
const autoSizerProps = {
    height: 100,
    width: 100
}
const MockAutoSizer = props => {
    return <div> {props.children(autoSizerProps)} </div>
}

reactVirtualized.AutoSizer = MockAutoSizer

module.exports = reactVirtualized
