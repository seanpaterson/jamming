import React from 'react';
import './App.css';
import SearchBar from'../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

const track = {
  name: "Hello",
  artist: "Again",
  album: "Friend of a friend",
  id: 0
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
  }

  addTrack(track) {
    this.state.playlistTracks.map(id => {
      if(track.id === id)
        return;
    });
    this.setState((state, track) => ({
      playlistTracks: state.playlistTracks.push(track)
    }));
  }

  removeTrack(track) {
    this.state.playlistTracks.map(id => {
      if(track.id === id)
        {
          this.setState((state, track) => ({
            playlistTracks: state.playlistTracks.remove(track)
          }));
        }
    });
  }

  render(){
  return (
    <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd= {this.addTrack}/>
          <Playlist name= {this.state.playlistName} tracks= {this.state.playlistTracks} onRemove= {this.removeTrack}/>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
