const
    url = require('url');

module.exports = function(app){

    app.get('/sms/receive-and-send', (req, res) => {
        const params = url.parse(req.url, true).query;
        console.log(' * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * Text message recieved');
        console.log(params);

        req.client.messages.create({
            body: req.getMessage(params.From),
            to: params.From,
            from: '+16479311270'
        }, function(err, data) {
            if (err) {
                console.error(err);
                res.send('Could not send message');
            } else {
                res.send('message sent to ' + params.From);
            }
        });

    });

}