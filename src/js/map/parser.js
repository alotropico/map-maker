import * as d3 from 'd3'
import * as topojson from 'topojson'

import {layers, baseStyle} from './config.js'

function parseFormResults(form, tools) {
    const f = form
    f.styles = baseStyle + getStyles(form, tools)
    return f
}

function getStyles(form, config) {

    const values = getCssProperties(config).filter(c => c.id in form) // Exclude css attributes not in the form
    
    return layers
        .filter(c => form[c.id]) // Excluded layers
        .map(layer => {

        const properties = []

        for(const property in layer.stylesDefault) {
            properties.push( `${property.replace(/_/g, '-')}: ${layer.stylesDefault[property]};`)
        }

        for(const property in layer.styles) {

            const targetCss = layer.styles[property]
            const value = values.find(v => v.css == targetCss)

            if(value || value === 0) {
                properties.push( `${property.replace(/_/g, '-')}: ${form[value.id]};`)
            }
        }

        if(properties.length) {
            return `.group-${layer.id}{${properties.join(' ')}}`
        }
        
    })
    .filter(l => l)
    .join('\n')
}

function getCssProperties(config) {
    // Get all objects with a css property in the config
    // in a one dimensional array
    return config.reduce((a, c) => [...a, ...c.fields.filter(f => f?.css)], [])
}

// Gets geoJson or topoJson data and returns geoJson
function parseGeoData(geoRaw) {
    const land = parseGeoDataSet(geoRaw.world, geoRaw.world.objects.land),
            countries = parseGeoDataSet(geoRaw.countries, geoRaw.countries.objects.ne_10m_admin_0_countries)
    return {
        cities: parseGeoDataSet(geoRaw.cities, geoRaw.cities.objects.ne_110m_populated_places_simple),
        languagefamilies: parseGeoDataSet(geoRaw.languagefamilies, geoRaw.languagefamilies.objects['world-2']),
        tinycountries: parseGeoDataSet('', geoRaw.tinycountries),
        countries,
        countrieshq: parseGeoDataSet('', geoRaw.countrieshq),
        labels: getBiggestShape(countries),
        land,
        sphere: land,
        mask: land,
        graticule: land,
        sphereline: land,
    }
}

function parseGeoDataSet(topology, set) {
	if('features' in set) return set.features
    return topojson.feature(topology, set).features
}

function parseLabels(geoData, options) {
    if(!options.labels) return []
    return  layers.filter(layer => layer?.uselabels && options?.[layer.id]) // Remove hidden/non-labelable layers
            .reduce((a, layer) => [...a, ...geoData[layer.id]], [])         // Combine layers
            .filter(e => e?.geometry?.coordinates)                          // Remove shapes without coordinates
}

function getBiggestShape(data) {
    //console.log(data)
    return data
}

function getCentroid(e) {

    if(e.type == 'Polygon') return [] // e.coordinates

    const m = e.coordinates.sort((a, b) => a[0].length > b[0].length ? -1 : a[0].length < b[0].length ? 1 : 0) // Sort shapes and get the one with most points
                .map(o => {

                    if(!Array.isArray(o) || !Array.isArray(o[0])) return o

                    const ret = o.sort((a, b) => a[0].length > b[0].length ? -1 : a[0].length < b[0].length ? 1 : 0)

                    if(ret?.[0]?.[0]) return [ret[0]]

                    return o
                })
    if(m?.[0]?.[0]) {
        
            return [[m[0][0]]]
    }

    console.log(e)
    
    if(m?.[0]) return [m[0]]

    return m
}

export {parseFormResults, parseGeoData, parseLabels}