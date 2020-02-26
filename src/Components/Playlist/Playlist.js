import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component{
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    render() {
        return (
            <div className="Playlist">
            <input onChange={this.handleNameChange}/>
            <button className="Playlist-save" onClick= {this.props.onSave}>SAVE TO SPOTIFY</button>
            <TrackList tracks= {this.props.tracks} onRemove= {this.props.onRemove} isRemoval= {true}/>
            </div>
        );
    } 
}

export default Playlist;