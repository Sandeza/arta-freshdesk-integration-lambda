const fdcontroller = require("./controller");

exports.handler =  async function(event) {
    console.log("------------------------------------------------");
    console.log(event);
    let customerInfo = await fdcontroller().FDContactAction(encodeURIComponent(event['Details']['Parameters']['fromNumber']));
    console.log(customerInfo);
    console.log("------------------------------------------------");
    return ({"customerInfo" : JSON.stringify(customerInfo)})
};
