const tools = [
    {
        type: 'fieldset',
        fields: [
            {
                label: 'Projection',
                id: 'projection',
                type: 'dropdown',
                default: 'geoInterruptedHomolosine',
                values: [
                    {
                        label: 'Natural Earth',
                        value: 'geoNaturalEarth1',
                        library: 'd3'
                    },

                    {label: 'NaturalEarth2', value: 'geoNaturalEarth2'},

                    {
                        label: 'Equirectangular',
                        value: 'geoEquirectangular',
                        library: 'd3'
                    },
                    {
                        label: 'Equal Earth',
                        value: 'geoEqualEarth',
                        library: 'd3'
                    },
                    {
                        label: 'Orthographic',
                        value: 'geoOrthographic',
                        library: 'd3'
                    },
                    {
                        label: 'Mercator',
                        value: 'geoMercator',
                        library: 'd3'
                    },

                    {label: 'Airy', value: 'geoAiry'},

                    {label: 'Aitoff', value: 'geoAitoff'},

                    {label: 'August', value: 'geoAugust'},

                    {label: 'Baker', value: 'geoBaker'},

                    {label: 'Bertin1953', value: 'geoBertin1953'},

                    {label: 'Boggs', value: 'geoBoggs'},

                    {label: 'Bottomley', value: 'geoBottomley'},

                    {label: 'Bromley', value: 'geoBromley'},

                    {label: 'Craster', value: 'geoCraster'},

                    {label: 'CylindricalEqualArea', value: 'geoCylindricalEqualArea'},

                    {label: 'CylindricalStereographic', value: 'geoCylindricalStereographic'},

                    {label: 'Eckert1', value: 'geoEckert1'},

                    {label: 'Eckert2', value: 'geoEckert2'},

                    {label: 'Eckert3', value: 'geoEckert3'},

                    {label: 'Eckert4', value: 'geoEckert4'},

                    {label: 'Eckert5', value: 'geoEckert5'},

                    {label: 'Eckert6', value: 'geoEckert6'},

                    {label: 'Eisenlohr', value: 'geoEisenlohr'},

                    {label: 'Fahey', value: 'geoFahey'},

                    {label: 'FoucautSinusoidal', value: 'geoFoucautSinusoidal'},

                    {label: 'Gilbert', value: 'geoGilbert'},

                    {label: 'Ginzburg4', value: 'geoGinzburg4'},

                    {label: 'Ginzburg5', value: 'geoGinzburg5'},

                    {label: 'Ginzburg6', value: 'geoGinzburg6'},

                    {label: 'Ginzburg8', value: 'geoGinzburg8'},

                    {label: 'Ginzburg9', value: 'geoGinzburg9'},

                    {label: 'Guyou', value: 'geoGuyou'},

                    {label: 'Hammer', value: 'geoHammer'},

                    {label: 'HammerRetroazimuthal', value: 'geoHammerRetroazimuthal'},

                    {label: 'Healpix', value: 'geoHealpix'},

                    {label: 'Hill', value: 'geoHill'},

                    {label: 'Homolosine', value: 'geoHomolosine'},

                    {label: 'Hufnagel', value: 'geoHufnagel'},

                    {label: 'Hyperelliptical', value: 'geoHyperelliptical'},
                    
                    {label: 'InterruptedBoggs', value: 'geoInterruptedBoggs'},

                    {label: 'InterruptedHomolosine', value: 'geoInterruptedHomolosine'},

                    {label: 'InterruptedMollweide', value: 'geoInterruptedMollweide'},

                    {label: 'InterruptedMollweideHemispheres', value: 'geoInterruptedMollweideHemispheres'},

                    {label: 'InterruptedQuarticAuthalic', value: 'geoInterruptedQuarticAuthalic'},

                    {label: 'InterruptedSinuMollweide', value: 'geoInterruptedSinuMollweide'},

                    {label: 'InterruptedSinusoidal', value: 'geoInterruptedSinusoidal'},

                    {label: 'Kavrayskiy7', value: 'geoKavrayskiy7'},

                    {label: 'Lagrange', value: 'geoLagrange'},

                    {label: 'Larrivee', value: 'geoLarrivee'},

                    {label: 'Laskowski', value: 'geoLaskowski'},

                    {label: 'Loximuthal', value: 'geoLoximuthal'},

                    {label: 'Miller', value: 'geoMiller'},

                    {label: 'Mollweide', value: 'geoMollweide'},

                    {label: 'MtFlatPolarParabolic', value: 'geoMtFlatPolarParabolic'},

                    {label: 'MtFlatPolarQuartic', value: 'geoMtFlatPolarQuartic'},

                    {label: 'MtFlatPolarSinusoidal', value: 'geoMtFlatPolarSinusoidal'},

                    {label: 'NellHammer', value: 'geoNellHammer'},

                    {label: 'Nicolosi', value: 'geoNicolosi'},

                    {label: 'Patterson', value: 'geoPatterson'},

                    {label: 'PeirceQuincuncial', value: 'geoPeirceQuincuncial'},
                    {label: 'Polyconic', value: 'geoPolyconic'},
                    
                    {label: 'PolyhedralButterfly', value: 'geoPolyhedralButterfly'},

                    {label: 'PolyhedralCollignon', value: 'geoPolyhedralCollignon'},

                    {label: 'PolyhedralWaterman', value: 'geoPolyhedralWaterman'},
                    
                    {label: 'RectangularPolyconic', value: 'geoRectangularPolyconic'},

                    {label: 'Robinson', value: 'geoRobinson'},

                    {label: 'Satellite', value: 'geoSatellite'},

                    {label: 'SinuMollweide', value: 'geoSinuMollweide'},

                    {label: 'Sinusoidal', value: 'geoSinusoidal'},
                    
                    {label: 'Times', value: 'geoTimes'},

                    {label: 'VanDerGrinten', value: 'geoVanDerGrinten'},

                    {label: 'VanDerGrinten2', value: 'geoVanDerGrinten2'},

                    {label: 'VanDerGrinten3', value: 'geoVanDerGrinten3'},

                    {label: 'VanDerGrinten4', value: 'geoVanDerGrinten4'},

                    {label: 'Wagner', value: 'geoWagner'},

                    {label: 'Wagner4', value: 'geoWagner4'},

                    {label: 'Wagner6', value: 'geoWagner6'},

                    {label: 'Wagner7', value: 'geoWagner7'},

                    {label: 'Wiechel', value: 'geoWiechel'},

                    {label: 'Winkel3', value: 'geoWinkel3'},
                ]
            },
        ]
    },
    {
        label: 'Features',
        type: 'fieldset',
        fields: [
            {
                label: 'Show Labels',
                id: 'labels',
                type: 'checkbox',
                default: false
            },
            {
                label: 'Show Grid',
                id: 'graticule',
                type: 'checkbox',
                default: true
            },
            {
                label: 'Countries',
                id: 'countries',
                type: 'checkbox',
                default: true
            },
            {
                label: 'Micro States',
                id: 'micro_states',
                type: 'checkbox',
                default: false
            },
            {
                label: 'Lakes & Rivers',
                id: 'fresh_water_bodies',
                type: 'checkbox',
                default: false
            },
            {
                label: 'Major Cities',
                id: 'cities',
                type: 'checkbox',
                default: false
            },
            {
                label: 'Background',
                id: 'sphere',
                type: 'checkbox',
                default: true,
                attrs: {disabled: 'disabled'}
            },
        ]
    },
    {
        label: 'Colors',
        type: 'fieldset',
        fields: [
            {
                label: 'Seas',
                id: 'seas',
                type: 'color',
                default: '#6CB6E4',
                css: 'fill',
                identifiers: [`.group-sphere path`]
            },
            {
                label: 'Land',
                id: 'land',
                type: 'color',
                default: '#F7E6B1',
                css: 'fill',
                identifiers: [`.group-land path`, `.group-countries path`]
            },
            {
                label: 'Countrie\'s borders',
                id: 'lines',
                type: 'color',
                default: '#999999',
                css: 'stroke',
                identifiers: [`.group-countries path`]
            },
            {
                label: 'Lines',
                id: 'lines',
                type: 'color',
                default: '#ffffff',
                css: 'stroke',
                identifiers: [`.group-graticule path`]
            },
            {
                label: 'Texts',
                id: 'texts',
                type: 'color',
                default: '#333333',
                css: 'color',
                identifiers: [`.group-labels path`]
            }
        ]
    }
]

const panels = [
    {
        type: 'fieldset',
        fields: [
            {
                label: 'Earth\'s Rotation',
                id: 'rotation',
                type: 'range',
                default: 0,
                attrs: {
                    min: 0,
                    max: 359,
                    step: 2
                }
            },
            {
                label: 'Earth\'s Tilt',
                id: 'translation',
                type: 'range',
                default: 0,
                attrs: {
                    min: 0,
                    max: 359,
                    step: 2
                }
            },
        ]
    },
    {
        type: 'fieldset',
        attrs: {class: 'break'},
        fields: [
            {
                label: 'Save in this computer',
                id: 'save_local',
                type: 'checkbox',
                default: true
            },
            {
                label: 'Save Configuration',
                id: 'save_config',
                type: 'button'
            }
        ]
    },
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

export {tools, panels}