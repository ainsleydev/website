/**
 * app.js
 * All custom JS for application stored here.
 *
 * @author Ainsley Clark
 * @author URL:   https://www.ainsleyclark.com
 * @author Email: info@ainsleyclark.com
 */

// import scripts from "./scripts/polyfills";
import LazyLoad from 'vanilla-lazyload';
import {Cursor} from "./animations/cursor";
import {Skew} from "./animations/skew";
import {FitText} from "./components/fit-text";
import {Collapse, CollapseOptions} from "./components/accordion";

/**
 * Variables
 *
 */
const html = document.querySelector('html');

/*
 * Remove No JS Body Class
 *
 */
html.classList.remove('no-js');
html.classList.add('js');

/**
 * Initialise components & types.
 */
document.addEventListener("DOMContentLoaded", () => {
	new Cursor();
	new Skew();
	new FitText();
	new Collapse({
		accordion: true,
		container: '.accordion',
		item: '.accordion-item',
		inner: '.accordion-content',
		activeClass: 'accordion-item-active',
	} as CollapseOptions);
});

/**
 * Vanilla Lazyload
 *
 */
let lazyLoadInstance = new LazyLoad({
	elements_selector: '.lazy'
	// ... more custom settings?
});

import {Loader} from "@googlemaps/js-api-loader"

const loader = new Loader({
	apiKey: "AIzaSyChJnTW-pCWmAQ3Jzzh3-xfve4JOsuMqMo",
	version: "weekly",
});


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

loader.load().then(() => {
	const position = {
		lat: 51.5155705754434,
		lng: -0.12367415060938884,
	} as google.maps.LatLngLiteral;

	const map = new google.maps.Map(document.querySelector(".map") as HTMLElement, {
		backgroundColor: '#ffffff',
		center: position,
		zoom: 16,
		styles: style,
		streetViewControl: false,
		mapTypeControl: false,
	});

	new google.maps.Marker({
		position: position,
		map: map,
		icon: "/images/icons/marker.svg"
	});
});

