import {tools, panels} from './map/config.js'
import fetcher from './map/fetcher.js'
import {setupForm, submit} from './map/controls.js'
import {parseFormResults, parseGeoData, parseLabels} from './map/parser.js'
import render from './map/render.js'

let geoData = {}

async function init() {

	// get geo data
	const 	world = await fetcher('../../data/world-atlas-110m.json'),
			countries = await fetcher('../../data/ne_10m_admin_0_countries_simp.json'),
			countrieshq = await fetcher('../../data/custom.json'),
			tinycountries = await fetcher('../../data/ne_110m_admin_0_tiny_countries.json'),
			cities = await fetcher('../../data/ne_110m_populated_places_simple.json'),
			languagefamilies =  await fetcher('../../data/world-2.json')

	geoData = parseGeoData({world, countries, countrieshq, tinycountries, cities, languagefamilies})

	// setup tools with default values
	setupForm(tools, update, '.tools')
	setupForm(panels, update, '.panels')

	// submit form
	
	submit()

	document.body.querySelector('#projection').focus()
}

function update(toolsOptions) {

	// parse submited form data
	const options = parseFormResults(toolsOptions, tools)

	const labels = parseLabels(geoData, options)

	// render map with parsed data
	render(geoData, options, labels)
}

export default init