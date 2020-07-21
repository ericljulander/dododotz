! function() {
    let WIDTH = screen.width;

    let board = $("#board");
    board.width = $();





    const COLORS = ["yellow", "blue", "green", "orange", "purple", "red", "grey", "black", "white", "pink"];

    // 0 - yellow
    // 1 - blue
    // 2 - green
    // 3 - orange
    // 4 - purple
    // 5 - red
    // 6 - grey
    // 7 - black
    // 8 - white
    // 9 - pink

    function getColorPegRef(color) {
        return `./pegs/${color}_peg.png`;
    }


    /*
     * length - how long the answer is
     * amount - how much colors are avaliable to draw from
     * doubles - whether a color can appear twice in the answer or not
     */

    function generateAnswer(length = 4, amount = 6, doubles = false) {

        function getUniqueColors(length, amount, doubles, colors) {

            if (colors.length >= length) return colors;

            color = Math.floor(Math.random() * amount);

            let unique = !doubles ? (colors.indexOf(color) < 0) : colors.indexOf(color, colors.indexOf(color) + 1) < 0;

            if (!unique)
                return getUniqueColors(length, amount, doubles, colors);
            else {
                colors.push(color);
                return getUniqueColors(length, amount, doubles, colors);
            }

        }

        return getUniqueColors(length, amount, doubles, []);
    }

    function checkRow(row, answer) {
        return row.reduce((pegs, color) => {
            if (answer.indexOf(color) === row.indexOf(color)) {
                pegs.push(2);
            } else if (answer.indexOf(color) >= 0) {
                pegs.push(1);
            }
            return pegs;
        }, []);
    }

    var s = Snap("#board");

    function renderRow(row, offset = 0, answers = [], ) {

        // let r = s.rect(0, offset * 50, 50 * (row.length + 1), 50);

        s.image("./pegs/board.png", 0, offset * 50, 350, 50);


        // r.attr("fill", "#424242");
        row.map((color, index) => {
            if (color >= 0) {
                s.image(getColorPegRef(COLORS[color]), (index * 50) + 12.5, offset * 50, 50, 50);
            } else {}
        });

        let keys = answers.map((item) => {
            return item;
        }).sort();
        for (var i = 0; i < keys.length; i++) {
            s.image(getColorPegRef(COLORS[keys[i] + 7]), (row.length * 50) + 15 + ((i % 2 === 0) ? 0 : 25), (offset * 50) + ((i < 2) ? 0 : 25), 25, 25);
        }
    }



    renderRow([1, 1, 1, 1]);

    function renderBoard(rows) {

    }



}();