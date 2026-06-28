const stickersImages = {
  hundredPoints: require("./emoji1.png"),
  faceWithTearsOfJoy: require("./emoji2.png"),
  nailPolish: require("./emoji3.png"),
  goat: require("./emoji4.png"),
  doughnut: require("./emoji5.png"),
  rainbow: require("./emoji6.png"),
};

export const stickersData = Object.entries(stickersImages).map(
  ([name, source]) => {
    return {
      type: "image",
      name,
      source,
    };
  },
);

console.log(stickersData);
