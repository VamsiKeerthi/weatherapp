const vidmap = {
  thunderstorm: "/thunderstorm.mp4",
  drizzle: "/drizzle.mp4",
  rainy: "/rainy.mp4",
  mist: "/mist.mp4",
  snow: "/snow.mp4",
  clear: "/clear.mp4",
  cloudy: "/clouds.mp4",
};

const getVideoByWeatherId = (weatherId) => {
  if (weatherId >= 200 && weatherId < 300) {
    return vidmap.thunderstorm;
  } else if (weatherId === 800) {
    return vidmap.clear;
  } else if (weatherId >= 300 && weatherId < 400) {
    return vidmap.drizzle;
  } else if (weatherId >= 500 && weatherId < 600) {
    return vidmap.rainy;
  } else if (weatherId >= 600 && weatherId < 700) {
    return vidmap.snow;
  } else if (weatherId >= 700 && weatherId < 800) {
    return vidmap.mist;
  } else if (weatherId > 800) {
    return vidmap.cloudy;
  }
  return vidmap.clear;
};

export default getVideoByWeatherId;
