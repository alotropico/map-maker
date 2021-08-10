import * as serialize from 'form-serialize'

let forms = [],
    callback,
    inputTO

function setupForm(config, callbackFunc, formId) {

    forms[formId] = document.body.querySelector(formId)
    
    const form = forms[formId]
    
    const html = config.map(fieldset => fieldsetWrapper(fieldset) ).join('')

    // if(d?.actions) {
    //     for(const i in d.actions) {
    //         configActions.push(`${i}="${d.attrs[i]}"`)
    //     }
    // }

    callback = callbackFunc
    
    form.innerHTML += html

    config.reduce((ac, fieldset) => {
        const ob = fieldset.fields.filter(field => field?.actions).reduce((a, b) => [...a, b], [])
        return ob && ob.length && [...ac, ...ob] || ac
    }, [])
    .forEach(b => {
        const e = document.getElementById(b.id)
        Object.keys(b.actions).forEach(key => e[key] = b.actions[key])
    })

    form.addEventListener('input', function(e){

        //form.submit()

        e.preventDefault()

        update()

        //console.log('input', change++)

        queSubmit()

        // if(typeof inputTO !== 'undefined') clearTimeout(inputTO)

        // inputTO = setTimeout(submit, 1000)
    })

    form.addEventListener('change', function(e){
        
        e.preventDefault()

        //console.log('submit', submito++)

        



        // if(typeof inputTO !== 'undefined') clearTimeout(inputTO)

        // inputTO = setTimeout(submit, 1000)
        
    })

    form.addEventListener('submit', function(e){
        
        e.preventDefault()
        
    })

    var inputs = document.querySelectorAll('input[type="number"]')
    Array.prototype.forEach.call(inputs, function (element) {
        element.onclick = function () {
            element.focus()
            element.select()
        }
    })
}

function queSubmit() {
    
    if(typeof inputTO !== 'undefined') clearTimeout(inputTO)

    inputTO = setTimeout(submit, Math.round(1000/60))
}

function update() {
    for(const i in forms) {

        const form = forms[i]

        const binded = form.querySelectorAll('[data-bind]')
        
        Array.prototype.forEach.call(binded, (element) => {
            const   id = element.getAttribute('data-bind'),
                    mem = element.getAttribute('data-mem') || 0,
                    ref = form.querySelectorAll(`#${id}`)[0],
                    pre = ref.value
                    
            if(mem == undefined || mem != pre) {
                
                element.value = pre
                
            } else {
                ref.value = element.value
            }

            element.setAttribute('data-mem', element.value)
        })
    }
}

function fieldsetWrapper(f) {

    let attrs = []

    if(f?.attrs) {
        for(const i in f.attrs) {
            attrs.push(`${i}="${f.attrs[i]}"`)
        }
    }

    return  `<fieldset ${attrs.join(' ')}>
                ${ f?.label ? `<h3>${f.label}</h3>` : '' }
                ${ f.fields.map(d => componentWrapper(d) ).join('') }
            </fieldset>`
}

function componentWrapper(d) {
    return `<div class="item item-type-${d.type}">  ${ componentField(d) } </div>`
}

function componentField(d) {
    let inputAttrs = [`class="${d.id}"`, `id="${d.id}"`, `name="${d.id}"`],
        labelAttrs = [`for="${d.id}"`],
        configAttrs = []

    if(d?.attrs) {
        for(const i in d.attrs) {
            configAttrs.push(`${i}="${d.attrs[i]}"`)
        }
    }

    inputAttrs = [...inputAttrs, ...configAttrs].map(d => {
        return d
    })

    let tag = 'input'

    switch(d.type) {
        case 'dropdown':
        case 'datalist':
            tag = d.type == 'dropdown' ? 'select' : 'datalist'
            return  getLabel(d.label, labelAttrs) +
                    getInput(tag, inputAttrs, d.type, '', true) +
                        `${d.values.reduce((a, c) => {
                            return a + `<option value="${c.value}"${c.value == d.default ? ' selected="selected"' : ''}>${c.label}</option>`
                        }, '')}
                    </${tag}>`

        case 'checkbox':
            if(d?.default) inputAttrs.push('checked')
            return getLabel(d.label, labelAttrs) + getInput(tag, inputAttrs, d.type, '', true)

        case 'color':
            return getLabel(d.label, labelAttrs) + getInput(tag, inputAttrs, d.type, d.default, true)
            
        case 'button': 
            return `<button ${inputAttrs.join(' ')}>${d.label}</button>`

        case 'range':
            if('default' in d) inputAttrs.push(`value="${d.default}"`)
            return `<div class="label-wrapper">
                        ${getLabel(d.label, labelAttrs)}
                        ${getInput('input', [`data-bind="${d.id}"`, `min="${d.attrs.min}"`, `max="${d.attrs.max}"`], 'number', '0', true)}
                    </div>
                    ${getInput(tag, inputAttrs, d.type, '', true)}`

        default:
            return `<div class="warning">${d.label}: undefined item type.</div>`
    }
}

function getLabel(label, attrs) {
    if(label == '') return ''
    return `<label ${attrs.join(' ')}>${label}</label>`
}

function getInput(tag, attrs, type, value) {
    if(type > '') attrs.push(`type="${type}"`)
    if(value > '') attrs.push(`value="${value}"`)
    return `<${tag} ${attrs.join(' ')}>`
}

function submit() {

    let ret = {}

    for(const i in forms) {

        const form = forms[i]

        ret = {...ret, ...serialize(form, {
            hash: true,
            empty: true,
            disable: true
        })}
    }
    
    callback(ret)
}

export {setupForm, submit}