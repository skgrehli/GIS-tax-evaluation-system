var losAngeles = require('./losAngeles');
var cookCounty = require('./cookCounty');
var harrisCounty = require('./harrisCounty');
var dallas = require('./dallas');
var riverCounty = require('./riversideCounty')

 losAngeles('11975 WALNUT LN LOS ANGELES CA 90025')
    .then(LAres => {
        console.log("LA response------", LAres)
    })
    .catch(err => {
        console.log("error-----", err)
    })

cookCounty('1200 MILWAUKEE AVENUE')
    .then(res => {
        console.log("Cook County res------", res)
    })
    .catch(err => {
        console.log("error-----", err)
    }) 
 harrisCounty('2201 Washington Ave')
    .then(res => {
        console.log("Harris County res------", res)
    })
    .catch(err => {
        console.log("error-----", err)
    }) 
dallas('2104 Greenville Ave')
    .then(res => {
        console.log("Dallas County res------", res)
    })
    .catch(err => {
        console.log("error-----", err)
    })

riverCounty('5620 VAN BUREN BLV')
.then(res => {
        console.log("Dallas County res------", res)
    })
    .catch(err => {
        console.log("error-----", err)
    })
