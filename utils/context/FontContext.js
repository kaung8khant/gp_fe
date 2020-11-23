import React from "react";

const FontContext = React.createContext({
  zawgyi: false,
  setZawgyi: () => {},
});
export default FontContext;
