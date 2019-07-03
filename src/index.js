module.exports = function solveSudoku(matrix) {

    let foundNew;
    let finished;
    let minx, miny, minv;
    do {
        foundNew = false;
        finished = true;
        [minx, miny, minv] = [null, null, null];

        for (let x = 0; x < 9; x++) {
            for (let y = 0; y < 9; y++) {
                if (matrix[x][y] === 0) { // empty
                    const vars = findVariants(matrix, x, y);

                    if (vars.length === 0) {
                        return null;
                    } else if (vars.length === 1) {
                        matrix[x][y] = vars[0];
                        foundNew = true;
                    } else {
                        finished = false;

                        // save field with minimal possible values
                        if (!minv || vars.length < minv.length)
                            [minx, miny, minv] = [x, y, vars];
                    }

                }
            }
        }
    } while (foundNew && !finished);

    if (!finished) {
        // try to solve with possible values
        for (let i = 0; i < minv.length; i++) {
            let v = minv[i];

            let copy = matrix.map(r => [...r]);
            copy[minx][miny] = v;
            let res = solveSudoku(copy);
            if (!!res) return res;
        }
        return null;
    }

    return matrix;
}

function findVariants(matrix, x, y) {
    let vars = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let i = 0; i < 9; i++) {
        // I'm not checking the same field because is't 0
        vars.delete(matrix[x][i]); // row
        vars.delete(matrix[i][y]); // col

        // check in square
        let [leftUpX, leftUpY] = [Math.floor(x / 3) * 3, Math.floor(y / 3) * 3];
        for (let x2 = leftUpX; x2 < leftUpX + 3; x2++)
            for (let y2 = leftUpY; y2 < leftUpY + 3; y2++)
                vars.delete(matrix[x2][y2])
    }
    return Array.from(vars);
}

