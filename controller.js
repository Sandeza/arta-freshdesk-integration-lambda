const restclient = require('./restClient')
const controller = ()=> {

    return {
        getDetailsByPhoneNumber : async (fromNumber) =>{
            
            var auth = new Buffer.from(process.env.API_KEY + ':' + process.env.API_PASSWORD).toString('base64');
            
            let options = {
                hostname: process.env.API_URL,
                port: 443,
                path: "/api/v2/contacts?phone=" + fromNumber,
                method : 'GET',
                headers: {
                    'Authorization': 'Basic ' + auth,
                    'Content-Type': 'application/json'
                },
            };
            
            let data = await restclient().getData(options);
            
            if(data.length != 0) {
                if(data[0].name != undefined) {
                    return  {"customerInfo" : JSON.stringify( data[0] )};
                }
            }
            
            let options2 = {
                hostname: process.env.API_URL,
                port: 443,
                path: "/api/v2/contacts?mobile=" + fromNumber,
                method : 'GET',
                headers: {
                    'Authorization': 'Basic ' + auth,
                    'Content-Type': 'application/json'
                },
            };
            
            let data2 = await restclient().getData(options2);
            
            if(data2.length != 0) {
                if(data2[0].name != undefined) {
                    return  {"customerInfo" : JSON.stringify(data2[0])};
                }
            }
            
            return  {"customerInfo" : JSON.stringify( {"name" : "Unknown Caller"} ) };
            
        }
    }
};
module.exports = controller;