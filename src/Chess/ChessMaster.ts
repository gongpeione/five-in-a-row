import { EventEmitter } from 'events';
import ChessCore from './ChessCore';
import ChessRenderer from './ChessRenderer';


interface ChesssMasterOption {
    boardSize?: 15 | 19,
    container?: string | HTMLElement
}

const defaultOpt = {
    boardSize: 19,
    container: document.body
}

export default class ChesssMaster {

    private core: ChessCore;
    private renderer: ChessRenderer;
    private opt: ChesssMasterOption;

    constructor (opt?: ChesssMasterOption) {
        this.opt = Object.assign(defaultOpt, opt || {});
        this.core = new ChessCore(this.opt.boardSize);
        this.renderer = new ChessRenderer(this.opt.container);

        (this.renderer as EventEmitter).on('putting', (position) => {
            this.core.put(position.x, position.y);
        });
        (this.core as EventEmitter).on('put', (params) => {
            (this.renderer as EventEmitter).emit('put', params);
        });
    }
}