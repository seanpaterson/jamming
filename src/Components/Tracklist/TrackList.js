import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TracklList (props) {
        return (
            <div className="TrackList">
            {
                props.tracks.map(track => {
                    return <Track 
                        track={track} 
                        key={track.id} 
                        onAdd= {props.onAdd} 
                        onRemove= {props.onRemove}
                        isRemove= {props.isRemove}
                    />;
                })
            }
            </div>
        );
}

export default TracklList;