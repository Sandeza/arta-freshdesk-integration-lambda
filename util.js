const util = () => {

    const getFromEnvironmnet = () => {
        if(process.env.API_KEY && process.env.API_PASSWORD){
            return {
                "endpoint" : process.env.API_URL,
                "username" : process.env.API_KEY,
                "passowrd" : process.env.API_PASSWORD
            }
        }else{
            return null;
        }
    };

    return {
        getFDCredentials : () => {
            return getFromEnvironmnet() ;
        }
    }
};

module.exports = util();
