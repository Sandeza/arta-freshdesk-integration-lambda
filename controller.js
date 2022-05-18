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
//                     if(tickets.openTickets.length === 0){
//                         let newTicket = await fdTicketService().createTicket(contactinfo.id);
//                         contactinfo.tickets.openTickets.push(newTicket);
//                     } 
                } 
//                     else {
//                     let newTicket = await fdTicketService().createTicket(contactinfo.id);
//                     contactinfo.tickets.openTickets.push(newTicket);
//                 }
            }
            return contactinfo;
        }
    }
};
module.exports = controller;
