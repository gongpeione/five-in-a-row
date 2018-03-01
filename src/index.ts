import { EventEmitter } from 'events';
import ChessMaster from './Chess/ChessMaster';
import ChessCore from './Chess/ChessCore';
import './index.scss';

// const cm = new ChessMaster();
// (cm as EventEmitter).on('end', (color) => {
//     const r = color === ChessCore.BLACK_STONE ? 'Black' : 'White';
//     alert(`${r} Win!`);
// })

const cm = new ChessMaster({ 
    container: 'div.dom',
});
(cm as EventEmitter).on('end', (color) => {
    const r = color === ChessCore.BLACK_STONE ? 'Black' : 'White';
    alert(`${r} Win!`);
});
document.querySelector('button.dom').addEventListener('click', () => {
    cm.reset();
});
document.querySelector('button.domundo').addEventListener('click', () => {
    cm.undo();
});
document.querySelector('button.domredo').addEventListener('click', () => {
    cm.redo();
});

const cm2 = new ChessMaster({ 
    container: 'div.canvas',
    type: 'canvas' 
});
(cm2 as EventEmitter).on('end', (color) => {
    const r = color === ChessCore.BLACK_STONE ? 'Black' : 'White';
    alert(`${r} Win!`);
});
document.querySelector('button.canvas').addEventListener('click', () => {
    cm2.reset();
});
document.querySelector('button.canvasundo').addEventListener('click', () => {
    cm2.undo();
});
document.querySelector('button.canvasredo').addEventListener('click', () => {
    cm2.redo();
});
