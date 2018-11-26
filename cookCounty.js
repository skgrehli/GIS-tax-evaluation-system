const axios = require('axios');

module.exports = async function getGIS(addressInput) {
    const url = 'https://maps.cookcountyil.gov/cookviewer/proxy/tempProxy.ashx?https://gis1.cookcountyil.gov/arcgis/rest/services/AddressLocator/addressPtMuniNoZip/GeocodeServer/findAddressCandidates?Street=' + addressInput + '&f=json';
    const response = await axios.get(url);
    console.log("response---", response);
    const requiredResponseFields = response && response.data 
    console.log("fields", requiredResponseFields);
    let spatialReference = requiredResponseFields.spatialReference.latestWkid;
    let location = requiredResponseFields.candidates[0].location;

    let url2 = 'https://maps.cookcountyil.gov/cookviewer/proxy/tempProxy.ashx?https://gis1.cookcountyil.gov/arcgis/rest/services/cookVwrDynmc/MapServer/44/query?f=json&where&returnGeometry=true&spatialRel=esriSpatialRelIntersects'
    + '&geometry=%7B%22points%22%3A%5B%5B' + location.x + '%2C' + location.y + '%5D%5D%2C%22spatialReference%22%3A%7B%22wkid%22%3A' + spatialReference + '%7D%7D'
        + '&geometryType=esriGeometryMultipoint'
        + '&inSR=' + spatialReference
        + '&outFields=ParcelType%2CAddress%2CCity%2CTown%2CNBHD%2CTotalValue%2CBldgValue%2CBLDGClass%2CBldgSqft%2CLandvalue%2CLandSqft%2CBldgConst%2CBldgAge%2CMlt_IND%2CPer_Ass%2CPIN10%2CPIN14'
        + '&outSR=' + spatialReference;

        console.log("url--------", url2)

    const response2 = await axios.get(url2)
    const responseFields = response2 && response2.data;
    console.log("response-----", responseFields);
    let formattedAddress = {
        Address: responseFields.features[0].attributes.Address,
        City: responseFields.features[0].attributes.City,
        TotalValue: responseFields.features[0].attributes.TotalValue,
        BuildingValue: responseFields.features[0].attributes.BldgValue,
        LandSquareFootage: responseFields.features[0].attributes.LandSqft
    }

    return formattedAddress;


};