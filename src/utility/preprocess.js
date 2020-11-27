export function preprocess(source, options) {
	source += "\n#endif\n";

	function traverse(lines, condition = true) {
		let output = "";

		for (let l in lines) {
			let line = lines[l].trim();

			switch (line.split(/\s/)[0]) {
				case "#if":
					lines.splice(0, parseInt(l) + 1);
					output += traverse(lines, eval(line.substr(3).trim()));
					break;
				case "#else":
					lines.splice(0, parseInt(l) + 1);
					output += traverse(lines, !condition);
					break;
				case "#endif":
					lines.splice(0, parseInt(l) + 1);
					output += traverse(lines, true);
					// condition = true
					break;
				default:
					// lines.splice(0, parseInt(l));

					console.log(line);

					if (condition) output += `${line}\n`;
					break;
			}
		}

		return output.trim();
	}

	let out = traverse(source.split(/\n/));

	console.info(out);

	return out;
}
