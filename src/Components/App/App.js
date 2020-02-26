import React from 'react';
import './App.css';
import SearchBar from'../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    this.state.playlistTracks.map(id => {
      if(track.id === id)
        return;
    });
    this.setState((state) => ({
      playlistTracks: [...state.playlistTracks, track]
    }));
  }

  removeTrack(track) {
    var array = [...this.state.playlistTracks];
    var index = array.indexOf(track);
    array.splice(index, 1);
    this.setState({
      playlistTracks: array
    });
  }

  updatePlaylistName(name) {
    if(name != this.state.playlistName)
    {
      this.setState({
        playlistName: name
      });
    }
  }

  savePlaylist() {
    let trackURIs = new Array(this.state.playlistTracks.length);
    for(var i = 0; i < trackURIs.length; ++i)
    {
      trackURIs[i] = this.state.playlistTracks[i].uri;
    }
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: "New Playlist",
      playlistTracks: []
    });
  }

  search(term) {
    Spotify.search(term).then(results => this.setState({searchResults: results}));
  }

  render(){
  return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd= {this.addTrack}/>
          <Playlist name= {this.state.playlistName} tracks= {this.state.playlistTracks} onRemove= {this.removeTrack} onNameChange= {this.updatePlaylistName} onSave= {this.savePlaylist}/>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
