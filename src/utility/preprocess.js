export function preprocess(source, options) {
    let lines = source.split(/\n/),
		lineCount = lines.length;
		
    let output = "";

	traverse();
	return output.trim();

    function traverse(currentLine = 0, condition = true) {
        while (currentLine < lineCount) {
            let line = lines[currentLine];
    
            if (line.trim().startsWith("#")) {
                switch (line.trim().substr(1).split(/\s/)[0]) {
                    case "if": 
                        currentLine = traverse(currentLine + 1, eval(line.trim().substr(3)));
                    break;
                    case "else": 
                        currentLine = traverse(currentLine + 1, !condition);
                    break;
                    case "endif":
                        currentLine = traverse(currentLine + 1, true);
                    break;
                }
            } else if (condition) output += line + "\n";
    
            currentLine++;
        }

        return currentLine;
    }
}
