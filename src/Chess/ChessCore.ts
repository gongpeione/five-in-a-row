import { EventEmitter } from 'events';

export default class ChessCore extends EventEmitter {

    static BLACK_STONE = Symbol('BLACK_STONE');
    static WHITE_STONE = Symbol('WHITE_STONE');

    private boradSize: 15 | 19;
    private chessBorad: [Symbol[]] = [] as any;

    private curColor = ChessCore.BLACK_STONE;

    private positionRecord: [[number, number]] = [] as any;
    private HEAD = -1;

    private end = false;

    constructor (size?: 15 | 19) {
        super();
        this.boradSize = size || 19;
        this.initChessBoard();
    }

    put (x: number, y: number) {
        if (this.end) {
            return;
        }
        if (this.chessBorad[x][y] === undefined) {
            throw new Error('Wrong position.');
        }
        if (this.HEAD < (this.positionRecord.length - 1)) {
            this.positionRecord = this.positionRecord.slice(0, this.HEAD + 1) as any;
        }
        // console.log(x,y,this.positionRecord,this.chessBorad[x][y]);
        if (this.positionRecord.some(([mx, my]) => mx == x && my == y )) {
            return;
        }
        // if (
        //     this.chessBorad[x][y] !== null
        // ) {
        //     return;
        // }
        this.chessBorad[x][y] = this.curColor;
        (this as EventEmitter).emit('put', {x, y, color: this.curColor});
        this.positionRecord.push([+x, +y]);
        this.HEAD++;
        
        this.checkResult();
        this.changeColor();
    }

    remove (x: number, y: number) {
        if (this.pointExistAndRet(x, y)) {
            this.chessBorad[x][y] = null;
            (this as EventEmitter).emit('remove', {x, y});
        }
    }

    private changeColor () {
        this.curColor = this.curColor === ChessCore.BLACK_STONE ? 
                            ChessCore.WHITE_STONE : 
                            ChessCore.BLACK_STONE;
    }

    get lastPosition () {
        return this.positionRecord[this.positionRecord.length - 1];
    }

    public undo () {
        if (this.HEAD === -1) {
            return;
        }
        
        (this as EventEmitter).emit('undo', {
            x: this.positionRecord[this.HEAD][0],
            y: this.positionRecord[this.HEAD][1],
            color: this.curColor
        });
        // this.positionRecord[this.HEAD] = null;
        this.HEAD >= 0 && this.HEAD--;
        this.end = false;
        this.changeColor();
    }

    public redo () {
        if (this.HEAD >= this.positionRecord.length - 1) {
            return;
        }
        // this.checkResult();
        (this as EventEmitter).emit('redo', {
            x: this.positionRecord[this.HEAD + 1][0],
            y: this.positionRecord[this.HEAD + 1][1],
            color: this.curColor
        });
        this.HEAD < this.positionRecord.length - 1 && this.HEAD++;
        this.changeColor();
    }

    initChessBoard () {
        this.end = false;
        this.curColor = ChessCore.BLACK_STONE;
        this.chessBorad = [] as any;
        this.positionRecord = [] as any;
        this.HEAD = -1;
        for (let i = 0; i < this.boradSize; i++) {
            this.chessBorad.push([...Array(this.boradSize).fill(null)]);
        }
        console.log(this.chessBorad);
    }

    private pointExistAndRet (x, y) {
        // if point not exist in range of positoRecord restricted by HEAD
        // console.log(this.positionRecord.slice(0, this.HEAD + 1));
        if (
            !this.positionRecord.slice(0, this.HEAD + 1).some(([mx, my]) => mx === x && my === y)
        ) {
            return;
        }
        if (
            x >= 0 &&
            x <= this.boradSize - 1 &&
            y >= 0 &&
            y <= this.boradSize - 1 &&
            this.chessBorad[x][y]
        ) {
            return this.chessBorad[x][y];
        }

        return;
    }

    checkResult () {
        const resultArr: number[] = Array(4).fill(0);
        const [x, y] = this.lastPosition;
        for (let i = 1; i <= 5; i++) {
            this.pointExistAndRet(x + i, y) === this.curColor && resultArr[0]++;
            this.pointExistAndRet(x - i, y) === this.curColor && resultArr[0]++;
            this.pointExistAndRet(x, y + i) === this.curColor && resultArr[1]++;
            this.pointExistAndRet(x, y - i) === this.curColor && resultArr[1]++;
            this.pointExistAndRet(x + i, y + i) === this.curColor && resultArr[2]++;
            this.pointExistAndRet(x - i, y - i) === this.curColor && resultArr[2]++;
            this.pointExistAndRet(x + i, y - i) === this.curColor && resultArr[3]++;
            this.pointExistAndRet(x - i, y + i) === this.curColor && resultArr[3]++;
        }
        if (resultArr.some(n => n >= 4)) {
            this.end = true;
            (this as EventEmitter).emit('end', this.curColor);
        }
    }
}