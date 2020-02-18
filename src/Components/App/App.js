import React from 'react';
import './App.css';
import SearchBar from'../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const track = {
  name: "Hello",
  artist: "Again",
  album: "Friend of a friend",
  id: 0,
  uri: "___"
};

const tracks = [track, track, track];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: tracks,
      playlistName: "DEFAULT",
      playlistTracks: tracks
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
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

  savePlaylist(){

  }

  render(){
  return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd= {this.addTrack}/>
          <Playlist name= {this.state.playlistName} tracks= {this.state.playlistTracks} onRemove= {this.removeTrack} onNameChange= {this.updatePlaylistName}/>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
