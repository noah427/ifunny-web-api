let got = require("got")
let cheerio = require("cheerio")

module.exports = async function (options, callback) {
    let next = callback ? callback : isFunction(options) ? options : null
    let opts = !isFunction(options) && options ? options : {} 
    let url = "https://ifunny.co"
    if (opts.shuffle === true) url += "/feeds/shuffle"
    try {
        let html = (await got(url)).body
        let $ = cheerio.load(html)
        let data = $(".media__preview.js-goalcollector-action")
        let results = []
        for (let i = 0; i < data.length; i++) {
            let item = {}
            item["url"] = "https://ifunny.co" + data[i].attribs.href
            item["img"] = data[i].children[0].attribs.src
            item["tags"] = data[i].children[0].attribs.alt
            results.push(item)
        }
        if (!next) return { "error": null, "result": results }
        next(null, results)
    } catch (error) {
        if (!next) return { "error": error, "result": null }
        next(error, null)
    }
}

function isFunction(fn) {
    return fn && {}.toString.call(fn) === '[object Function]'
}