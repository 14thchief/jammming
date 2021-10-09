import "./Playlist.css";
import TrackList from "../TrackList/TrackList";
import React from "react";

class Playlist extends React.Component{
    constructor(props){
        super(props)
        this.handleNameChange= this.handleNameChange.bind(this)
    }

    handleNameChange(event){
        const onNameChange= this.props.onNameChange;
        onNameChange(event.target.value)

    }

    render(){
        let playlistTracks= this.props.playlistTracks;
        let isRemoval= true;
        return (
            <div class="Playlist">
                <input placeholder="New Playlist" onChange={this.handleNameChange} />
                <TrackList tracks={playlistTracks} onRemove={this.props.onRemove} isRemoval={isRemoval} />
                <button class="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default Playlist;