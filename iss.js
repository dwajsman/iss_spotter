const request = require("request");
const http = require('http');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const mainISS = function(callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    // Hell-level 2
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }
    
      // Hell-level 3
      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passTimes);

      }); // end of fetchISSFlyOverTimes - level 3
    }); // end of fetchCoordsByIP - level 2
  });// end of fetchMyIP - level 1
}; // end of mainISS

const fetchMyIP = function (callback) {
  let apiUrl = "https://api64.ipify.org?format=json";

  request(apiUrl, function (error, response, body) {
    // apiUrl
    if (error) {
      callback(error, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const data = JSON.parse(body);

    // console.log();

    callback(null, data["ip"]);
    

  });

};

const fetchCoordsByIP = function (ip, callback) {

  request(`https://api.freegeoip.app/json/` + ip + "?apikey=ab703640-3dfd-11ec-b38a-4fdc55831e50", (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
      return;

    }


    const {
      latitude,
      longitude
    } = JSON.parse(body);

    callback(null, {
      latitude,
      longitude
    });

  });

  // { latitude: -22.9485, longitude: -43.3436 }

  // https://iss-pass.herokuapp.com/json/?lat=-22.9485&lon=-43.3436

}; // end of fetchCoordsByIP

const fetchISSFlyOverTimes = function (latLong, callback) {

  let lat = latLong.latitude;
  let lon = latLong.longitude;
  let url = "https://iss-pass.herokuapp.com/json/?lat=" + lat + "&lon=" + lon;
  //console.log(url);
  request(url, (error, response, body) => {

    const data = JSON.parse(body);

    //  console.log(data.response);

    callback(null, data.response);
  });

};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  mainISS
};