const layers = [
    {
        id: 'mask',
        default: true,
        hideInput: true,

        interactive: false,
        uselabels: false
    },
    {
        id: 'sphereline',
        label: 'Contour',
        default: true,

        interactive: false,
        unmasked: true,
        uselabels: false,

        styles: {stroke: 'halo'}
    },
    {
        id: 'sphere',
        label: 'Background',
        default: true,
        //attrs: {disabled: 'disabled'},

        interactive: false,
        uselabels: false,

        styles: {fill: 'background'}
    },
    {
        id: 'graticule',
        label: 'Show Graticule (Grid)',
        default: true,

        interactive: false,
        uselabels: false,

        styles: {stroke: 'graticule'}
    },
    {
        id: 'land',
        label: 'Land',
        default: true,

        interactive: false,
        uselabels: true,

        styles: {fill: 'land'}
    },
    {
        id: 'languagefamilies',
        label: 'Language Families',
        default: false,

        interactive: true,
        uselabels: true,

        styles: {fill: 'zone', stroke: 'line'}
    },
    {
        id: 'countries',
        label: 'Countries',
        default: true,

        interactive: true,
        //unmasked: true,
        uselabels: true,

        styles: {fill: 'zone', stroke: 'line'}
    },
    {
        id: 'tinycountries',
        label: 'Tiny Countries',
        default: false,

        interactive: true,
        //unmasked: true,
        uselabels: true,

        styles: {fill: 'zone', stroke: 'line'}
    },
    {
        id: 'cities',
        label: 'Major Cities',
        default: false,

        interactive: true,
        uselabels: true,

        styles: {fill: 'spot', stroke: 'line'}
    }
]

const defaultDatalistValues = Array(10).fill(40)
    .map((c, i) => { return {value: -180 + i * c} })

const tools = [
    {
        label: 'Projection',
        type: 'fieldset',
        fields: [
            {
                label: '',
                id: 'projection',
                type: 'dropdown',
                default: 'geoOrthographic',
                values: [

                    // Natural - subjective
                    {label: 'Natural Earth', value: 'geoNaturalEarth1'},
                    {label: 'NaturalEarth2', value: 'geoNaturalEarth2'},
                    {label: 'Equal Earth', value: 'geoEqualEarth', type: 'equal-area pseudocylindrical'},
                    {label: 'Robinson', value: 'geoRobinson'},
                    {label: 'Winkel3', value: 'geoWinkel3'},
                    {label: 'Aitoff', value: 'geoAitoff'},
                    {label: 'Hammer', value: 'geoHammer', type: 'equal-area'},

                    {label: 'Hufnagel', value: 'geoHufnagel', url: 'https://observablehq.com/@fil/hufnagel-projection'},
                    {label: 'Hyperelliptical', value: 'geoHyperelliptical'},
                    {label: 'Kavrayskiy7', value: 'geoKavrayskiy7'},
                    {label: 'Times', value: 'geoTimes'},
                    {label: 'Bromley', value: 'geoBromley'},

                    {label: 'Eckert1', value: 'geoEckert1'},
                    {label: 'Eckert2', value: 'geoEckert2'},
                    {label: 'Eckert3', value: 'geoEckert3'},
                    {label: 'Eckert4', value: 'geoEckert4'},
                    {label: 'Eckert5', value: 'geoEckert5'},
                    {label: 'Eckert6', value: 'geoEckert6'},

                    {label: 'MtFlatPolarSinusoidal', value: 'geoMtFlatPolarSinusoidal'},
                    {label: 'Sinusoidal', value: 'geoSinusoidal'},
                    {label: 'FoucautSinusoidal', value: 'geoFoucautSinusoidal', type: 'pseudocylindrical'},

                    {label: 'Craster', value: 'geoCraster'},


                    // Azimuthal
                    {label: 'Orthographic', value: 'geoOrthographic'},
                    {label: 'Satellite', value: 'geoSatellite'},
                    {label: 'Gilbert', value: 'geoGilbert'}, // ???

                    {label: 'azimuthalEqualArea', value: 'geoAzimuthalEqualArea'},
                    {label: 'azimuthalEquidistant', value: 'geoAzimuthalEquidistant'},
                    {label: 'HammerRetroazimuthal', value: 'geoHammerRetroazimuthal'},
                    {label: 'gnomonic', value: 'geoGnomonic'},
                    {label: 'stereographic', value: 'geoStereographic'},
                    {label: 'Airy', value: 'geoAiry'},

                    {label: 'Wiechel', value: 'geoWiechel', type: 'equal-area'},

                    // Cylindrical
                    {label: 'Equirectangular', value: 'geoEquirectangular'},
                    {label: 'Miller', value: 'geoMiller'},
                    {label: 'Lambert cylindrical equal-area', value: 'geoCylindricalEqualArea'},
                    {label: 'CylindricalStereographic', value: 'geoCylindricalStereographic'},
                    {label: 'Patterson', value: 'geoPatterson'},
                    {label: 'Mercator',  value: 'geoMercator'},
                    {label: 'transverseMercator', value: 'geoTransverseMercator'},

                    // Conic
                    // {label: 'conicConformal', value: 'geoConicConformal'},
                    {label: 'conicEquidistant', value: 'geoConicEquidistant'},
                    {label: 'Polyconic', value: 'geoPolyconic'},
                    {label: 'RectangularPolyconic', value: 'geoRectangularPolyconic'},
                    
                    
                    // Interrupted
                    {label: 'InterruptedBoggs', value: 'geoInterruptedBoggs'},
                    {label: 'InterruptedHomolosine', value: 'geoInterruptedHomolosine'},
                    {label: 'InterruptedMollweide', value: 'geoInterruptedMollweide'},
                    {label: 'InterruptedMollweideHemispheres', value: 'geoInterruptedMollweideHemispheres'},
                    {label: 'InterruptedQuarticAuthalic', value: 'geoInterruptedQuarticAuthalic'},
                    {label: 'InterruptedSinuMollweide', value: 'geoInterruptedSinuMollweide'},
                    {label: 'InterruptedSinusoidal', value: 'geoInterruptedSinusoidal'},

                    // Poly
                    {label: 'PolyhedralButterfly', value: 'geoPolyhedralButterfly'},
                    {label: 'PolyhedralCollignon', value: 'geoPolyhedralCollignon'},
                    {label: 'PolyhedralWaterman', value: 'geoPolyhedralWaterman'},

                    // Conventional Projections (the Denoyer Semi-Elliptical)
                    {label: 'Savard Egg (Fahey)', value: 'geoFahey'},
                    {label: 'Ginzburg4', value: 'geoGinzburg4'},
                    {label: 'Ginzburg5', value: 'geoGinzburg5'},
                    {label: 'Ginzburg6', value: 'geoGinzburg6'},
                    {label: 'Ginzburg8', value: 'geoGinzburg8'},
                    {label: 'Ginzburg9', value: 'geoGinzburg9'},

                    {label: 'VanDerGrinten', value: 'geoVanDerGrinten'},
                    {label: 'VanDerGrinten2', value: 'geoVanDerGrinten2'},
                    {label: 'VanDerGrinten3', value: 'geoVanDerGrinten3'},
                    {label: 'VanDerGrinten4', value: 'geoVanDerGrinten4'},

                    {label: 'Wagner', value: 'geoWagner'},
                    {label: 'Wagner4', value: 'geoWagner4'},
                    {label: 'Wagner6', value: 'geoWagner6'},
                    {label: 'Wagner7', value: 'geoWagner7'},
                    
                    // Conformal
                    {label: 'August', value: 'geoAugust', url: 'http://www.quadibloc.com/maps/mcf0702.htm'},
                    {label: 'Eisenlohr', value: 'geoEisenlohr'},
                    {label: 'Guyou', value: 'geoGuyou'},
                    {label: 'PeirceQuincuncial', value: 'geoPeirceQuincuncial'},




                    {label: 'Baker', value: 'geoBaker'},

                    {label: 'Bertin1953', value: 'geoBertin1953'},

                    {label: 'Boggs', value: 'geoBoggs'},

                    {label: 'Bottomley', value: 'geoBottomley'},

                    {label: 'Healpix', value: 'geoHealpix'},

                    {label: 'Hill', value: 'geoHill'},

                    {label: 'Homolosine', value: 'geoHomolosine'},

                    {label: 'Lagrange', value: 'geoLagrange'},

                    {label: 'Larrivee', value: 'geoLarrivee'},

                    {label: 'Laskowski', value: 'geoLaskowski'},

                    {label: 'Loximuthal', value: 'geoLoximuthal'},

                    {label: 'Mollweide', value: 'geoMollweide'},

                    {label: 'MtFlatPolarParabolic', value: 'geoMtFlatPolarParabolic'},

                    {label: 'MtFlatPolarQuartic', value: 'geoMtFlatPolarQuartic'},

                    {label: 'NellHammer', value: 'geoNellHammer'},

                    {label: 'Nicolosi', value: 'geoNicolosi'},

                    {label: 'SinuMollweide', value: 'geoSinuMollweide'},
                ]
            },
            {
                label: 'Lateral Rotation [λ]',
                id: 'rotation',
                type: 'range',
                default: -60,
                attrs: {
                    min: -180,
                    max: 180,
                    list: 'rotation-ticks'
                }
            },
            {
                label: '',
                id: 'rotation-ticks',
                type: 'datalist',
                values: defaultDatalistValues
            },
            {
                label: 'Vertical Rotation [φ]',
                id: 'translation',
                type: 'range',
                default: -39,
                attrs: {
                    min: -180,
                    max: 180,
                    list: 'translation-ticks'
                }
            },
            {
                label: '',
                id: 'translation-ticks',
                type: 'datalist',
                values: defaultDatalistValues
            },
            {
                label: 'Clock Rotation [γ]',
                id: 'tilt',
                type: 'range',
                default: -3,
                attrs: {
                    min: -180,
                    max: 180,
                    list: 'tilt-ticks'
                }
            },
            {
                label: '',
                id: 'tilt-ticks',
                type: 'datalist',
                values: defaultDatalistValues
            }
        ]
    },
    {
        label: 'Features',
        type: 'fieldset',
        fields: [
            {
                label: 'Labels',
                id: 'labels',
                type: 'checkbox',
                default: false
            },
            ...layers.filter(l => !l.hideInput).reverse().map(l => {
                return {
                    label: l.label,
                    id: l.id,
                    type: 'checkbox',
                    default: l.default,
                    attrs: l?.attrs ? l.attrs : false
                }
            })
        ]
    },
    {
        label: 'Colors',
        type: 'fieldset',
        fields: [
            {
                label: 'Seas',
                id: 'color-seas',
                type: 'color',
                default: '#78bcdd',
                css: 'fill',
                identifiers: ['.group-sphere path']
            },
            {
                label: 'Land',
                id: 'color-land',
                type: 'color',
                default: '#f3dea5',
                css: 'fill',
                identifiers: [
                    '.group-land path',
                    '.group-cities path',
                    '.group-tinycountries path'
                ]
            },
            {
                label: 'Shape\'s Lines',
                id: 'color-lines',
                type: 'color',
                default: '#917f6e',
                css: 'stroke',
                identifiers: [
                    '.group-countries path',
                    '.group-languagefamilies path',
                    '.group-cities path',
                    '.group-tinycountries path'
                ]
            },
            {
                label: 'Graticule\'s Lines',
                id: 'color-graticule',
                type: 'color',
                default: '#ffffff',
                css: 'stroke',
                identifiers: ['.group-graticule path']
            },
            {
                label: 'Contour Line',
                id: 'color-contour',
                type: 'color',
                default: '#71adca',
                css: 'stroke',
                identifiers: ['.group-sphereline path']
            },
            {
                label: 'Text',
                id: 'color-texts',
                type: 'color',
                default: '#333333',
                css: 'color',
                identifiers: ['.group-labels path']
            }
        ]
    }
]

const panels = [
    {
        type: 'fieldset',
        fields: [
            {
                label: 'Save as PNG',
                id: 'save_png',
                type: 'button'
            },
            {
                label: 'Save as SVG',
                id: 'save_svg',
                type: 'button'
            }
        ]
    }
]

const baseStyle = `
    text {
        font-family: $font-family, Helvetica, Arial, sans-serif;
        font-size: 10px;
        text-align: center;
        font-weight: 900;
    }

    .group-sphereline path {
        fill: none;
        stroke-width: 2.4px;
    }

    .group-countries path, .group-languagefamilies path {
        fill: none;
        stroke-width: .3px;
    }

    .group-tinycountries path, .group-cities path {
        fill: none;
        stroke-width: .3px;
    }

    .group-graticule path {
        fill: none;
        opacity: .5;
        stroke-width: .3px;
    }`

export {layers, tools, panels, baseStyle}