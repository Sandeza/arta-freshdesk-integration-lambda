const https = require('https');
const restClient = ()=> {

    return {
        getData : async (options) =>{
            
            return new Promise((resolve, reject) => {
            
                var req = https.request(options, function(res) {
                
                  res.on('data', function(d) {
                    var data = JSON.parse(Buffer.from(d).toString("utf8"));
                    console.log(data);
                    resolve(data);
                  });
                });
                req.end()
                
                req.on('error', function(e) {
                  console.error(e);
                  resolve("ERROR")
                });
            });
        }
    }
};
module.exports = restClient;
