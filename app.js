const config = require('./config');

const
    _       = require('lodash'),
    client  = require('twilio')(config.accountSid, config.authToken)
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


app.use(function(req, res, next){
    req.getMessage = function(){
        const message = numbers.indexOf(num) > -1 ?
            'Don\'t worry you will still receive cat facts' :
            'Thanks for signing up with cat facts! You will get a cat fact every 2 minutes for the rest of your life. Enjoy!';
        numbers.push(num);
        return message;
    };
    req.client = client;

    next();
});

app.get('/', (req, res) => {
    res.render('index');
});


require('./app/routes/voice')(app);
require('./app/routes/sms')(app);

app.get('/sms/contest', (req, res) => {
    numbers = _.uniq(numbers);
    const winner = numbers[Math.floor(Math.random() * numbers.length)];

    client.messages.create({
        body: 'Congratulations! You Win!!',
        to: winner,
        from: '+16479311270',
        mediaUrl : 'http://45.55.201.172:3000/assets/images/winner-photo.jpg'
    }, function(err, data) {
        if (err) {
            console.error(err);
            res.send('Could not send message');
        } else {
            res.send('message sent to the winner');
        }
    });

});


app.listen(3000, () => {
    console.log('Connected on 3000');
});