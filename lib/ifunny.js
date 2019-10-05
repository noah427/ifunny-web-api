let got = require('got')
let cheerio = require('cheerio')

module.exports = async function (options, callback) {
  let next = callback || (isFunction(options) ? options : null)
  let opts = !isFunction(options) && options ? options : {}
  let url = 'https://ifunny.co'
  if (opts.shuffle === true) url += '/feeds/shuffle'
  try {
    let html = (await got(url)).body
    let $ = cheerio.load(html)
    let data = $('.post__media').children()
    let results = []
    for (let i = 0; i < data.length; i++) {
      let item = {}
      if (data[i].attribs['data-type'] === 'video') {
        item['type'] = 'mp4'
        item['src'] = data[i].attribs['data-source']
        item['url'] = 'https://ifunny.co' + data[i].children[0].next.children[0].attribs.href
        item['tags'] = data[i].children[0].next.children[0].children[0].attribs.alt
      } else if (data[i].attribs['data-type'] === 'image') {
        item['type'] = 'gif'
        item['src'] = data[i].attribs['data-source']
        item['url'] = 'https://ifunny.co' + data[i].children[0].next.children[0].attribs.href
        item['tags'] = data[i].children[0].next.children[0].children[0].attribs.alt
      } else {
        item['type'] = 'jpg'
        item['src'] = data[i].children[0].next.children[0].next.children[0].attribs['data-src']
        item['url'] = 'https://ifunny.co' + data[i].children[0].next.children[0].next.attribs.href
        item['tags'] = data[i].children[0].next.children[0].next.children[0].attribs.alt
      }
      results.push(item)
    }
    if (!next) return { error: null, result: results }
    next(null, results)
  } catch (error) {
    if (!next) return { error: error, result: null }
    next(error, null)
  }
}

function isFunction (fn) {
  return fn && {}.toString.call(fn) === '[object Function]'
}
