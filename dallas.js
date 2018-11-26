const axios = require('axios');

module.exports = async function getGIS(addressInput) {
    const url = 'https://maps.dcad.org/prdwa/rest/services/Property/ParcelQuery/MapServer/4/query?'
                + 'f=json'
                + '&where=UPPER(PARCELID)%20LIKE%20%27%25' + addressInput + '%25%27%20OR%20UPPER(SITEADDRESS)%20LIKE%20%27%25' + addressInput + '%25%27%20OR%20UPPER(OWNERNME1)%20LIKE%20%27%25' + addressInput + '%25%27%20OR%20UPPER(SITEADDRESS)%20LIKE%20%27%25' + addressInput + '%25%27'
                + '&returnGeometry=false'
                + '&spatialRel=esriSpatialRelIntersects'
                + '&outFields=*'
    console.log("url-------", url)
    const response = await axios.get(url);
    //console.log("response---", response);
    const requiredResponseFields = response && response.data
    console.log("fields", requiredResponseFields);
    let formattedAddress = {
        Address: requiredResponseFields.features[0].attributes.SITEADDRESS,
        City: requiredResponseFields.features[0].attributes.PSTLCITY,
        TotalValue: requiredResponseFields.features[0].attributes.CNTASSDVAL,
        ImprovedValue: requiredResponseFields.features[0].attributes.IMPVALUE,

    }

    return formattedAddress;


};