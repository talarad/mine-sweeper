export function initGame() {
    const table = [16];
    let bombs = 51, row, column, counter = 0;

    for (let i = 0; i < 16; i++) {
        table[i] = new Array(16);
    }

    while (bombs > 0) {
        row = Math.floor(Math.random() * 16);
        column = Math.floor(Math.random() * 16);
        if (table[row][column] !== 'X') {
            table[row][column] = 'X';
            bombs--;
        }
    }

    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            for (let k = i - 1; k <= i + 1; k++) {
                for (let n = j - 1; n <= j + 1; n++) {
                    if (table[k] !== undefined && table[k][n] !== undefined && table[k][n] === 'X') {

                        counter++;
                    }
                }
            }

            if (table[i][j] !== 'X' && counter !== 0) {
                table[i][j] = counter;
            }
            if (counter === 0) {
                table[i][j] = '';
            }

            counter = 0;
        }
    }

    return table;
}