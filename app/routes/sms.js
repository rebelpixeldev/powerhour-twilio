module.exports = function(app){
    require('./sms/send')(app);
    require('./sms/receive')(app);
    require('./sms/receive-and-send')(app);
}