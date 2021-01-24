import { preprocess } from "../../utility/preprocess.js";
import vert from "./fragments/vert.glsl";

export default function (options) {
	return preprocess(vert, options);
}
