import { EventEmitter } from 'events';
import ChessCore from './ChessCore';

export default class ChessRenderer extends EventEmitter {
    private container: HTMLElement;
    private _type: 'dom' | 'canvas';
    private size: 15 | 19;
    private borad: HTMLCanvasElement | HTMLOListElement;

    constructor (container: string | HTMLElement, type?: 'dom' | 'canvas', size?: 15 | 19) {
        super();
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.type = type || 'dom';
        this.size = size || 19;

        this.initContainer();
        this.render();

        (this as EventEmitter).on('put', ({x, y, color}) => {
            this.put(x, y, color);
        });
    }

    initContainer () {
        if (this.borad) return;
        this.container.classList.add('gee-five-in-a-row');
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
            this.container.addEventListener('click', this.PutEvent);
            this.container.appendChild(this.borad);
        }
    }

    private PutEvent = (e: Event) => {
        if (!(e.target as HTMLElement).dataset.position) return;
        const [x, y] = (e.target as HTMLElement).dataset.position.split(',');
        (this as EventEmitter).emit('putting', {x, y});
    }

    private put (x: number, y: number, color: Symbol) {
        const piece = document.createElement('span');
        piece.classList.add(color === ChessCore.BLACK_STONE ? 'black' : 'white');
        this.container.querySelector(`[data-position="${x},${y}"]`).appendChild(piece);
    }

    get type () {
        return this._type;
    }

    set type (val) {
        this._type = val;
    }

    render (data?) {
        if (this.type === 'dom') {
            // this.domRenderer();
        }
    }

    canvasRenderer (postion, color) {

    }

    domRenderer (postion, color) {

    }
}