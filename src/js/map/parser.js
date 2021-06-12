import * as d3 from 'd3'
import * as topojson from 'topojson'

import {layers} from './config.js'

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
function parseGeoData(geoRaw) {
    const land = parseGeoDataSet(geoRaw.world, geoRaw.world.objects.land)
    return {
        cities: parseGeoDataSet(geoRaw.cities, geoRaw.cities.objects.ne_110m_populated_places_simple),
        languagefamilies: parseGeoDataSet(geoRaw.languagefamilies, geoRaw.languagefamilies.objects['world-2']),
        tinycountries: parseGeoDataSet('', geoRaw.tinycountries),
        countries: parseGeoDataSet(geoRaw.countries, geoRaw.countries.objects.ne_10m_admin_0_countries), // parseGeoDataSet(geoRaw.world, geoRaw.world.objects.countries)
        countrieshq: parseGeoDataSet('', geoRaw.countrieshq),
        labels:  parseGeoDataSet('', geoRaw.countrieshq),
        land,
        sphere: land,
        mask: land,
        graticule: land
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
            /* .map(e => {
                const f = e
                f.geometry.coordinates = getCentroid(e.geometry)

                if(e.properties.ADM0_A3_IS == 'FRA') {
                    console.log(f)
                    //console.log(getCentroid(e.geometry.coordinates))
                }
                
                return f
            }) */
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


    if(mainShape.length === 1) return mainShape[0]

    /* const box = mainShape[0][0].reduce((c, d) => {
        //console.log(c, d)
                if(!d?.[0] || !d?.[1] || isNaN(d[0]) || isNaN(d[1])) return c
                return [
                            [
                                d[0] < c[0][0] ? d[0] : c[0][0],
                                d[0] > c[0][1] ? d[0] : c[0][1]
                            ],
                            [
                                d[1] < c[1][0] ? d[1] : c[1][0],
                                d[1] > c[1][1] ? d[1] : c[1][1]
                            ]
                        ]
            }, [
                [mainShape[0][0], mainShape[0][0]],
                [mainShape[0][1], mainShape[0][1]]
            ]) */

    return mainShape //[box[0][0] + (box[0][1] - box[0][0]) / 2, box[1][0] + (box[1][1] - box[1][0]) / 2]
}

export {parseFormResults, parseGeoData, parseLabels}