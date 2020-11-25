import types from "../conf/types";

const colors = {
    primary: ["#393b44", types.color],
    primaryBackground: ["#f1f3f8", types.color],
    secondary: ["#8d93ab", types.color],
    secondaryBackground: ["#d6e0f0", types.color],
    highlight1: ["#4CB1F8", types.color],
    highlight2: ["#ec5858", types.color],
};

const sizes = {
    text: [12, types.px],
    h1: [1.4, types.em],
    h2: [1.2, types.em],
    borderWidth: [1, types.px],
};

const buttons = {
    fontSize: [0.8, types.em],
    color: ["#FFFFFF", types.color],
    background: [colors.primary[0], types.color],
}

const textfield = {
    textSize: [1.2, types.em],
    fontColor: ["#393b44", types.color],
    border: [`2px solid ${colors.primary}`, types.text],
    background: ["white", types.color],
  }

export { colors, buttons, sizes, textfield }