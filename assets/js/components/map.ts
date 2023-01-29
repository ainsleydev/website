/**
 * map.ts
 *
 * @author Ainsley Clark
 * @author URL:   https://ainsley.dev
 * @author Email: hello@ainsley.dev
 * @see https://developers.google.com/maps/documentation/javascript/overview
 */

import {Loader} from "@googlemaps/js-api-loader"

/**
 * Load the Google map with the API key.
 */
const loader = new Loader({
	apiKey: "AIzaSyChJnTW-pCWmAQ3Jzzh3-xfve4JOsuMqMo",
	version: "weekly",
});

/**
 * Once the loader has finished, initialise map variable and
 * set the zoom, lat and long and the custom marker.
 */
const load = () => {
	loader.load().then(() => {
		let position = {
			lat: 51.5155705754434,
			lng: -0.12367415060938884,
		} as google.maps.LatLngLiteral;

		let center = position;
		if (window.innerWidth >= 768 && window.innerWidth < 1024) {
			center = {
				lat: 51.517570791793474,
				lng: -0.12637781729639475,
			} as google.maps.LatLngLiteral;
		}

		const map = new google.maps.Map(document.querySelector(".map") as HTMLElement, {
			backgroundColor: '#ffffff',
			center: center,
			zoom: 16,
			styles: style,
			streetViewControl: false,
			mapTypeControl: false,
			draggable: true,
		});

		map.addListener("click", e => {
			console.log(e.latLng.toJSON());
		})

		new google.maps.Marker({
			position: position,
			map: map,
			icon: "/images/icons/marker.svg"
		});
	});
}

export default load;

/**
 * Styling for the map as a JSON array.
 * @see https://mapstyle.withgoogle.com/
 */
const style = [
	{
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#f5f5f5"
			}
		]
	},
	{
		"elementType": "labels.icon",
		"stylers": [
			{
				"color": "#f5f5f5",
			}
		]
	},
	{
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#616161"
			}
		]
	},
	{
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": "#f5f5f5"
			}
		]
	},
	{
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#bdbdbd"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#eeeeee"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#757575"
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#e5e5e5"
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9e9e9e"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#ffffff"
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#757575"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#dadada"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#616161"
			}
		]
	},
	{
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9e9e9e"
			}
		]
	},
	{
		"featureType": "transit.line",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#e5e5e5"
			}
		]
	},
	{
		"featureType": "transit.station",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#eeeeee"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#c9c9c9"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9e9e9e"
			}
		]
	}
]

