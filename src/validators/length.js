const checker = require('../checker')
const err = require('../errorCodes')

const lengthCheckers = {
    minimum: { func: (value, param) => checker.isTooShort(value, param), err: err.isTooShort },
    maximum: { func: (value, param) => checker.isTooLong(value, param), err: err.isTooLong },
    is: { func: (value, param) => checker.isWrongLength(value, param), err: err.isWrongLength }
}

function length(value, options) {
    let results = null
    for (const [validator, param] of Object.entries(options)) {
        const lengthChecker = lengthCheckers[validator]
        if (lengthChecker === undefined) throw Error(`Unknown length validator "${validator}"`)
        const result = lengthChecker.func(value, param)
        if (result) {
            results = results || []
            results.push({ error: lengthChecker.err, values: { length: param } })
        }
    }
    return results
}

module.exports = length 