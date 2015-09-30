import React from 'react'
import Tile from './tile_full'

@Tile
export default class InfoFull extends React.Component {

    content() {
        let info = this.props.tile;
        return(
            <div className="description_container">
                <div className="title">
                    {info.title}
                </div>

                <div className="description">
                    {info.content}
                </div>
            </div>
        )
    }

}