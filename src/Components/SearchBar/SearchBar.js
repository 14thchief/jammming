import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.state= { term: '' }
        this.search= this.search.bind(this)
        this.handleTermChange= this.handleTermChange.bind(this)
    }


    search(){
        const onSearch= this.props.onSearch;
        onSearch(this.state.term);
    }

    handleTermChange(event){
        
        const value= event.target.value;
        console.log(value);

        this.setState({ term: value })
        console.log(this.state.term)
        console.log(this.state.term)
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;