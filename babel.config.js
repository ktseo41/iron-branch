module.exports = {
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  ignore: [
    /node_modules/,
    /dist/,
    /scripts/,
    /.*.gif/,
    /.*.png/,
    /.*.json/,
    /.*.md/,
    /.vscode/,
    /.cache/,
    /babel.config.js/,
  ],
};
