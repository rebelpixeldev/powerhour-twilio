const
    url = require('url');

module.exports = function(app){

    app.get('/sms/send', (req, res) => {
        const params = url.parse(req.url, true).query;

        req.client.messages.create({
            body: params.body,
            to: params.to,
            from: '+16479311270'
        }, function(err, data) {
            if (err) {
                console.error('Could not send message');
                console.error(err);
            } else
                res.send('message sent to ' + params.to);

        });
    });

}