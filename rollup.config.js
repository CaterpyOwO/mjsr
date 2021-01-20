import def from "./rollup/rollup.def.config.js";
import dev from "./rollup/rollup.dev.config.js";

export default commandLineArgs => {
	if (commandLineArgs.configDev === true) return dev;
	else return def;
};
