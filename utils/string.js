import * as Rabbit from "rabbit-node";
const string_excerpt = (string, max = 40) => {
  let excerpt = "";
  if (string && string.length >= max) {
    excerpt = string.substring(0, max - 1);
    excerpt = excerpt + " ... ";
    return excerpt;
  }
  return string;
};
const font_converter = (string, isZawgyi) => {
  if (isZawgyi) {
    let converted = "";
    converted = Rabbit.uni2zg(string);
    return converted;
  }
  return string;
};
export { string_excerpt, font_converter };
