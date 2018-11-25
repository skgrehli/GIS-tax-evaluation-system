const axios = require('axios');

module.exports = async function getGIS(addressInput) {
    console.log("server started")
    const url = 'http://maps.assessor.lacounty.gov/Geocortex/Essentials/REST/sites/PAIS/SQLAddressSearch?f=json&SANUM=' + addressInput;
    const response = await axios.get(url);
    console.log("response---", response);
     const requiredResponseFields = response && response.data && response.data.results && response.data.results.AddressResults
     console.log("fields", requiredResponseFields);

    const response2 = await axios.get('http://maps.assessor.lacounty.gov/Geocortex/Essentials/REST/sites/PAIS/SQLAINSearch?f=json&AIN=' + requiredResponseFields[0].AIN)
    const responseFields = response2 && response2.data && response2.data.results;
    let formattedAddress = {
        taxRateArea: responseFields.ParcelDetails.TRA,
        TotalValue: responseFields.ParcelDetails.LANDVAL,
        Type: responseFields.ParcelDetails.UseType_Label
    }

    return formattedAddress;
    
   
};