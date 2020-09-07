import React, { Component } from 'react'

export class SearchRes extends Component {
    render() {
        const query = this.props.match.params.query;

        return (
            <div>
                {query}
            </div>
        )
    }
}

export default SearchRes
