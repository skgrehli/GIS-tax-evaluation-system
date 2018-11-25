var losAngeles = require('./losAngeles');

losAngeles('11975 WALNUT LN LOS ANGELES CA 90025')
    .then(res => {
        console.log("res------", res)
    })
    .catch(err => {
        console.log("error-----", err)
    })