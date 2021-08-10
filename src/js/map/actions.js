import SvgSaver from 'svgsaver'

function getFilename() {
    const now = new Date()
    return ['GEOmap', now.getFullYear(), now.toLocaleString('default', { month: 'long' }), now.getDate()].join('-')
}

export function exportSvg() {
    const svgsaver = new SvgSaver()
    const svg = document.querySelector('#render')
    svgsaver.asSvg(svg, getFilename() + '.svg')
}

export function exportPng() {
    const svgsaver = new SvgSaver()
    const png = document.querySelector('#render')
    svgsaver.asPng(png, getFilename() + '.png')
}