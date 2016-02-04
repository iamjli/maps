
var app = app || {};

(function ($) {
    'use strict';

    app.AppView = {
        init: function() {
            this.list = $('#locs');
            this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: initLatLng
            });

            // // populate ko filtered markers
            // LOCATIONS.forEach(function(loc) {
            //     filtered_locs.push(loc);
            // })

            app.AppView.displayLocs(LOCATIONS);

            // on click, trigger filter
            // $('#button').click(function() {
            //     var search = $('#search').val();
            //     var results = app.models.filter(search);

            //     // app.AppView.displayLocs(results);
            // });
        },

        displayLocs: function(locs) {
            this.list.empty();
            if (locs.length>0) {
                locs.forEach(function(loc) {
                    app.AppView.addLocs(loc);
                    app.AppView.addMarker(loc);
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
})(jQuery);