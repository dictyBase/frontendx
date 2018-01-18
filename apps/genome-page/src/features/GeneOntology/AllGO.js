import React, { Component } from 'react'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'

const BASE_ROW_HEIGHT = 30
const MAX_NAME_CHARS_PER_LINE = 20

export default class AllGO extends Component {
    state = {
        comments: []
    }
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(comments => this.setState({ comments }))
    }
    getRowHeight = ({ index }) => {
        const data = this.state.comments[index]
        const numLines = Math.ceil(data.name.length / MAX_NAME_CHARS_PER_LINE)

        // if (numLines > MAX_NAME_CHARS_PER_LINE) {
        //     return numLines * BASE_ROW_HEIGHT
        // } else {
        //     return BASE_ROW_HEIGHT
        // }

        return numLines * BASE_ROW_HEIGHT
    }
    getRowStyle = ({ index }) => {
        const data = this.state.comments
        if (index === -1) {
            return {
                margin: '0 auto',
                borderTop: '1px solid #efefef',
                borderBottom: '1px solid #efefef'
            }
        } else if (index === data.length) {
            return {}
        } else if (index % 2 > 0) {
            return {
                borderBottom: '1px solid #efefef',
                backgroundColor: '#eaf2ff'
            }
        } else if (index % 2 === 0) {
            return {
                borderBottom: '1px solid #efefef'
            }
        }
    }
    isRowLoaded = ({ index }) => {
        return !!this.state.comments[index]
    }
    loadMoreRows = ({ startIndex, stopIndex }) => {
        return fetch(`/data?startIndex=${startIndex}&stopIndex=${stopIndex}`)
            .then(res => res.json())
            .then(comments => this.setState({ comments }))
    }
    rowGetter = ({ index }) => {
        const data = this.state.comments
        if (data[index]) {
            return data[index]
        }
    }
    cellDataGetter = ({ rowData, dataKey }) => {
        if (rowData) {
            return rowData[dataKey]
        }
    }
    descriptorRenderer = ({ rowData, cellData }) => {
        if (rowData) {
            return <div style={{ whiteSpace: 'normal' }}>{cellData}</div>
        }
    }

    render() {
        const rowCount = this.state.comments.length
        const { cellWidth, cellHeight } = this.props

        return (
            <div className="wrapper">
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    rowCount={rowCount}
                    loadMoreRows={this.loadMoreRows}
                    threshold={10}>
                    {({ onRowsRendered, registerChild }) => (
                        <Table
                            ref={registerChild}
                            headerHeight={50}
                            height={cellHeight * 7}
                            width={cellWidth * 3 + 250 + 250}
                            rowCount={rowCount}
                            rowGetter={this.rowGetter}
                            rowHeight={this.getRowHeight}
                            rowStyle={this.getRowStyle}
                            onRowsRendered={onRowsRendered}>
                            <Column
                                label="GO term + Extension"
                                dataKey="name"
                                width={250}
                                cellDataGetter={this.attributeGetter}
                                cellRenderer={this.descriptorRenderer}
                            />
                            <Column
                                label="Evidence"
                                dataKey="postId"
                                width={100}
                            />
                            <Column
                                label="With"
                                dataKey="email"
                                width={150}
                                cellDataGetter={this.attributeGetter}
                                cellRenderer={this.descriptorRenderer}
                            />
                            <Column
                                label="Reference"
                                dataKey="name"
                                width={250}
                                cellDataGetter={this.attributeGetter}
                                cellRenderer={this.descriptorRenderer}
                            />
                            <Column label="Date" dataKey="id" width={75} />
                            <Column
                                label="Source"
                                dataKey="postId"
                                width={75}
                            />
                        </Table>
                    )}
                </InfiniteLoader>
            </div>
        )
    }
}

AllGO.defaultProps = {
    cellWidth: 130,
    cellHeight: 90,
    height: 630
}
