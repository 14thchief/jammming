import "./TrackList.css";
import Track from  "../Track/Track";
import React from "react";

class TrackList extends React.Component{

    render(){
        let onAdd= this.props.onAdd;
        const onRemove= this.props.onRemove;
        let isRemoval= this.props.isRemoval;

        const tracks= this.props.tracks && this.props.tracks.map((track)=>{
            return <Track track={track} key={track.id} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval} />
         })

        
        return (
            <div className="TrackList">
                {tracks}
            </div>
        )
    }
}

export default TrackList;