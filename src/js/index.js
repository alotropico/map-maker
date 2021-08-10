import 'core-js/stable'
import 'regenerator-runtime/runtime'
import '../sass/main.scss'
import init from './app'

init()

/*
	Custom map maker
	World map editor
	Map creator
	Generate map

	Custom world map
	Map chart
	Country map generator

	Color map online
	Map maker online


	https://www.worldmapgenerator.com/
	http://worldmapcreator.com/
	http://www.worldmapmaker.com/
	https://paintmaps.com/map-charts/world-map-chart

	-- 

	* Finish styles

	* Fix labels

	* Sort labels by area instead of population

	* Change text labels according to available space

	Move centroids logic to parser

	Save as SVG

	Toggle fieldsets

	Cleaner/more accurate map data

	Sea/oceans data (labels)

	Night mode

	Displace labels by voronoi


	-- 

	Load data colors

	Custom data/colors

	Legend box movable


	-- 

	Share

	URL config

	Save PNG, Config


	-- 

	Zoom on a country

	Detect, zoom on user's country

	Projections legends


	-- 

	Gallery of examples
		Official languages
		Life expectancy
		GDP
		Language families
		Physical map


	-- 

	REACT + SCSS + PUG


	-- 

	Transitions


	-- 

	Public gallery

	Directory


	-- 

	Portal


	-- 

	Pangea


	-- 

	Add timelines
	
	https://github.com/nvkelso/natural-earth-vector/tree/master/geojson
	https://github.com/mattdzugan/World-Population-Cartogram

	EDIT GEOJSON + TOPOJSON + SHAPEFILE
	https://mapshaper.org/

	SAVE PNG
	https://www.npmjs.com/package/save-svg-as-png

	https://hub.arcgis.com/datasets/esri::world-countries-generalized/explore?location=-27.208559%2C-43.588005%2C5.28

	ICONS
	https://github.com/djaiss/mapsicon

	COUNTRY CODES
	https://gist.github.com/djaiss/2938259

	GINI
	https://opendata.stackexchange.com/questions/14180/gini-indices-of-wealth-for-each-country

	CENTROIDS
	https://observablehq.com/@neocartocnrs/some-experiments-with-d3-geo
*/