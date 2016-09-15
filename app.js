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


/** * * * * * * * * * * * * * * *
 * Voice
 */
    /** * * * * * * * * * * * * ** *
     *  DEMO TWIML
     */
    for ( let i = 0; i <= 5; i++ ){
        app.get('/voice/twiml/' + i, (req, res) => {
            res.header('Content-Type', 'application/xml');
            res.render('twiml/twiml'+i);
        });
    }
    /** * * * * * * * * * * * * ** *
     *  CALLBACK FOR GATHER TWIML
     */
    app.get('/voice/gather', (req, res) => {
        const params = url.parse(req.url, true).query;
        console.log(params);
        numbers.push(params.Caller);
        numbers = _.uniq(numbers);
        res.header('Content-Type', 'application/xml');
        res.render('twiml/gather', { params:params, digitsTalk : params.Digits.toString().split('').join(' ')} );
    });

/** * * * * * * * * * * * * * * *
 * SMS
 */

    /** * * * * * * * * * * * * ** *
     *  SEND
     */
    app.get('/sms/send', (req, res) => {
        const params = url.parse(req.url, true).query;
        client.messages.create({
            body: params.body,
            to: params.to,
            from: '+16479311270'
        }, function(err, data) {
            if (err) {
                console.error('Could not send message');
                console.error(err);
            } else {
                console.log('message sent to ' + params.From);
            }
        });
    });

    /** * * * * * * * * * * * * ** *
     *  SEND
     */
    app.get('/sms/recieve', (req, res) => {
        const params = url.parse(req.url, true).query;
        console.log('Text message recieved * * * * * * * * * * * * * * * * ');
        console.log(params);
    });

    /** * * * * * * * * * * * * ** *
     *  RECEIVE AND SEND
     */
    app.get('/sms/contest-recieve', (req, res) => {
        const params = url.parse(req.url, true).query;
        console.log('Text message recieved * * * * * * * * * * * * * * * * ');
        console.log(params);
        numbers.push(params.From);
        numbers = _.uniq(numbers);

        if ( params.Body.toLowerCase().indexOf('enter me!')){
            client.messages.create({
                body: 'Thanks for signing up with cat facts! You will get a cat fact every 2 minnutes for the rest of your life. Enjoy!',
                to: params.From,
                from: '+16479311270'
            }, function(err, data) {
                if (err) {
                    console.error('Could not send message');
                    console.error(err);
                } else {
                    console.log('message sent to ' + params.From);
                }
            });
        }

    });

    app.get('/sms/contest', (req, res) => {
        const winner = numbers[Math.floor(Math.random() * numbers.length)];

        client.messages.create({
            body: 'Congratulations! You Winn!!',
            to: winner,
            from: '+16479311270',
            mediaUrl : 'http://45.55.201.172:3000/assets/images/winner-photo.jpg'
        }, function(err, data) {
            if (err) {
                console.error('Could not send message');
                console.error(err);
            } else {
                console.log('message sent to ' + winner);
            }
        });

    });


app.listen(3000, () => {
    console.log('Connected on 3000');
});