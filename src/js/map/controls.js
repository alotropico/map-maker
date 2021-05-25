import * as serialize from 'form-serialize'

let forms = [],
    callback

function setupForm(config, callbackFunc, formId) {

    forms[formId] = document.body.querySelector(formId)
    
    const form = forms[formId]
    
    const html = config.map(f => fieldsetWrapper(f) ).join('')

    callback = callbackFunc
    
    form.innerHTML += html

    form.addEventListener('input', function(){
        submit()
    })

    form.addEventListener('submit', function(e){
        
        e.preventDefault()
        submit()
    })
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
        labelAttrs = [`for="${d.id}"`]

    if(d?.attrs) {
        for(const i in d.attrs) {
            inputAttrs.push(`${i}="${d.attrs[i]}"`)
        }
    }

    switch(d.type) {
        case 'dropdown':
            return  getLabel(d.label, labelAttrs) +
                    getInput('select', inputAttrs, d.type, '', true) +
                        `${d.values.reduce((a, c) => {
                            return a + `<option value="${c.value}"${c.value == d.default ? ' selected="selected"' : ''}>${c.label}</option>`
                        }, '')}
                    </select>`

        case 'checkbox':
            if(d?.default) inputAttrs.push('checked')
            return getInput('input', inputAttrs, d.type, '', true) + getLabel(d.label, labelAttrs)

        case 'color':
            return getLabel(d.label, labelAttrs) + getInput('input', inputAttrs, d.type, d.default, true)
            
        case 'button':
            return `<button ${inputAttrs.join(' ')}>${d.label}</button>`

        case 'range':
            if(d.hasOwnProperty('default')) inputAttrs.push(`value="${d.default}"`)
            return getLabel(d.label, labelAttrs) + getInput('input', inputAttrs, d.type, '', true)

        default:
            return `<div class="warning">${d.label}: undefined item type.</div>`
    }
}

function getLabel(label, attrs) {
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
        ret = {...ret, ...serialize(forms[i], {
            hash: true,
            empty: true,
            disable: true
        })}
    }
    
    callback(ret)
}

export {setupForm, submit}