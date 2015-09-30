import React from 'react'
import $ from 'jquery'
import store from '../store/store'

export default function tile(target) {

    target.prototype.componentDidMount = function(e) {
        $('html, body').animate({
            scrollTop: $('#fulltile').offset().top
        }, 500);
    };

    target.prototype.close = function(e) {
        store.dispatch({type: "closeFullTile"});
    };

    target.prototype.render = function() {
        return (
            <div id="fulltile" className="fulltile">
                <div className="bar">
                    <span><a onClick={(e) => this.close(e) } href={`#${this.props.tile.id}`}>close</a></span>
                </div>
                {this.content()}
            </div>
        );
    };
}