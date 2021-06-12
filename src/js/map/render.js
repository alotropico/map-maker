import * as d3 from 'd3'
import * as d3g from 'd3-geo-projection'

import {layers} from './config.js'

Object.assign(d3, d3g)

let svg,
    inited = false,
    path,
    graticule,
    styles,

    domElements = {}

function createMap() {

    inited = true

    svg = d3.select('[data-map]')

    svg.attr('viewBox', '0 0 960 484')

    styles = svg.append('style')

    domElements['mask'] = svg.append('clipPath')
        .attr('id', 'mask')

    layers.forEach(layer => {
        if(layer.id != 'mask'){
            domElements[layer.id] = svg.append('g')
            .attr('class', 'group-' + layer.id)
            .attr('clip-path', 'url(#mask)')
        }
    })

    domElements['labels'] = svg.append('g').attr('id', 'labels')
    
    path = d3.geoPath()
    graticule = d3.geoGraticule10()
}

let projection

function update(geoData, options, labels) {

    projection = d3[options.projection]()
        .center([0, 0])
        .rotate([360 - options.rotation, 360 - options.translation, 360 - options.tilt])
        .fitExtent([[0, 0], [960, 484]], {type: 'Sphere'})

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
                        //console.log(d.properties)	
                    })
            }

        } else {

            d.remove()

        }
    })

    //if(options.labels) {
    const d = domElements['labels'].selectAll('text').data(labels)

    //d.exit().remove()
    
    d.join('text')
        .text((g) => {
            return  g?.properties?.POSTAL ? g.properties.POSTAL : g?.properties?.layer ? g.properties.layer : ''
            //return g?.properties?.scalerank == 1 && g.properties?.['iso_a2'] ? g.properties['iso_a2'] : ''
        })
        .attr('text-anchor', 'middle')
        // .attr('width', 40)
        .attr('x', g => {
            try {
                return path.centroid(g.geometry)[0]
            }
            catch(e) {
                console.log(e)
            }
            return 0
        })
        .attr('y', g => {
            try {
                return path.centroid(g.geometry)[1]
            }
            catch(e) {
                console.log(e)
            }
            return 0
        })
    // } else {
    //     domElements['labels'].selectAll('text').remove()
    // }

    styles.html(options.styles)
}

function receive(geoData, options, labels) {
    if(!inited) {
        inited = true
        createMap()
    }
    update(geoData, options, labels)
}

export default receive