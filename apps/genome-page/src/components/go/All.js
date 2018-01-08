import React, { Component } from 'react'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'
import '../../styles/index.css'

export default class All extends Component {
    state = { 
        comments: []
     }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(comments => this.setState({ comments }))
    }

    getRowHeight = ({ index }) => {
        const data = this.state.comments
        const cellHeight = this.props.cellHeight
        if (data[index]) {
            const remainder = data[index].name.length % 54
            let lines = data[index].name.length / 54
            if (remainder > 0) {
                lines += 1
            }
            const height = lines * 30
            return height >= cellHeight ? height : cellHeight
        }
        return cellHeight
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
                borderBottom: '1px solid #efefef'
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

    render() {
        const rowCount = this.state.comments.length
        const { cellWidth, height } = this.props

        return (
            <div className="wrapper">
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    rowCount={rowCount}
                    loadMoreRows={this.loadMoreRows}
                    threshold={10}
                >        
                {({onRowsRendered, registerChild}) =>
                <Table
                    headerHeight={50}
                    height={height}
                    width={cellWidth * 6 + 100}
                    rowCount={rowCount}
                    rowGetter={ ({index}) => this.state.comments[index] }
                    rowHeight={this.getRowHeight}
                    rowStyle={this.getRowStyle}
                    onRowsRendered={onRowsRendered}
                >
                    <Column
                        label="GO term + Extension"
                        dataKey="name"
                        width={ 250 }
                    />
                    <Column
                        label="Evidence"
                        dataKey="postId"
                        width={ 100 }
                    />
                    <Column
                        label="With"
                        dataKey="email"
                        width={ 100 }
                    />
                    <Column
                        label="Reference"
                        dataKey="name"
                        width={ 250 }
                    />
                    <Column
                        label="Date"
                        dataKey="id"
                        width={ 75 }
                    />
                    <Column
                        label="Source"
                        dataKey="postId"
                        width={ 75 }
                    />
                </Table>
            }
            </InfiniteLoader>
            </div>
        )
    }
}

All.defaultProps = {
    cellWidth: 130,
    cellHeight: 90,
    height: 630
}