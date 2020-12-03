export function preprocess(source, options) {
	let lines = source.split(/\n/),
		lineCount = lines.length;

	let depths = {};
	let output = "";

	traverse();
	return output.trim();

	function traverse(currentLine = 0, condition = true, depth = 0) {
		while (currentLine < lineCount) {
			let line = lines[currentLine];

			if (line.trim().startsWith("#")) {
				switch (line.trim().substr(1).split(/\s/)[0]) {
					case "if":
						depths[depth] = condition;
						currentLine = traverse(
							currentLine + 1,
							eval(line.trim().substr(3)) && depths[depth],
							depth + 1
						);
						break;
					case "else":
						currentLine = traverse(
							currentLine + 1,
							!condition && depths[depth - 1],
							depth
						);
						break;
					case "endif":
						currentLine = traverse(currentLine + 1, depths[depth - 1], depth - 1);
						break;
				}
			} else if (condition) output += `${line}\n`;

			currentLine++;
		}

		return currentLine;
	}
}
