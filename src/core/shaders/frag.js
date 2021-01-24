import { preprocess } from "../../utility/preprocess.js";
import frag from "./fragments/frag.glsl";

export default function (options) {
	return preprocess(frag, options);
}
