var math = require('mathjs');

// we need this matrix for the rotation algorithm
var identityMirror = math.zeros(5);
identityMirror.subset(math.index(0, [4]), 1);
identityMirror.subset(math.index(1, [3]), 1);
identityMirror.subset(math.index(2, [2]), 1);
identityMirror.subset(math.index(3, [1]), 1);
identityMirror.subset(math.index(4, [0]), 1);

// spins a piece using matrix rotation algorithm:
function spin(piece) {
    piece.matrix = math.multiply(math.transpose(piece.matrix), identityMirror);
    /*
  You can rotate a matrix only by applying mathematical operations to it. If you have a matrix, say:

  Mat A = [1,1,1]
          [0,0,1]
          [0,0,0]
  To rotate it, multiply it by its transpose and then by this matrix ([I]dentity [H]orizontaly [M]irrored):

  IHM(A) = [0,0,1]
           [0,1,0]
           [1,0,0]
  Then you'll have:

  Mat Rotation = Trn(A)*IHM(A) = [1,0,0]*[0,0,1] = [0,0,1]
                                 [1,0,0] [0,1,0] = [0,0,1]
                                 [1,1,0] [1,0,0] = [0,1,1]
                                 
  */

    return piece;
}

function detectSpinCollision(piece, board) {

    var spun = math.multiply(math.transpose(piece.matrix), identityMirror);

    var sub = math.subset(board, math.index(math.range(piece.top, piece.top + 5), math.range(piece.left, piece.left + 5)));

    var comp = math.add(math.sign(sub), math.sign(spun));

    var collision = false;

    comp.forEach(function(value, index, matrix) {
        if (value == 2) {
            collision = true;
        }
    });

    return collision;
}

function detectCollision(piece, board, direction) {
    if (direction === 'down') {
        var sub = math.subset(board, math.index(math.range(piece.top + 1, piece.top + 6), math.range(piece.left, piece.left + 5)));
    }
    else if (direction === 'left') {
        var sub = math.subset(board, math.index(math.range(piece.top, piece.top + 5), math.range(piece.left - 1, piece.left + 4)));
    }
    else if (direction === 'right') {
        var sub = math.subset(board, math.index(math.range(piece.top, piece.top + 5), math.range(piece.left + 1, piece.left + 6)));
    }

    //add matrices together and check for 2's which signify a collision
     var comp = math.add(math.sign(sub), math.sign(piece.matrix));

    var collision = false;

    comp.forEach(function(value, index, matrix) {
        if (value == 2) {
            collision = true;
        }
    });

    return collision;
}


module.exports = {
    spin: spin,
    detectCollision: detectCollision,
    detectSpinCollision: detectSpinCollision
};
