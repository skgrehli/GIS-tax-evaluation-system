const axios = require('axios');

module.exports = async function getGIS(addressInput) {
    const url = 'https://arcweb.hcad.org/server/rest/services/public/public_query/MapServer/0/query?'
                + 'f=json&'
        + 'where=UPPER(address)%20LIKE%20%27' + addressInput + '%25%27'
                + '&returnGeometry=false'
                + '&spatialRel=esriSpatialRelIntersects'
                + '&outFields=*';
    console.log("url-------", url)
    const response = await axios.get(url);
    //console.log("response---", response);
    const requiredResponseFields = response && response.data
    console.log("fields", requiredResponseFields);
    let formattedAddress = {
        Address: requiredResponseFields.features[0].attributes.address,
        City: requiredResponseFields.features[0].attributes.city,
        TotalValue: requiredResponseFields.features[0].attributes.mkt_val,
        Owner: requiredResponseFields.features[0].attributes.owner,
       
    }

    return formattedAddress;


};