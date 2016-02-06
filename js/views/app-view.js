
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
                loc.color = ko.observable('black');
            })

            app.centered = false;

            var button = function () {
                var centerControlDiv = document.createElement('div');
                var centerControl = new CenterControl(centerControlDiv, app.map);

                centerControlDiv.index = 1;
                app.map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
            };

            var runButton = function() {
                if (app.centered == false) {
                    if ($(window).width() < 800) {
                        button();
                    }
                }
                if (app.centered) {
                    if ($(window).width() > 800) {
                        app.centered = false;
                        app.map.controls[google.maps.ControlPosition.TOP_CENTER].pop();
                    }
                }
            };

            runButton();
            $(window).resize(runButton);

        },
    };
})(jQuery);


function CenterControl(controlDiv, map) {
    'use strict';

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Search';
    controlUI.appendChild(controlText);

    app.centered = true;
    app.control = controlUI;

    var drawer = document.querySelector('#drawer');
    var main = document.querySelector('#map');
    controlUI.addEventListener('click', function(e) {
        drawer.classList.toggle('open');
        e.stopPropagation();
    });
    main.addEventListener('click', function () {
        drawer.classList.remove('open');
    })

}