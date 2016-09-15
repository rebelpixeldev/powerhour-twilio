const
    express = require('express'),
    path    = require('path'),
    swig    = require('swig'),
    url     = require('url');

const app = express();
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
    console.log(url.parse(req.url, true).query);

    const params = url.parse(req.url, true).query
    res.header('Content-Type', 'application/xml');
    res.render('twiml/gather', { digits : params.Digits, digitsTalk : params.Digits.toString().split('').join(' ')} );
})



app.listen(3000, () => {
    console.log('Connected on 3000');
});