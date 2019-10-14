const rp = require('request-promise');

class BusService {

    constructor() {
        this.URL_SCHEDULE_BUS = process.env.SCHEDULE_BUS_URL;
    }
    
    schedules(codeStop) {
        var options = {
            url: this.URL_SCHEDULE_BUS + codeStop,
            headers: { 'User-Agent' : 'request' }
        };
        
        return new Promise(function (resolve, reject) {
            rp(options)
                .then(function (result) {
                    resolve(JSON.parse(result));
                })
                .catch(function (err) {
                    reject(err);
                });
        });
    };

}

module.exports = BusService;