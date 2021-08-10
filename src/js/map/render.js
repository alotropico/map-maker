import * as d3 from 'd3'
import * as d3g from 'd3-geo-projection'

import {layers} from './config.js'

Object.assign(d3, d3g)

let svg,
    inited = false,
    path,
    graticule,
    styles,

    domElements = {},
    projection

function createMap() {

    inited = true

    svg = d3.select('[data-map]')

    svg.attr('viewBox', '0 0 960 484')

    svg.attr('id', 'render')

    styles = svg.append('style')

    domElements['mask'] = svg.append('clipPath')
        .attr('id', 'mask')

    layers.forEach(layer => {        
        if(layer.id != 'mask'){
            domElements[layer.id] = svg.append('g')
            .attr('class', 'group-' + layer.id)
            .attr('clip-path', !layer?.unmasked ? 'url(#mask)' : '')
        }
    })

    domElements['labels'] = svg.append('g').attr('id', 'labels')
    
    path = d3.geoPath()
    graticule = d3.geoGraticule10()
}

function update(geoData, options, labels) {

    projection = d3[options.projection]()
        .center([0, 0])
        .rotate([360 - options.rotation, 360 - options.translation, 360 - options.tilt])
        .fitExtent([[10, 10], [960 - 20, 484 - 20]], {type: 'Sphere'})

    path.projection(projection)

    layers.forEach(layer => {
        
        let d = domElements[layer.id].selectAll('path')

        if(!(layer.id in options) || options[layer.id]) {

            let data = geoData[layer.id]

            if(data) {
                
                d.data(data).enter().append('path')

                d = domElements[layer.id].selectAll('path')

                switch(layer.id) {
                    case 'mask':
                    case 'sphere':
                    case 'sphereline':
                        d.attr('d', path({type: 'Sphere'}))
                        break

                    case 'graticule':
                        d.attr('d', path(graticule))
                        break

                    default:
                        d.attr('d', path)
                }

                if(layer?.interactive)
                    d.on('mouseover', function(e, d) {
                        console.log(d.properties)	
                    })
            }

        } else {
            d.remove()
        }
    })
    
    const d = domElements['labels'].selectAll('text').data(labels)
    
    d.join('text')
        .each(function(d) {

            const   areaMax = 10000,
                    bestArea = largestPolygon(d),
                    preCentroid = {type: 'Point', coordinates: d3.geoCentroid(bestArea)},
                    $this = d3.select(this),
                    centroid = path.centroid(preCentroid), //path.centroid(preCentroid),
                    area = path.area(bestArea),
                    areaBounded = area > areaMax ? areaMax : area,
                    geoType = d.geometry.type
                    
            if(areaBounded < 1 && geoType !== 'Point') $this.remove()
            $this.style('font-size', `${((areaBounded/areaMax) * 6 + 5).toFixed(2)}px`)

            const label = areaBounded > areaMax*0.3 ?
                getProperties(d.properties, ['BRK_NAME', 'BRK_A3', 'layer']) : 
                areaBounded > areaMax*0.1 ?
                getProperties(d.properties, ['BRK_A3', 'layer']) :
                getProperties(d.properties, ['WB_A2', 'POSTAL', 'layer']) 

            $this.text(label)

            if(!isNaN(centroid[0]) && !isNaN(centroid[1])) {
                $this.attr('x', centroid[0])
                $this.attr('y', centroid[1])
            } else {
                $this.remove()
            }
        })

    styles.html(options.styles)
}

function largestPolygon(d) {
    if(d.geometry.type == 'Point' || d.geometry.type == 'Polygon') return d.geometry

    let best = false
    let bestArea = 0
    d.geometry.coordinates.forEach(function(coords) {
        let poly = { type: 'Polygon', coordinates: coords },
            area = path.area(poly)

        if(area > bestArea) {
            bestArea = area
            best = poly
        }
    })
    return best
}

function getProperties(obj, ar) {
    const found = ar.find(a => obj?.[a])
    return found && obj[found] != -99 ? obj[found] : ''
}

function receive(geoData, options, labels) {
    if(!inited) {
        inited = true
        createMap()
    }
    update(geoData, options, labels)
}

export default receive