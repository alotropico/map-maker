import * as d3 from 'd3'
import * as topojson from 'topojson'
import * as d3g from 'd3-geo-projection'

let svg,
    inited = false,
    path,
    graticule,
    styles,

    el = {},
    elKeys = [
        'mask',
        'sphere',
        'graticule',
        'land',
        'countries',
        'fresh_water_bodies',
        'micro_states',
        'cities',
        'labels',
    ]

function createMap() {

    inited = true

    svg = d3.select('[data-map]')

    svg.attr("viewBox", `0 0 960 484`)

    styles = svg.append('style')

    el['mask'] = svg.append("clipPath")
        .attr("id", "mask")

    elKeys.forEach(c => {
        if(c != 'mask'){
            el[c] = svg.append("g")
            .attr("class", 'group-' + c)
            .attr("clip-path", "url(#mask)")
        }
    })
    
    path = d3.geoPath()

    graticule = d3.geoGraticule10()
}

function update(world, config) {

    let proyectionType

    if(config?.projectionLibrary && config.projectionLibrary == 'd3') {
        proyectionType = d3[config.projection]()
    } else {
        proyectionType = d3g[config.projection]()
    }

    const projection = proyectionType
            .center([0, 0])
            .rotate([360 - config.rotation, 360 - config.translation])
            .fitExtent([[0, 0], [960, 484]], {type: "Sphere"})

    path.projection(projection)

    const defaultData = topojson.feature(world, world.objects.land).features

    //el['graticule'].selectAll("path").remove()

    elKeys.forEach(c => {
        
        let d = el[c].selectAll("path")
        
        if(!config.hasOwnProperty(c) || config[c]) {

            let data

            if(['sphere', 'mask', 'graticule'].includes(c)) {
                data = defaultData
            } else if(world.objects?.[c]) {
                data = topojson.feature(world, world.objects[c]).features
            }

            if(data) {
                
                d.data(data)
                    .enter()
                    .append("path")
                    .attr("id", function(d) {
                        return 'id-' + d.id
                    })

                d = el[c].selectAll("path")

                switch(c) {
                    case 'mask':
                    case 'sphere':
                        d.attr('d', path({type: 'Sphere'}))
                        break

                    case 'graticule':
                        d.attr("d", path(graticule))
                        break

                    default:
                        d.attr("d", path)
                }
            }
        } else {

            d.remove()

        }
    })

    // el['graticule'].selectAll(".graticule").remove()

    // el['graticule'].selectAll(".graticule")
    //     .data(defaultData)
    //     .enter()
    //     .append("path")
    //     .attr("class", 'graticule')
    //     .attr("d", path(graticule))

    styles.html(config.styles)
}

function receive(world, config) {

    if(!inited) {
        inited = true
        createMap()
        update(world, config)
    } else {
        update(world, config)
    }
}

export default receive