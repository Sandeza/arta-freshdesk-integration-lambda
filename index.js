const controller = require('./controller')

exports.handler = async (event) => {
    
    console.log(JSON.stringify(event))
    
    let fromNumber = event.Details.ContactData.CustomerEndpoint.Address;
    
    return controller().getDetailsByPhoneNumber(encodeURIComponent(fromNumber));
};
