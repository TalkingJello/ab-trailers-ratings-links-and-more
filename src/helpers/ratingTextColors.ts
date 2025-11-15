import { site } from "./site";

const abColors = {
  textPrimary: "#fff",
  textSecondary: "gray",

  // place holders
  backgroundPopout: "#22354e",
  border: "#283f5c",
};

const moeColorsDarkMode = {
  textPrimary: "rgb(217, 227, 243)",
  textSecondary: "rgb(140, 159, 185)",
  backgroundPopout: "#22354e",
  border: "#283f5c",
};

const moeColorsLightMode = {
  textPrimary: "rgb(20, 27, 43)",
  textSecondary: "#7f838b",
  backgroundPopout: "rgb(20 27 43 / 2%)",
  border: "rgb(20, 27, 43 / 80%)",
};

export const siteColors = site.ab
  ? abColors
  : document.body.getAttribute("data-layout-mode") === "dark"
  ? moeColorsDarkMode
  : moeColorsLightMode;
