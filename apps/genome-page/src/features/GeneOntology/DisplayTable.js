// @flow
import React, { Component } from "react"
import { Table, Column } from "react-virtualized"
import "react-virtualized/styles.css"

const BASE_ROW_HEIGHT = 30
const MAX_NAME_CHARS_PER_LINE = 20

type Props = {
    /** Width of table cell */
    cellWidth: number,
    /** Height of table cell */
    cellHeight: number,
    /** Height of table */
    height: number,
    /** The data fetched from the API */
    data: Object
}

/**
 * React Virtualized table that displays relevant GO data
 */

export default class DisplayTable extends Component<Props> {
    static defaultProps = {
        cellWidth: 130,
        cellHeight: 60,
        height: 330
    }

    getRowHeight = ({ index }: { index: number }) => {
        const data = this.props.data[index]
        const numLines = Math.ceil(data.term.length / MAX_NAME_CHARS_PER_LINE)

        // if (numLines > MAX_NAME_CHARS_PER_LINE) {
        //     return numLines * BASE_ROW_HEIGHT
        // } else {
        //     return BASE_ROW_HEIGHT
        // }

        return numLines * BASE_ROW_HEIGHT
    }
    getRowStyle = ({ index }: { index: number }) => {
        if (index === -1) {
            return {
                margin: "0 auto",
                borderTop: "1px solid #efefef",
                borderBottom: "1px solid #efefef"
            }
        } else if (index === this.props.data.length) {
            return {}
        } else if (index % 2 > 0) {
            return {
                borderBottom: "1px solid #efefef",
                backgroundColor: "#eaf2ff"
            }
        } else if (index % 2 === 0) {
            return {
                borderBottom: "1px solid #efefef"
            }
        }
    }
    rowGetter = ({ index }: { index: number }) => {
        const data = this.props.data
        if (data[index]) {
            return data[index]
        }
    }
    cellDataGetter = ({
        rowData,
        dataKey
    }: {
        rowData: Object,
        dataKey: string
    }) => {
        if (rowData) {
            return rowData[dataKey]
        }
    }
    descriptorRenderer = ({
        rowData,
        cellData
    }: {
        rowData: Object,
        cellData: any
    }) => {
        if (rowData) {
            return <div style={{ whiteSpace: "normal" }}>{cellData}</div>
        }
    }

    render() {
        const rowCount = this.props.data.length
        const { cellWidth, cellHeight } = this.props

        return (
            <div className="wrapper">
                <Table
                    headerHeight={50}
                    height={cellHeight * 7}
                    width={cellWidth * 3 + 250 + 250}
                    rowCount={rowCount}
                    rowGetter={this.rowGetter}
                    rowHeight={this.getRowHeight}
                    rowStyle={this.getRowStyle}>
                    <Column
                        label="GO term + Extension"
                        dataKey="term"
                        width={250}
                        cellDataGetter={this.cellDataGetter}
                        cellRenderer={this.descriptorRenderer}
                    />
                    <Column label="Evidence" dataKey="evidence" width={100} />
                    <Column
                        label="With"
                        dataKey="with"
                        width={150}
                        cellDataGetter={this.cellDataGetter}
                        cellRenderer={this.descriptorRenderer}
                    />
                    <Column
                        label="Reference"
                        dataKey="reference"
                        width={250}
                        cellDataGetter={this.cellDataGetter}
                        cellRenderer={this.descriptorRenderer}
                    />
                    <Column label="Date" dataKey="date" width={100} />
                    <Column label="Source" dataKey="source" width={100} />
                </Table>
            </div>
        )
    }
}
