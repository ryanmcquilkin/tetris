var math = require('mathjs');

var template = math.zeros(5, 5);

function createLine() {
    var piece = {};
    piece.id = 8;
    piece.matrix = template;
    piece.matrix.subset(math.index(1, [0, 2]), [0, piece.id]);
    piece.matrix.subset(math.index(2, [0, 2]), [0, piece.id]);
    piece.matrix.subset(math.index(3, [0, 2]), [0, piece.id]);
    piece.matrix.subset(math.index(4, [0, 2]), [0, piece.id]);

    piece.top = 0;
    piece.left = 5;
    return piece;
}

function createZ() {
    var piece = {};
    piece.id = 2;
    piece.matrix = math.zeros(5, 5);
    piece.matrix.subset(math.index(2, [1, 2]), [piece.id, piece.id]);
    piece.matrix.subset(math.index(3, [2, 3]), [piece.id, piece.id]);

    piece.top = 0;
    piece.left = 5;
    return piece;
}

function createS() {
    var piece = {};
    piece.id = 3;
    piece.matrix = math.zeros(5, 5);
    piece.matrix.subset(math.index(3, [2, 1]), [piece.id, piece.id]);
    piece.matrix.subset(math.index(2, [3, 2]), [piece.id, piece.id]);

    piece.top = 0;
    piece.left = 5;
    return piece;
}

function createSq() {
    var piece = {};
    piece.id = 4;
    piece.matrix = math.zeros(5, 5);
    piece.matrix.subset(math.index(2, [2, 3]), [piece.id, piece.id]);
    piece.matrix.subset(math.index(3, [2, 3]), [piece.id, piece.id]);

    piece.top = 0;
    piece.left = 5;
    return piece;
}

function createT() {
    var piece = {};
    piece.id = 5;
    piece.matrix = math.zeros(5, 5);
    //subset command can't do a single value assignment, don't change it, loser.
    piece.matrix.subset(math.index(1, [2, 2]), [piece.id, piece.id]);
    piece.matrix.subset(math.index(2, [1, 2, 3]), [piece.id, piece.id, piece.id]);

    piece.top = 0;
    piece.left = 5;
    return piece;
}

function createL() {
    var piece = {};
    piece.id = 6;
    piece.matrix = math.zeros(5, 5);
    //subset command can't do a single value assignment, don't change it, loser.
    piece.matrix.subset(math.index(2, [1, 2, 3]), [piece.id, piece.id, piece.id]);
    piece.matrix.subset(math.index(3, [1, 1]), [piece.id, piece.id]);


    piece.top = 0;
    piece.left = 5;
    return piece;
}

function createJ() {
    var piece = {};
    piece.id = 7;
    piece.matrix = math.zeros(5, 5);
    piece.matrix.subset(math.index(2, [1, 2, 3]), [piece.id, piece.id, piece.id]);
    piece.matrix.subset(math.index(3, [3, 3]), [piece.id, piece.id]);


    piece.top = 0;
    piece.left = 5;
    return piece;
}

function getNewPiece() {
    var temp = (Math.random() * 7) % 7 | 0;
    switch (temp) {
        case 0:
            return createJ();
        case 1:
            return createL();
        case 2:
            return createSq();
        case 3:
            return createLine();
        case 4:
            return createS();
        case 5:
            return createT();
        case 6:
            return createZ();
    }
}


module.exports = {
    getNewPiece: getNewPiece
};
