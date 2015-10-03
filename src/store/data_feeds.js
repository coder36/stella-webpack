import store from './store';
import $ from 'jquery';
import 'whatwg-fetch';
(function readNewsData() {
    let id = 1;
    $.ajax({
        url: '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&q=http://feeds.skynews.com/feeds/rss/home.rss',
        type: 'GET',
        dataType: 'jsonp',
        cache: false } )
        .done( (json) => {
            const entries = json.responseData.feed.entries;

            entries.forEach((entry) =>{
                entry.id = `n_${id++}`;
                entry.type = 'news';
                entry.fullScreen = false;
            });

            store.dispatch({type: "addTiles", data: entries});
        }
    );
})();


(function readSeriesData() {
    let id = 1;
    fetch("/series.json")
        .then(resp => resp.json())
        .then((tiles) => {
            tiles.forEach( (tile) => {
                tile.id  = `s_${id++}`;
                tile.fullScreen = false;
            });

            store.dispatch({type: "addTiles", data: tiles});
        }
    );
})();


(function readCustomerBillData() {
    fetch("/bill.json")
        .then(resp => resp.json())
        .then( (json) => {
            let tile = json;
            tile.type = 'your_bill';
            tile.id = 'your_bill';
            tile.fullScreen = false;
            store.dispatch({type: "addTiles", data: [tile]});
        }
    );
})();


(function listenForResize() {
    window.onresize = () => store.dispatch({type: "redrawPage"});
})();



