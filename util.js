const util = () => {

    const getFromEnvironmnet = () => {
        if(process.env.username && process.env.password){
            return {
                "endpoint" : process.env.endpoint,
                "username" : process.env.username,
                "passowrd" : process.env.password
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
