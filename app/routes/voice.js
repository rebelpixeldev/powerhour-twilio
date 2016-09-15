const
    url = require('url');

module.exports = function (app) {
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
        console.log(' * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * Call received');
        console.log(params);
        const message = req.getMessage(params.Caller);
        res.header('Content-Type', 'application/xml');
        res.render('twiml/gather', { params:params, message:message, digitsTalk : params.Digits.toString().split('').join(' ')} );
    });

}