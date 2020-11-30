const path = require("path");

module.exports = {
	entry: "./src/mjsr.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "mjsr.js",
	},
	optimization: {
		usedExports: true,
	},
};
