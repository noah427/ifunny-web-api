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
{ error: null,
  result: 
   [ { url: 'https://ifunny.co/fun/BG1TZ8Fg5',
       img: 'https://img.ifcdn.com/images/58b624c7bbeb8005e16452aa4fd850c1b6096431a2ea04a2b7e4da38a0102212_1.jpg',
       tags: 'Very funny :) - iFunny :)' },
     { url: 'https://ifunny.co/fun/AKztx9if5',
       img: 'https://img.ifcdn.com/images/f101d7c150f5893a72ccfa764d879a3e9294dcd52f0f7053278c4b4496a9523f_1.jpg',
       tags: 'unicorn, comic - iFunny :)' },
     { url: 'https://ifunny.co/fun/e6zBtjCg5',
       img: 'https://img.ifcdn.com/images/c7c37c880306ecb24f95081e90ea0d4b378da7b1293ab561a354342e6b4d3cd9_3.jpg',
       tags: 'Yummy  breakfast - iFunny :)' },
       [...]
```
### RequestOptions
shuffle: boolean

## TODO
- Get more than 10 results
- Add search by tags/user
- Add ability to get comments of a specific post
- Get iFunny feature timer?
