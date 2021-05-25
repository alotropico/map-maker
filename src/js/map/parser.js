function parseFormResults(form, config) {
    // form.center = getCenterFromProjection(form.projection, config)
    // form.scale = getScaleFromProjection(form.projection, config)
    form.styles = getStyles(form, config) //
    form.projectionLibrary = getLibraryFromProjection(form.projection, config)
    //form.sphere = true
    return form
}

function getLibraryFromProjection(p, config) {
    return config[0].fields[0].values.find(c => c.value == p).library || false
}

function getCenterFromProjection(p, config) {
    return config[0].fields[0].values.find(c => c.value == p).center
}

function getScaleFromProjection(p, config) {
    const c = config[0].fields[0].values.find(c => c.value == p)
    return c?.scale ? c.scale : 1
}

function getStyles(form, config) {
    
    return getCssProperties(config)
        .filter(c => form.hasOwnProperty(c.id))
        .reduce((a, c) => a + c.identifiers.reduce((b, d) => b + `${d}{${c.css}: ${form[c.id]};}`, ''), '')
}

function getCssProperties(config) {
    return config.reduce((a, c) => [...a, ...c.fields.filter(f => f?.css)], [])
}

function parseGeoData(world) {
    return world
}

export {parseFormResults, parseGeoData}