// Adds colons and dots to numbers
// Source: https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
Number.prototype.format = function(n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n))
    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','))
}

// Converts plain numer to currency string
function numToCur(n, symbol = false) {
    if(!curToNum(n)) return ''
    let ret = (symbol ? '$' : '') + parseFloat(curToNum(n)).format(2, 3, ',', '.')
	return ret
}

// Converts 1,234,567.50 string to number
function curToNum(s) {
	let n = parseFloat(s.toString().replace(/,/g, '').replace(/\$/g, ''))
	return isNaN(n) ? 0 : n
}

// Generates csv filename
function genFileName(p) {
	const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"],
		d = new Date()

    return `${p}${ d.getFullYear() }-${ months[d.getMonth()].toLowerCase() }-${ String(d.getDate()).padStart(2, '0') }`
}

export {numToCur, curToNum, genFileName}