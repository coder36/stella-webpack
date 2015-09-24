import Page from './src/page'
import express from 'express'
var React = require('react/addons');

var app = express();

app.use(express.static('public'));
app.use(express.static('_gen'));
app.set('view engine', 'ejs');

app.get('/index', function (req, res) {
    res.render('index', { content: React.renderToString(<Page/>) });
});

app.get('/iso', function (req, res) {
    var reactHtml = React.renderToString(<Page/>);
    res.send(reactHtml);
});

var port = process.env.PORT || 3000
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Express listening at http://%s:%s', host, port);
});