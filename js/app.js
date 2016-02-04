
$(function() {

    var NUM_LOCS = 5;
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
    var filtered_locs = ko.observableArray();

    var models = {

        init: function() {

        },

        filter: function(phrase) {
            out = [];
            for (var i=0, L=LOCATIONS.length; i<L; i++) {
                if (LOCATIONS[i].name == phrase) {
                    out.push(LOCATIONS[i]);
                }
            }
            return out;
        }

    };


    var view = {
        init: function() {
            // create map
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: initLatLng
            });
            this.list = $('#locs');

            // // populate ko filtered markers
            // LOCATIONS.forEach(function(loc) {
            //     filtered_locs.push(loc);
            // })

            view.displayLocs(LOCATIONS);

            // on click, trigger filter
            $('#button').click(function() {
                var search = $('#search').val();
                var results = models.filter(search);

                view.displayLocs(results);
            });
        },

        displayLocs: function(locs) {
            this.list.empty();
            if (locs.length>0) {
                locs.forEach(function(loc) {
                    view.addLocs(loc);
                    view.addMarker(loc);
                })
            } else {
                this.list.append('<li>'+'No results found'+'</li>')
            }
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
            this.list.append('<li>'+loc.name+'</li>');
        }
    };

    models.init();
    view.init();

});