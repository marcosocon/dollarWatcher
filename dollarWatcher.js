const player = require('play-sound')(opts = {});

function fetchDollarValue() {
  const http = require('http');
  console.log('dollar request being made');
  http.get('http://ws.geeklab.com.ar/dolar/get-dolar-json.php', function (res) {
    let data = null;
    res.on('data', function (chunk) {
      data = chunk;
    });
    res.on('end', function () {
      newValue = Number(JSON.parse(data).libre);
      console.log(newValue, lastValue);
      if (newValue > lastValue) {
        console.log('valor subio');
        player.play('./sounds/gracias.mp3', err => console.log(err));
      } else if (newValue === lastValue) {
        console.log('valor esta igual');
      } else {
        player.play('./sounds/dolor.mp3', err => console.log(err));
        console.log('explota el mundo');
      }
      console.log(`ultimo valor fue : ${lastValue}, valor actual es : ${newValue}`);
      lastValue = newValue;
      console.log(`ultimo valor ahora es: `, lastValue);
    });
  }).on('error', function (err) {
    conso.e.log('error', err);
  });
};
let lastValue = 0;
setInterval(fetchDollarValue, 120000);
