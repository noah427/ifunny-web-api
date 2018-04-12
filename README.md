# ifunny
Simple API for https://ifunny.co/

## Usage
```js
let ifunny = require("ifunny")
ifunny(false, function (err, res) {
//    res = [
//      {
//        url: "...",
//        img: "...",
//        tags: "..."
//      },
//      ...
//    ]
})
```

## TODO

- Get more than 10 results
- Add search by tags/user
- Add ability to get comments of a specific post
- Get iFunny feature timer?