const got = require("got");
const cheerio = require("cheerio");

module.exports.legacy = async function (options, callback) {
  let next = callback || (isFunction(options) ? options : null);

  let opts = !isFunction(options) && options ? options : {};

  let url = "https://ifunny.co";
  if (opts.shuffle === true) url += "/feeds/shuffle";
  try {
    let html = (await got(url)).body;
    let $ = cheerio.load(html);
    let data = $(".post__media").children();
    let results = [];
    for (let i = 0; i < data.length; i++) {
      // this sucks but I'm too lazy to fix
      let item = {};
      // tags are actually the title?
      if (data[i].attribs["data-type"] === "video") {
        item["type"] = "mp4";
        item["src"] = data[i].attribs["data-source"];
        item["url"] =
          "https://ifunny.co" +
          data[i].children[0].next.children[0].attribs.href;
        item["tags"] =
          data[i].children[0].next.children[0].children[0].attribs.alt;
      } else if (data[i].attribs["data-type"] === "image") {
        item["type"] = "gif";
        item["src"] = data[i].attribs["data-source"];
        item["url"] =
          "https://ifunny.co" +
          data[i].children[0].next.children[0].attribs.href;
        item["tags"] =
          data[i].children[0].next.children[0].children[0].attribs.alt;
      } else {
        item["type"] = "jpg";
        item["src"] =
          data[i].children[0].next.children[0].next.children[0].attribs[
            "data-src"
          ];
        item["url"] =
          "https://ifunny.co" +
          data[i].children[0].next.children[0].next.attribs.href;
        item["tags"] =
          data[i].children[0].next.children[0].next.children[0].attribs.alt;
      }
      results.push(item);
    }
    if (!next) return { error: null, result: results };
    next(null, results);
  } catch (error) {
    if (!next) return { error: error, result: null };
    next(error, null);
  }
};

function isFunction(fn) {
  return fn && {}.toString.call(fn) === "[object Function]";
}

// module.exports.collective

module.exports.catalog = async (catalogId) => {
  url = `https://ifunny.co/${catalogId}`;
  let html;
  try {
    html = (await got(url)).body;
  } catch (e) {
    return -1;
  }

  let $ = cheerio.load(html);
  let results = [];
  for (let img of $(".grid__image").toArray()) {
    console.log(img.attribs)
    results.push({ src: img.attribs["data-src"], alt: img.attribs.alt });
  }
  return results
};
