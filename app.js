const
    _       = require('lodash'),
    express = require('express'),
    path    = require('path'),
    swig    = require('swig'),
    url     = require('url');

const app = express();
let numbers = [];
app.use(express.static('pub'));
app.engine('html', swig.renderFile);
app.set("view engine", "html");
app.set('views', path.join(__dirname, '/app/views/'));

for ( let i = 0; i <= 5; i++ ){
    app.get('/voice/twiml/' + i, (req, res) => {
        res.header('Content-Type', 'application/xml');
        res.render('twiml/twiml'+i);
    });
}

app.get('/voice/gather', (req, res) => {
    const params = url.parse(req.url, true).query;
    console.log(params);
    numbers.push(params.Caller);
    numbers = _.uniq(numbers);
    res.header('Content-Type', 'application/xml');
    res.render('twiml/gather', { params:params, digitsTalk : params.Digits.toString().split('').join(' ')} );
});

app.listen(3000, () => {
    console.log('Connected on 3000');
});