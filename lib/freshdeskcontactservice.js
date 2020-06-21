const httpClient = require('axios');
const util = require('../util');

const freshDeskContactService = () => {

    let fdcredentials = util.getFDCredentials();
    let contactDetail = {};
    const client = httpClient.create({
        auth: {
            username: fdcredentials.username,
            password: fdcredentials.passowrd
        },
        headers: {
            "Content-Type": "application/json"
        }
    });


    getContactInfoByPhoneNumber = (phoneNumber) => {

        console.log("getContactInfoByPhoneNumber");
        return client.get(fdcredentials.endpoint + "/api/v2/contacts?phone=" + phoneNumber)
            .then(response => {
                console.log(JSON.stringify(response.data));
                if(response.data.length>0){
                    return {
                        "name" : response.data[0].name,
                        "id" : response.data[0].id,
                        "avatar" : response.data[0].avatar || ""
                    }
                }else{
                    console.log("No phoneNumber found")
                    return null;
                }
            }).catch(reason => {
                console.log(reason);
                return null;
            })
    };

    getContactInfoByMobileNumber = (mobileNumber) => {
        console.log("getContactInfoByMobileNumber");
        let fdcredentials = util.getFDCredentials();

        return client.get(fdcredentials.endpoint + "/api/v2/contacts?mobile=" + mobileNumber)
            .then(response => {
                console.log(JSON.stringify(response.data));
                if(response.data.length>0) {
                    return {
                        "name": response.data[0].name,
                        "id": response.data[0].id,
                        "avatar": response.data[0].avatar || ""
                    }
                }else{
                    console.log("No mobileNumber found")
                    return null;
                }
            }).catch(reason => {
                console.log(reason);
                return null;
        })
};



    return {
        contactInfo : async (fromNumber) => {
            contactDetail  = await getContactInfoByMobileNumber(fromNumber) || await getContactInfoByPhoneNumber(fromNumber);
            if(!contactDetail){
                return {
                    "id" : 0,
                    "name" : "Unknown Caller",
                    "callFromNumber": fromNumber
                }
            }
            contactDetail.callFromNumber = fromNumber;
            console.log("return data --> " + JSON.stringify(contactDetail));
            return contactDetail;
        }
    }
};

module.exports = freshDeskContactService;

