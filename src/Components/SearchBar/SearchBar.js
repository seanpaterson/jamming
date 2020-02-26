import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        };
        this.search = this.search.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            searchTerm: e.target.value
        });
    }

    search() {
        this.props.onSearch(this.state.searchTerm);
    }

    render() {
        return (
            <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={this.onChange}/>
            <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;