var canvas = $('#GameBoard');
var board = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [ 1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
    [ 1, 0, 0, 0, 1, 0, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
    [ 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
];
var player = {
    x: 0,
    y: 0
};

function draw(){
    var width = canvas.width();
    var blockSize = width/board.length;
    var ctx = canvas[0].getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="black";
    for(var y = 0; y < board.length; y += 1){
        for(var x = 0; x < board[y].length; x += 1){
            if(board[y][x] === 1){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
            else if(board[y][x] === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "red";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
        }
    }
    ctx.beginPath();
    var half = blockSize/2;
    ctx.fillStyle = "green";
    ctx.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
    ctx.fill();
}

function canMove(x, y){
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] !== 1);
}

$(document).keyup(function(e){
    if ((e.which === 38) && canMove(player.x, player.y-1)) {
        player.y -= 1;
    } else if ((e.which === 40) && canMove(player.x, player.y+1)) {
        player.y += 1;
    } else if ((e.which === 37) && canMove(player.x-1, player.y)) {
        player.x -= 1;
    } else if ((e.which === 39) && canMove(player.x+1, player.y)) {
        player.x += 1;
    }
    draw();
    e.preventDefault();
});

draw();