const status = (name) => {
  console.log(name);
  const image_list = {
    "clear-day": { name: "နေသာ", image: image_name.Sunny },
    "clear-night": { name: "နေသာ", image: image_name.Sunny },
    "partly-cloudy-day": {
      name: "တိမ်အသင့်အတင့်",
      image: image_name.PartlyCloudy,
    },
    "partly-cloudy-night": {
      name: "တိမ်အသင့်အတင့်",
      image: image_name.PartlyCloudy,
    },
    cloudy: { name: "တိမ်ထူထပ်", image: image_name.Cloudy },
    rain: { name: "မိုးရွာ", image: image_name.Rain },
    sleet: { name: "နှင်းမိုးရွာ", image: image_name.Sleet },
    snow: { name: "နှင်းကျ", image: image_name.Snow },
    wind: { name: "လေတိုက်", image: image_name.Windy },
    fog: { name: "မြူဆိုင်း", image: image_name.Cloudy },
  };
  return image_list[name];
};
const image_name = {
  Sunny: require("../assets/images/sunny.png"),
  PartlyCloudy: require("../assets/images/partly-cloudy.png"),
  Cloudy: require("../assets/images/cloudy.png"),
  Rain: require("../assets/images/rain.png"),
  Sleet: require("../assets/images/sleet.png"),
  Snow: require("../assets/images/snow.png"),
  Windy: require("../assets/images/windy.png"),
};

export { status };
