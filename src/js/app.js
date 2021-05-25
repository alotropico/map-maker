import {tools, panels} from './map/config.js'
import fetcher from './map/fetcher.js'
import {setupForm, submit} from './map/controls.js'
import {parseFormResults, parseGeoData} from './map/parser.js'
import render from './map/render.js'

let world

async function init() {

	// get geo data
	world = await fetcher('../../data/world-atlas-110m.json')

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

	// parse geo data
	const geo = parseGeoData(world)

	// render map with parsed data
	render(geo, options)
}

export default init