import _ from "lodash";
const mmday = (day) => {
  const mday = {
    0: "တနင်္ဂနွေ",
    1: "တနင်္လာ",
    2: "အင်္ဂါ",
    3: "ဗုဒ္ဓဟူး",
    4: "ကြာသာပတေး",
    5: "သောကြာ",
    6: "စနေ",
  };
  return mday[day];
};
const mm_number = (value) => {
  value = value + "";
  value = _.replace(value, new RegExp("0", "g"), "၀");
  value = _.replace(value, new RegExp("1", "g"), "၁");
  value = _.replace(value, new RegExp("2", "g"), "၂");
  value = _.replace(value, new RegExp("3", "g"), "၃");
  value = _.replace(value, new RegExp("4", "g"), "၄");
  value = _.replace(value, new RegExp("5", "g"), "၅");
  value = _.replace(value, new RegExp("6", "g"), "၆");
  value = _.replace(value, new RegExp("7", "g"), "၇");
  value = _.replace(value, new RegExp("8", "g"), "၈");
  value = _.replace(value, new RegExp("9", "g"), "၉");
  return value;
};
export { mmday, mm_number };
