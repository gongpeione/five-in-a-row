import { EventEmitter } from 'events';
import ChessCore from './ChessCore';
import ChessRenderer from './ChessRenderer';


interface ChesssMasterOption {
    boardSize?: 15 | 19,
    container?: string | HTMLElement,
    type?: 'dom' | 'canvas',
    width?: number,
    height?: number
}

const defaultOpt = {
    boardSize: 19,
    container: document.body,
    type: 'dom',
    width: 500,
    height: 500
}

export default class ChesssMaster extends EventEmitter {

    private core: ChessCore;
    private renderer: ChessRenderer;
    private opt: ChesssMasterOption;

    constructor (opt?: ChesssMasterOption) {
        super();
        this.opt = Object.assign(defaultOpt, opt || {});
        this.core = new ChessCore(this.opt.boardSize);
        this.renderer = new ChessRenderer(
            this.opt.container, 
            this.opt.type, 
            this.opt.boardSize, 
            this.opt.width,
            this.opt.height
        );

        (this.renderer as EventEmitter).on('putting', (position) => {
            this.core.put(position.x, position.y);
        });
        (this.core as EventEmitter).on('put', (params) => {
            (this.renderer as EventEmitter).emit('put', params);
        });
        (this.core as EventEmitter).on('end', (color) => {
            (this as EventEmitter).emit('end', color);
        });
    }

    public reset () {
        this.renderer.drawBoard();
        this.core.initChessBoard();
    }
}