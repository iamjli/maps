
var app = app || {};

(function ($) {
    'use strict';

    app.AppView = {
        init: function() {
            // load map
            app.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: app.LATLNG
            });

            app.infoWindow = new google.maps.InfoWindow({
                content: "stuff"
            })

            // load markers
            app.LOCATIONS.forEach(function (loc) {
                loc.marker = ko.observable(new google.maps.Marker({
                    position: loc.latlng,
                    map: app.map,
                    animation: google.maps.Animation.DROP,
                    title: loc.name
                }));
                loc.marked(true);
                loc.wiki = "Information about";
            })


        },
    };
})(jQuery);