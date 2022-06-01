const axios = require("axios");

async function getLocationViaIP(ip) {
  let body;
  await axios
    .get("https://api.iplocation.net/?ip={ip}")
    .then((res) => {
      body = res.data;
    })
    .catch((err) => console.log(err));
  console.log(body);
}

module.exports = getLocationViaIP;
