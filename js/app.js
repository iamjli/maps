
$(function() {

    var NUM_LOCS = 5;
    var initLatLng = {lat: 42.3601, lng: -71.0589};
    var locations = [
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

    var models = {

        init: function() {
            // create map
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: initLatLng
            });

            this.list = $('#locs');

            // list locations to page and display markers
            locations.forEach(function(loc) {
                models.addLocs(loc);
                models.addMarker(loc);
            })
        },

        // adds marker to map
        addMarker: function(loc) {
            var marker = new google.maps.Marker({
                position: loc.latlng,
                map: this.map,
                title: loc.name
            });
        },

        // adds location to list
        addLocs: function(loc) {
            this.list.append('<li>'+loc.name+'</li>')
        }

    };


    var view = {
        init: function() {
        }

    };

    models.init();

});