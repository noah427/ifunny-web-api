# ifunny
Simple API for https://ifunny.co/

## Usage
```js
ifunny(Object: RequestOptions | function: callback(error, response))
```
```js
let ifunny = require("ifunny")
ifunny({shuffle: false}, function (err, res) {
  console.log(res)
})

(async function() {
  let res = await ifunny()
  console.log(res)
})();
```

## Output
```js
[ { type: 'jpg',
    src: 'https://img.ifcdn.com/images/ab45b4c82485dd766884d01036d4ac24d4f32d7f_1.jpg',
    url: 'https://ifunny.co/fun/2l08Z86W?gallery=shuffle',
    tags: 'kristen, cat - iFunny :)' },
  { type: 'mp4',
    src: 'https://img.ifcdn.com/videos/e01bfd9286aea89c114848d1fd6b77f6d8dc6a522c7ca298bc503cab5045c998_1.mp4',
    url: 'https://ifunny.co/fun/ZwTgEjdh2?gallery=shuffle',
    tags: 'food - iFunny :)' },
  { type: 'gif',
    src: 'https://img.ifcdn.com/images/7acfe06b76d2c3c98114472941e6c3b9d21eafedcf11cc3a88f56d254f72c1f4_1.gif',
    url: 'https://ifunny.co/fun/o1Ivg67I1?gallery=shuffle',
    tags: 'running, treadmill - iFunny :)' },
    { ... }
]
```
### RequestOptions
shuffle: boolean

## TODO
- ~~Get more than 10 results~~
- ~~Add search by tags/user~~
- Add ability to get comments of a specific post
- Get iFunny feature timer?
