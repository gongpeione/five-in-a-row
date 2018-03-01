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
    container: 'main',
    type: 'canvas' 
});
(cm as EventEmitter).on('end', (color) => {
    const r = color === ChessCore.BLACK_STONE ? 'Black' : 'White';
    alert(`${r} Win!`);
});
document.querySelector('button').addEventListener('click', () => {
    cm.reset();
});

console.log(cm);