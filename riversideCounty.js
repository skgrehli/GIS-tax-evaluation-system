const axios = require('axios');

module.exports = async function getGIS(addressInput) {
    const url = 'https://gis.countyofriverside.us/Geocortex/Essentials/REST/sites/MMC_Public?f=json&deep=true';
    const response1 = await axios.get(url);
   // console.log("response---", response1);
    const connectionString = response1.data.map.mapServices[0].connectionString;
    const token = connectionString.split('=')[3]
    console.log("token", token)
    const url2 = 'https://gis.countyofriverside.us/arcgis_public/rest/services/App_MMC/mmc_service/MapServer/6/query?'
    + 'token=' + token
    + '&f=json'
    + '&where=SITUS_STREET%20Like%20%27' + addressInput + '%25%27'
    + '&returnGeometry=false'
    + '&spatialRel=esriSpatialRelIntersects'
    + '&outFields=*'
    + '&returnDistinctValues=true'
    console.log("url-------", url2)
    const response = await axios.get(url2);
    //console.log("response---", response);
    const requiredResponseFields = response && response.data
    //console.log("fields", requiredResponseFields);
    let formattedAddress = {
        Address: requiredResponseFields.features[0].attributes.SITUS_STREET,
        City: requiredResponseFields.features[0].attributes.SITUS_CITY,
        Acre: requiredResponseFields.features[0].attributes.ACRE
    }

    return formattedAddress;


};