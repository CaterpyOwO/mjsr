export function preprocess(source, options) {
    let lines = source.split(/\n/),
        lineCount = lines.length;

    let output = "";

    traverse();
    return output.trim();

    function traverse(currentLine = 0, condition = true, prevCond = true) {
        while (currentLine < lineCount) {
            let line = lines[currentLine];

            if (line.trim().startsWith("#")) {
                switch (line.trim().substr(1).split(/\s/)[0]) {
                    case "if":
                        prevCond = condition;
                        currentLine = traverse(currentLine + 1, eval(line.trim().substr(3)), prevCond);
                    break;
                    case "else":
                        currentLine = traverse(currentLine + 1, !condition, prevCond);
                    break;
                    case "endif":
                        currentLine = traverse(currentLine + 1, prevCond);
                    break;
                }
            } else if (condition) output += line + "\n";
            
    
            currentLine++;
        }

        return currentLine;
    }
}