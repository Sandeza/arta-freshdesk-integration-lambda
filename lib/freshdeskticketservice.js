const httpClient = require('axios');
const util = require('../util');

const freshDeskTicketService = () => {

    let fdcredentials = util.getFDCredentials();
    const client = httpClient.create({
        auth: {
            username: fdcredentials.username,
            password: fdcredentials.passowrd
        },
        headers: {
            "Content-Type": "application/json"
        }
    });
    
    getTicketsById = (ticketId) => {
        //console.log(ticketId);

        return client.get(fdcredentials.endpoint + "/api/v2/tickets/" + ticketId)
            .then(response => {
                return response.data;
                console.log(JSON.stringify(response.data));
            }).catch(reason => {
                console.log(reason);
                return null;
            })
    };


    getTicketsByContactId = (contactId) => {

        return client.get(fdcredentials.endpoint + "/api/v2/tickets?requester_id=" + contactId)
            .then(response => {
                let tickets = response.data;
                let openTickets = [];
                let otherTickets = [];
                if(tickets.length == 0){
                    console.log(response)
                    return null;
                }
                for (let ticket in tickets){
                    let tinfo = {
                        "id": tickets[ticket].id,
                        "subject": tickets[ticket].subject,
                        "status": tickets[ticket].status
                    };
                    if(tickets[ticket].status=="2") {
                        openTickets.push(tinfo)
                    }else{
                        otherTickets.push(tinfo)
                    }
                }
                return {"openTickets" : openTickets, "otherTickets" : otherTickets};

            }).catch(reason => {
                console.log(reason);
                return null;
            })
    };

    createTicket = (requesterId) => {
        let data = {
            "requester_id" : requesterId,
            "source" : 2,
            "status" : 2,
            "subject" : "from aws connect",
            "description" : "from aws connect",
            "priority":2
        };
        return client.post(fdcredentials.endpoint + "/api/v2/tickets",data).then(response => {
            if(!response.data)
                return {}
            return {
                "id": response.data.id,
                "subject": response.data.subject,
                "status": response.data.status
            }
        }).catch(reason => {
            console.log(reason);
            return null;
        })
    };

    return {
        getContactTickets : async (contactId) => {
            return  await getTicketsByContactId(contactId)
        },
        
        createTicket : async (contactId) => {
            return await createTicket(contactId)
        },
        
        getTickets : async (ticketId) => {
            return  await getTicketsById(ticketId)
        },
    }
};

module.exports = freshDeskTicketService;

