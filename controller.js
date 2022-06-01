const freshdeskservice = require("./lib/freshdeskcontactservice");
const fdTicketService = require("./lib/freshdeskticketservice");
const controller = ()=> {

    return {
        FDContactAction : async (fromNumber) =>{
            let contactinfo = await freshdeskservice().contactInfo(fromNumber);
            if(contactinfo.id !== 0){
                let tickets = await fdTicketService().getContactTickets(contactinfo.id);
                console.log(tickets);
                if(tickets){
                    contactinfo.tickets = tickets;

                } 

            }
            return contactinfo;
        }
    }
};
module.exports = controller;
