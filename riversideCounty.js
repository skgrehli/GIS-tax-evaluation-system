const axios = require('axios');

module.exports = async function getGIS(addressInput) {
    const url = 'https://gis.countyofriverside.us/arcgis_public/rest/services/App_MMC/mmc_service/MapServer/6/query?'
    + 'token=7HbMK4eyUZtnb2ycSEdw4tWTMDWsr46CTm_YuHZyNwzYnh-rYMrgvdV36F3vGEy5'
    + '&f=json'
    + '&where=SITUS_STREET%20Like%20%27' + addressInput + '%25%27'
    + '&returnGeometry=false'
    + '&spatialRel=esriSpatialRelIntersects'
    + '&outFields=*'
    + '&returnDistinctValues=true'
    console.log("url-------", url)
    const response = await axios.get(url);
    //console.log("response---", response);
    const requiredResponseFields = response && response.data
    console.log("fields", requiredResponseFields);
    let formattedAddress = {
        Address: requiredResponseFields.features[0].attributes.SITUS_STREET,
        City: requiredResponseFields.features[0].attributes.SITUS_CITY,
        Acre: requiredResponseFields.features[0].attributes.ACRE
    }

    return formattedAddress;


};