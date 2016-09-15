const
    express = require('express'),
    path    = require('path'),
    swig    = require('swig');

const app = express();

app.engine('html', swig.renderFile);
app.set("view engine", "html");
app.set('views', path.join(__dirname, '/app/views/'));

app.get('/voice/twiml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.render('twiml');
});

app.listen(3000, () => {
    console.log('Connected on 3000');
});