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
                    height={630}
                    width={1000}
                    rowCount={rowCount}
                    rowGetter={ ({index}) => this.state.comments[index] }
                    rowHeight={50}
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
