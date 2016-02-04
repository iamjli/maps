
var app = app || {};

var initLatLng = {lat: 42.3601, lng: -71.0589};
// var LOCATIONS = [
//     {
//         "name": "Logan",
//         "latlng": {lat: 42.3656132, lng: -71.0117489}
//     },
//     {
//         "name": "Fenway",
//         "latlng": {lat: 42.3466764, lng: -71.0994065}
//     },
//     {
//         "name": "Harvard",
//         "latlng": {lat: 42.3770029, lng: -71.1188488}
//     }
// ];

// (function() {
// 	'use strict';

// 	var myViewModel = {
// 		filteredLocs: ko.observableArray(),
// 		x: 'HALP'
// 	};

// 	app.models = {
// 		init: function() {
// 			for (var i=0, L=LOCATIONS.length; i<L; i++) {
// 				myViewModel.filteredLocs.push(LOCATIONS[i]);
// 			}
// 		},

//         filter: function(phrase) {
//             myViewModel.filteredLocs([]);
//             for (var i=0, L=LOCATIONS.length; i<L; i++) {
//                 if (LOCATIONS[i].name == phrase) {
//                     myViewModel.filteredLocs.push(LOCATIONS[i]);
//                 }
//             }
//             console.log(myViewModel.filteredLocs());
//         }
// 	}

// 	ko.applyBindings(myViewModel);
// })();


function AppViewModel() {
    var self = this;

    self.locations = ko.observableArray([
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
	]);

	self.filter = function() {
		console.log("WE DID IT")
	}



    self.addPerson = function() {
        self.people.push({ name: "New at " + new Date() });
    };

    self.removePerson = function() {
        self.people.remove(this);
    }
}

ko.applyBindings(new AppViewModel());
