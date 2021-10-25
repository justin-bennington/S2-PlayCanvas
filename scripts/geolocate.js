// 2021 Somewhere Systems (S2)
// Forked from Will Eastscott's 2015 tutorial for geolocation API access: https://playcanvas.com/project/363668/overview/using-the-geolocation-api

var Geolocate = pc.createScript('geolocate');

Geolocate.attributes.add('refreshRate', {type: 'number', default: 1000}); // Time in milliseconds that the script checks for geolocation
Geolocate.attributes.add('consoleSigFigs', {type: 'number', default: 4}); // decimal places of the console logged lat/long pairs
Geolocate.attributes.add('exposeGeoGlobally', {type: 'boolean', default: true}); // Determines whether or not the lat/long pairs are exposed globally for use in other scripts
Geolocate.attributes.add('longitude', {type: 'number'}); // Global longitude value, only updates if exposeGeoGlobally is checked
Geolocate.attributes.add('latitude', {type: 'number'}); // Global latitude value, only updates if exposeGeoGlobally is checked
// initialize code called once per entity
Geolocate.prototype.initialize = function() {
    var self = this;
    if (navigator.geolocation) {
        setInterval(function () {
            navigator.geolocation.getCurrentPosition(function (position) {
                var long = position.coords.longitude;
                var lat = position.coords.latitude;
                
                if (this.exposeGeoGlobally){
                     Geolocate.longitude = long;
                     Geolocate.latitude = lat;
                }
                console.log("Longitude: " + long.toFixed(self.consoleSigFigs) + " Latitude: " + lat.toFixed(self.consoleSigFigs));
            });
        }, this.refreshRate);
    }
};
