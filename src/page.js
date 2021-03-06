import Series from './tiles/series'
import SeriesFull from './tiles/series_full'
import Info from './tiles/info'
import InfoFull from './tiles/info_full'
import YourBillFull from './tiles/your_bill_full'
import YourBill from './tiles/your_bill'
import News from './tiles/news'
import NewsFull from './tiles/news_full'
import TopTile from './toptile'
import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux';
import { isRunningOnClient} from './utils'


class Page extends React.Component{

    constructor(props) {
        super(props)
    }

    getRowView() {

        if ( !isRunningOnClient() ) return this.props.tiles;
        let view = [];
        let previousBottom = null;
        this.props.tiles.forEach( (tile) => {

            let res = $('#' + tile.id );
            let bottom = res.length == 0 ? null : res[0].getBoundingClientRect().bottom;

            if ( bottom != null && (previousBottom == null || previousBottom != bottom) ) {
                view.push(null);
                previousBottom = bottom;
            }

            view.push(tile);
        });
        view.push(null);

        return view;
    }

    createTile(tile, fullScreen) {
        let type = tile.type;
        if ( type === "info" ) return fullScreen ? (<InfoFull key={`${tile.id}_full`} tile={tile}/>) : (<Info key={tile.id} tile={tile}/>);
        if ( type === "series" ) return fullScreen ? (<SeriesFull key={`${tile.id}_full`} tile={tile}/>) : (<Series key={tile.id} tile={tile}/>);
        if ( type === "your_bill" ) return fullScreen ? (<YourBillFull key={`${tile.id}_full`} tile={tile}/>) : (<YourBill key={tile.id} tile={tile}/>);
        if ( type === "news" ) return fullScreen ? (<NewsFull key={`${tile.id}_full`} tile={tile}/>) : (<News key={tile.id} tile={tile}/>);
    }

    isMobile() {
        return $('.mobile').css('display') == 'block';
    }


    render() {
        this.props.redraw_page;

        let tiles = [];
        let fullScreenTile = null;
        this.getRowView().forEach( (tile) => {
            if( tile == null && fullScreenTile  ) {
                tiles.push( this.createTile(fullScreenTile,true) );
                fullScreenTile = null;
            }
            else if (tile != null) {
                if ( tile.fullScreen ) fullScreenTile = tile;
                tiles.push( this.createTile(tile,false) );
            }
        });

        return(
            <div className="pageContainer">
                <TopTile/>
                <div className="tilesContent">
                    {tiles}
                </div>
            </div>
        )

    }
}

function select(state) {
    return {
        tiles: state.tiles
    };
}

export default connect(select)(Page)

