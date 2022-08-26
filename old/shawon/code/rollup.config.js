import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import svg from "rollup-plugin-svg";
import progress from "rollup-plugin-progress";

const fs = require("fs");

const pluginFolders = () => {
  const dir = fs.readdirSync(`./plugins`);
  return dir.filter((f) => f.match(/^datart*/)) || [];
};

export default pluginFolders().map((name) => {
  return {
    input: `plugins/${name}/index.js`,
    output: {
      file: `dist/${name}.iife.js`,
      //file: `/data/nodeapps/apps/datart/custom-chart-plugins/${name}.iife.js`,
      format: "iife",
    },
    plugins: [
      progress({
        clearLine: false,
      }),
      json(),
      svg({ base64: false }),
      terser({
        compress: {
          defaults: false,
        },
      }),
    ],
    watch: {
      include: "plugins/**",
      exclude: "node_modules/**",
    },
  };
});
