import esbuild from "esbuild";

esbuild.buildSync({
  entryPoints: ["App.jsx"],
  bundle: true,
  outfile: "dist/bundle.cjs",
  platform: "node",
  target: "node14",
  minify: true,
  format: "cjs",
  jsx: "automatic",
});
