import React, { Component } from 'react'
import { Table, Column } from 'react-virtualized'
import 'react-virtualized/styles.css'

export default class All extends Component {
    state = { 
        comments: []
     }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/comments')
            .then(res => res.json())
            .then(comments => this.setState({ comments }))
    }

    render() {
        const rowCount = this.state.comments.length

        return (
            <div>
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
            </div>
        )
    }
}
