
var app = app || {};

var initLatLng = {lat: 42.3601, lng: -71.0589};
var LOCATIONS = [
    {
        "name": "Logan",
        "latlng": {lat: 42.3656132, lng: -71.0117489}
    },
    {
        "name": "Fenway",
        "latlng": {lat: 42.3466764, lng: -71.0994065}
    },
    {
        "name": "Harvard",
        "latlng": {lat: 42.3770029, lng: -71.1188488}
    }
];

(function() {
	'use strict';


	ko.applyBindings(LOCATIONS);
})();