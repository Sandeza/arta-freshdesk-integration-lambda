const fdcontroller = require("./controller");

exports.handler =  async function(event) {
    console.log("------------------------------------------------");
    console.log(event);
    let fromNumber = event.Details.ContactData.CustomerEndpoint.Address;
    let customerInfo = await fdcontroller().FDContactAction(encodeURIComponent(fromNumber));
    console.log(customerInfo);
    console.log("------------------------------------------------");
    return ({"customerInfo" : JSON.stringify(customerInfo)})
};
