import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist(props) {
    return (
        <div className="Playlist">
        <input value="New Playlist"/>
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
        <TrackList tracks= {props.tracks} onRemove= {props.onRemove} isRemoval= {true}/>
        </div>
    );
}

export default Playlist;