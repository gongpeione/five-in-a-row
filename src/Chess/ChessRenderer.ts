import { EventEmitter } from 'events';
import ChessCore from './ChessCore';

export default class ChessRenderer extends EventEmitter {
    private container: HTMLElement;
    private _type: 'dom' | 'canvas';
    private size: 15 | 19;
    private width: number;
    private height: number;
    private borad: HTMLCanvasElement | HTMLOListElement;
    private ctx: CanvasRenderingContext2D;
    private dpi = window.devicePixelRatio || 1;

    constructor (
        container: string | HTMLElement, 
        type?: 'dom' | 'canvas', 
        size?: 15 | 19, 
        width?: number, 
        height?: number
    ) {
        super();
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.type = type.toLowerCase() as any || 'dom';
        this.size = size || 19;
        this.width = width * this.dpi || 500;
        this.height = height * this.dpi || 500;

        this.initContainer();
        // this.render();

        (this as EventEmitter).on('put', ({x, y, color}) => {
            this.put(x, y, color);
        });
    }

    initContainer () {
        if (this.borad) return;
        this.container.classList.add('gee-five-in-a-row');
        
        this.drawBoard();

        this.container.addEventListener('click', this.PutEvent);
        this.container.appendChild(this.borad);
    }

    drawBoard () {
        if (this.type === 'dom') {
            this.borad = document.createElement('ol');
            for (let i = 0; i < this.size; i++) {
                const li = document.createElement('li');
                const ol = document.createElement('ol');
                li.classList.add('row');
                ol.classList.add('row');
                for (let j = 0; j < this.size; j++) {
                    const piece = document.createElement('li');
                    piece.dataset.position = `${i},${j}`;
                    ol.appendChild(piece);
                }
                li.appendChild(ol);
                this.borad.appendChild(li);
            }
            this.container.innerHTML = '';
        } else {
            this.borad = this.borad as HTMLCanvasElement || document.createElement('canvas');
            this.ctx = this.ctx || this.borad.getContext('2d');
            this.borad.width = this.width;
            this.borad.height = this.height;
            this.borad.style.width = (this.width / this.dpi) + 'px';
            this.borad.style.height = (this.height / this.dpi) + 'px';

            const blockSize = this.width / this.size;
            const padding = blockSize / 2;

            this.ctx.beginPath();
            for (let i = 0; i < this.size; i++) {
                this.ctx.moveTo(blockSize * i + padding, padding);
                this.ctx.lineTo(blockSize * i + padding, padding + blockSize * (this.size - 1));
            }
            for (let i = 0; i < this.size; i++) {
                this.ctx.moveTo(padding, blockSize * i + padding);
                this.ctx.lineTo(padding + blockSize * (this.size - 1), blockSize * i + padding);
            }
            this.ctx.stroke();
        }
    }

    private PutEvent = (e: Event) => {
        if (this.type === 'dom') {
            if (!(e.target as HTMLElement).dataset.position) return;
            const [x, y] = (e.target as HTMLElement).dataset.position.split(',');
            (this as EventEmitter).emit('putting', {x, y});
        }
        if (this.type === 'canvas') {
            const blockSize = this.width / this.size;
            const padding = blockSize / 2;
            const { offsetX, offsetY } = e as MouseEvent;
            const x = ~~(offsetX * this.dpi / blockSize);
            const y = ~~(offsetY * this.dpi / blockSize);
            (this as EventEmitter).emit('putting', {x, y});
        }
    }

    private put (x: number, y: number, color: Symbol) {
        if (this.type === 'dom') {
            const piece = document.createElement('span');
            piece.classList.add(color === ChessCore.BLACK_STONE ? 'black' : 'white');
            this.container.querySelector(`[data-position="${x},${y}"]`).appendChild(piece);
        }
        if (this.type === 'canvas') {
            const blockSize = this.width / this.size;
            const padding = blockSize / 2;
            const pieceColor = color === ChessCore.BLACK_STONE ? '#000' : '#fff';
            const ctx = this.ctx;
            ctx.fillStyle = pieceColor;
            ctx.shadowColor = 'rgba(0,0,0,.5)';
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(
                x * blockSize + padding, 
                y * blockSize + padding, 
                (blockSize / 1.1) / 2, 
                0, 
                Math.PI * 2, 
                true
            );
            ctx.closePath();
            ctx.fill();
        }
    }

    get type () {
        return this._type;
    }

    set type (val) {
        this._type = val;
    }

    // render (data?) {
    //     if (this.type === 'dom') {
    //         // this.domRenderer();
    //     }
    // }

    // canvasRenderer (postion, color) {

    // }

    // domRenderer (postion, color) {

    // }
}