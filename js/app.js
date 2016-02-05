
var app = app || {};

var launch = function () {
	'use strict';

	// kick things off by creating the `App`
	try {
		app.AppView.init();
	} catch(err) {
		alert(err);
	}

	var AppViewModel = function () {
		var self = this;

		self.locations = ko.observableArray(app.LOCATIONS);
		self.phrase = ko.observable();
		self.numResults = ko.observable(self.locations().length);

		self.init = function () {
			self.locations().forEach(function (loc) {
				// populate wikipedia articles
				loc.wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + loc.name +
					'&format=json&callback=wikiCallback';

				// request Wikipedia descriptions
				$.ajax({
					url: loc.wikiURL,
					dataType: "jsonp",
					success: function (res) {
						if (res[2]) {
							loc.article = res[2][0];
							loc.content = '<div id="iw-container">' +
								'<div class="iw-title">' +
								loc.name +
								'</div>' +
								'<div class="iw-content">' +
								  loc.article +
								'</div>' +
								'<div class="iw-bottom-gradient"></div>' +
							  '</div>';
						} else {
							alert("Cannot load Wikipedia data.")
						}
					},
				}).fail(function () {
					alert("Unable to access Wikipedia.")
				})

				// set up info bubbles
				loc.marker().addListener('click', function () {
					app.infoWindow.setContent(loc.content);
					app.infoWindow.open(app.map, loc.marker());
					self.toggleBounce(loc);
				})
			})
		};
		self.init();

		// set click event
		self.click = function (data, event) {
			// get click item
			var elem = event.target.outerHTML;
			var title = elem.split('>')[1].split('<')[0];

			// get location
			self.locations().forEach(function (loc) {
				if (loc.name == title) {
					app.infoWindow.setContent(loc.content);
					app.infoWindow.open(app.map, loc.marker());
					self.toggleBounce(loc);
				}
			})
		}

		// animate markers
		self.toggleBounce = function (loc) {
			var marker = loc.marker();
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
				app.infoWindow.close();
				loc.color('black');
			} else {
				self.locations().forEach(function (m) {
					m.marker().setAnimation(null);
					m.color('black');
				})
				marker.setAnimation(google.maps.Animation.BOUNCE);
				loc.color('green');
			}
		}

		self.render = function () {
			self.locations().forEach(function(loc) {
				loc.marker().setMap(null);
				if (loc.marker().getMap()) {
					console.log(loc.name + loc.marker().getMap().toString())
				}
			})
			self.filter(self.phrase());
		}

		// update marker attribute of self.location
		self.filter = function (phrase) {
			var count = 0;
			self.locations().forEach(function (loc) {
				if ((!phrase) || loc.name.toUpperCase().search(phrase.toUpperCase()) != -1) {
					loc.marker(new google.maps.Marker({
						position: loc.latlng,
						map: app.map,
						title: loc.name
					}));
					loc.marked(true);
					count ++;
				} else {
					loc.marked(false);
				}
			})
			self.init();
			self.numResults(count);
		}

		self.phrase.subscribe(self.render);
	}

	ko.applyBindings(new AppViewModel());
};

function errorHandling() {
	alert("Error while loading Google Maps");
}

