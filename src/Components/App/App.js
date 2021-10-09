import React from 'react';
import Spotify from '../../util/Spotify';
import './App.css';
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";

class App extends React.Component {
  constructor(props){
    super(props)
    this.state= { 
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }
    this.addTrack= this.addTrack.bind(this);
    this.removeTrack= this.removeTrack.bind(this);
    this.updatePlaylistName= this.updatePlaylistName.bind(this);
    this.savePlaylist= this.savePlaylist.bind(this);
    this.search= this.search.bind(this);
  }

  addTrack(track){
    let playList= this.state.playlistTracks;
    if(playList.find(savedTrack=> savedTrack.id === track.id)){
      return;
    }else{
      playList.push(track)
      this.setState({ playlistTracks: playList })
    }
  }


  removeTrack(track){
    let playList= this.state.playlistTracks;
    playList= playList.filter(savedTrack=> savedTrack.id !== track.id)
    
    this.setState({ playlistTracks: playList })
  }

  updatePlaylistName(name){
    this.setState({ playlistName: name })
  }

  savePlaylist(){
    const trackURIs= this.state.playlistTracks.map(track=> track.uri);
    
    Spotify.savePlaylist(this.state.playlistName, trackURIs)
    .then(()=>{ 
      this.setState({ 
        playlistName: 'New Playlist',
        playlistTracks: [] })
      console.log('playlist default name: ' + this.state.playlistName)
    })
    
  }

  search(term){
    Spotify.search(term)
    .then(result=>{
      this.setState({ searchResults: result})
      console.log(this.state.searchResults)
    })
  }


  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults 
              tracks={this.state.searchResults} 
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist} />

          </div>
        </div>
      </div>
    );
  }
}

export default App;
