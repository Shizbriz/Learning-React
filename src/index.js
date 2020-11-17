import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square"
            onClick={props.onClick}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)} />);
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
constructor(props){
    super(props);
    this.state={
        history: [{squares: Array(9).fill(null)}],
        stepNumber: 0,
        xIsNext: true
    }
}
handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber+1);
const current = history[history.length-1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i]){return;}
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({ 
        history: history.concat([{squares: squares}]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext });
}
jumpTo(step){
    this.setState({
        stepNumber: step,
        xIsNext: (step % 2)===0,
    })
} 
render() {
        const history = this.state.history;
const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((stp, move) => {
            const desc = move ?
            'Go to move #'+ move: 'Go to game start';
            return(
                <li key ={move}>
                    <button onClick={()=>this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (winner){status = 'Winner: '+winner;}
        else{status = 'Next player: '+(this.state.xIsNext? 'X':'O');}
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} 
                    onClick={(i)=> this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
               
            </div>
            
        );
    }

    
}

function calculateWinner(squares) {
    const lines= [
        [0, 1, 2],
    [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    } return null;
}
// ========================================

ReactDOM.render(<Game />, document.getElementById('root') );



// const name = prompt('What is your name?');
// let formatName = (user) =>{
//     return user.firstName + ' ' + user.lastName;
// }
// const user = {
//     firstName: name,
//     lastName: 'Perez'
// };
// const element = <h1>Hello {formatName(user)}</h1>;
// ReactDOM.render(element, document.getElementById('root1'));



// const Element = props =>{
//     return (
//         <div>
// <h1>Hello {props.cab}, </h1>
//         <h2>{props.gender}</h2>
//         <h3>{props.age}</h3>
//         </div>
        
//     )
// }
// ReactDOM.render(<Element cab={'chevrolet'}
//  gender={'female'} age={'20'}/>, document.getElementById('root1'));

const Avatar =()=> <img src='../public/logo192.png' alt="Ma d'aiye mi laamu"/>;
const UserName =()=> <h4>{prompt('Whats your name?')}</h4>;
const Profile = ()=>
    <div>
        <Avatar />
        <UserName />
    </div>;

ReactDOM.render(<Profile/>,  document.getElementById('root1'))


class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state={date: new Date()};
    }
    componentDidMount(){
        this.timerID=setInterval(()=>this.tick(), 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({date: new Date()});
    }
    render(){
        return (
            <div>
                <h1>Hello world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}


    ReactDOM.render(<Clock />, document.getElementById('root2'));

