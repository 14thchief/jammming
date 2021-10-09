import React from 'react';
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";


class SearchResults extends React.Component{
    
    render(){
        const tracks= this.props.tracks;
        let onAdd= this.props.onAdd;
        let isRemoval= false;
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <TrackList tracks={tracks} onAdd={onAdd} isRemoval={isRemoval} />
            </div>
        )
    }
}


export default SearchResults;