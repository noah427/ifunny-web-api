let got = require("got")
let cheerio = require("cheerio")

module.exports = async function (shuffled, callback) {
    let url = "https://ifunny.co"
    if (shuffled) url += "/feeds/shuffle"
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
        callback(null, results)
    } catch (error) {
        callback(error, null)
    }
}
