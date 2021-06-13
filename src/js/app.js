import {tools, panels} from './map/config.js'
import fetcher from './map/fetcher.js'
import {setupForm, submit} from './map/controls.js'
import {parseFormResults, parseGeoData, parseLabels} from './map/parser.js'
import render from './map/render.js'

let geoData = {}

async function init() {

	const coso = await fetcher('../../data/ignore/new/ne_10m_admin_0_label_points.geojson')

	const collect = {}

	coso.features = coso.features.filter((m, i) => {
		

		const id = m.properties.sr_subunit

		if(!(id in collect)) {
			collect[id] = true
			return true
		}
		return false
	})
	.sort((a, b) => {
		if(a.properties.sr_adm0_a3 > b.properties.sr_adm0_a3) return 1
		if(a.properties.sr_adm0_a3 < b.properties.sr_adm0_a3) return -1
		return 0
	})
	.map(d => {
		//console.log(d.properties.sr_adm0_a3, d.properties.sr_subunit, d)
		//console.log(d.properties.sr_subunit, d.properties.sr_adm0_a3)
		const cosi = d
		cosi.properties = {
			id: d.properties.sr_adm0_a3,
			label: d.properties.sr_subunit,
		}
		return cosi
	})

	//console.log(coso)

	// get geo data
	const 	world = await fetcher('../../data/world-atlas-110m.json'),
			countries = await fetcher('../../data/ne_10m_admin_0_countries_simp.json'),
			countrieshq = await fetcher('../../data/custom.json'),
			tinycountries = await fetcher('../../data/ne_110m_admin_0_tiny_countries.json'),
			cities = await fetcher('../../data/ne_110m_populated_places_simple.json'),
			languagefamilies =  await fetcher('../../data/world-2.json')

	geoData = parseGeoData({world, countries, countrieshq, tinycountries, cities, languagefamilies, coso})

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

	//console.log(geoData)

	const labels = parseLabels(geoData, options)

	// render map with parsed data
	render(geoData, options, labels)
}

export default init