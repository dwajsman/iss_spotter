const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  mainISS
} = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   // Hell-level 2
//   fetchCoordsByIP(ip, (error, coordinates) => {
//     if (error) {
//       console.log("It didn't work!", error);
//       return;
//     }
  
//     // Hell-level 3
//     fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
//       if (error) {
//         console.log("It didn't work!", error);
//         return;
//       }

//       console.log('flyover times for your location are: ', passTimes);

//     }); // end of fetchISSFlyOverTimes - level 3
//   }); // end of fetchCoordsByIP - level 2
// });// end of fetchMyIP - level 1

// Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!

function prettyInfo(passTimes) {
  passTimes.forEach(pass => {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  });
}



mainISS((error, passTimes) => {

  if (error) {
    return console.log("It didn't work!", error);
  }
  
  // console.log(passTimes);
  prettyInfo(passTimes);
});

// let info = {
//   latitude: -22.9485,
//   longitude: -43.3436
// };
// fetchISSFlyOverTimes(info, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('flyover times for your location are: ', passTimes);

// });