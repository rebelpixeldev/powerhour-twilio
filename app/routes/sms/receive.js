const
    url = require('url');

module.exports = function(app){

    app.get('/sms/recieve', (req, res) => {
        const params = url.parse(req.url, true).query;
        console.log('Text message recieved * * * * * * * * * * * * * * * * ');
        console.log(params);
    });

}