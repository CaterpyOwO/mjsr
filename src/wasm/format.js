const colours = [
    "#282A2E",
    "#BD0940",
    "#76AB23",
    "#E0DE48",
    "#0170C5",
    "#7D498F",
    "#3F8D83",
    "#FFFFFD",

    "#676E7A",
    "#BD6D85",
    "#B5D680",
    "#FFFD76",
    "#80c8ff",
    "#AC79BB",
    "#8ABEB7",
    "#FFFFFD",
]

export function format(text) {
    if (text.indexOf("\\033") === -1) return [ text ];

    const reg = /\\033\[[0-9];?[0-9]{0,3}m/g;
    let m, f = [], i = 0;

    do {
        m = reg.exec(text);

        if (m) {
            const code = m[0].substr(5, m[0].indexOf('m') - 5).split(";").map(v=>+v);
            const style = {
                underline: false,
                bold: false,
                italic: false,
                colour: "#222",
                background: "transparent",
            }
 
            const c = (code.length === 1) ? code[0] : code[1];

            switch (code[0]) {
                case 1:
                    style.bold = true;
                    break;
                case 3:
                    style.italic = true;
                    break;
                case 4:
                    style.underline = true;
                    break;
            }

            if (c >= 30 && c <= 37) style.colour = colours[c - 30];
            else if (c >= 90 && c <= 97) style.colour = colours[c - 90 + 8];
            else if (c >= 40 && c <= 47) style.background = colours[c - 40], style.colour = "#fff";
            else if (c >= 100 && c <= 107) style.background = colours[c - 100 + 8], style.colour = "#fff";

            f[i] = `color:${style.colour};font-weight:${style.bold?"bold":"normal"};text-decoration:${style.underline?"underline":"none"};background:${style.background};font-style:${style.italic?"italic":"normal"};`;
            i++
        }

    } while (m);

    return [ text.replace(reg, "%c"), ...f ];
}

	/*

   //Regular text
    constexpr const char* BLK = "\033[0;30m";
    constexpr const char* RED = "\033[0;31m";
    constexpr const char* GRN = "\033[0;32m";
    constexpr const char* YEL = "\033[0;33m";
    constexpr const char* BLU = "\033[0;34m";
    constexpr const char* MAG = "\033[0;35m";
    constexpr const char* CYN = "\033[0;36m";
    constexpr const char* WHT = "\033[0;37m";

    //Regular bold text
    constexpr const char* BBLK = "\033[1;30m";
    constexpr const char* BRED = "\033[1;31m";
    constexpr const char* BGRN = "\033[1;32m";
    constexpr const char* BYEL = "\033[1;33m";
    constexpr const char* BBLU = "\033[1;34m";
    constexpr const char* BMAG = "\033[1;35m";
    constexpr const char* BCYN = "\033[1;36m";
    constexpr const char* BWHT = "\033[1;37m";

    //Regular underline text
    constexpr const char* UBLK = "\033[4;30m";
    constexpr const char* URED = "\033[4;31m";
    constexpr const char* UGRN = "\033[4;32m";
    constexpr const char* UYEL = "\033[4;33m";
    constexpr const char* UBLU = "\033[4;34m";
    constexpr const char* UMAG = "\033[4;35m";
    constexpr const char* UCYN = "\033[4;36m";
    constexpr const char* UWHT = "\033[4;37m";

    //Regular background
    constexpr const char* BLKB = "\033[40m";
    constexpr const char* REDB = "\033[41m";
    constexpr const char* GRNB = "\033[42m";
    constexpr const char* YELB = "\033[43m";
    constexpr const char* BLUB = "\033[44m";
    constexpr const char* MAGB = "\033[45m";
    constexpr const char* CYNB = "\033[46m";
    constexpr const char* WHTB = "\033[47m";

    //High intensty background 
    constexpr const char* BLKHB = "\033[0;100m";
    constexpr const char* REDHB = "\033[0;101m";
    constexpr const char* GRNHB = "\033[0;102m";
    constexpr const char* YELHB = "\033[0;103m";
    constexpr const char* BLUHB = "\033[0;104m";
    constexpr const char* MAGHB = "\033[0;105m";
    constexpr const char* CYNHB = "\033[0;106m";
    constexpr const char* WHTHB = "\033[0;107m";

    //High intensty text
    constexpr const char* HBLK = "\033[0;90m";
    constexpr const char* HRED = "\033[0;91m";
    constexpr const char* HGRN = "\033[0;92m";
    constexpr const char* HYEL = "\033[0;93m";
    constexpr const char* HBLU = "\033[0;94m";
    constexpr const char* HMAG = "\033[0;95m";
    constexpr const char* HCYN = "\033[0;96m";
    constexpr const char* HWHT = "\033[0;97m";

    //Bold high intensity text
    constexpr const char* BHBLK = "\033[1;90m";
    constexpr const char* BHRED = "\033[1;91m";
    constexpr const char* BHGRN = "\033[1;92m";
    constexpr const char* BHYEL = "\033[1;93m";
    constexpr const char* BHBLU = "\033[1;94m";
    constexpr const char* BHMAG = "\033[1;95m";
    constexpr const char* BHCYN = "\033[1;96m";
    constexpr const char* BHWHT = "\033[1;97m";

    //Reset
    constexpr const char* reset = "\033[0m";
	
	*/
