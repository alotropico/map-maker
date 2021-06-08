import * as topojson from 'topojson'

function parseFormResults(form, config) {
    const f = form
    f.styles = getStyles(form, config)
    return f
}

function getStyles(form, config) {
    
    return getCssProperties(config)
        .filter(c => c.id in form)
        .reduce((a, c) => a + c.identifiers.reduce((b, d) => b + `${d}{${c.css}: ${form[c.id]};}`, ''), '')
}

function getCssProperties(config) {
    return config.reduce((a, c) => [...a, ...c.fields.filter(f => f?.css)], [])
}

// Gets geoJson or topoJson data and returns geoJson
function parseGeoData(geoData) {
    const g = {}

    // console.log(geoData)

    g.cities = parseGeoDataSet(geoData.cities, geoData.cities.objects.ne_110m_populated_places_simple)
    g.languagefamilies = parseGeoDataSet(geoData.languagefamilies, geoData.languagefamilies.objects['world-2'])
    g.tinycountries = parseGeoDataSet('', geoData.tinycountries)
    g.countries = parseGeoDataSet(geoData.countries, geoData.countries.objects.ne_10m_admin_0_countries) // parseGeoDataSet(geoData.world, geoData.world.objects.countries)
    g.countrieshq = parseGeoDataSet('', geoData.countrieshq)
    g.land = g.sphere = g.mask = g.graticule = parseGeoDataSet(geoData.world, geoData.world.objects.land)

    return g
}

function parseGeoDataSet(topology, set) {
	if('features' in set) return set.features
    return topojson.feature(topology, set).features
}

export {parseFormResults, parseGeoData}