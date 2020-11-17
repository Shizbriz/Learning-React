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
                <div classNameName="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div classNameName="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div classNameName="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{ squares: Array(9).fill(null) }],
            stepNumber: 0,
            xIsNext: true
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) { return; }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{ squares: squares }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((stp, move) => {
            const desc = move ?
                'Go to move #' + move : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });
        let status;
        if (winner) { status = 'Winner: ' + winner; }
        else { status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); }
        return (
            <div classNameName="game">
                <div classNameName="game-board">
                    <Board squares={current.squares}
                        onClick={(i) => this.handleClick(i)} />
                </div>
                <div classNameName="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>

            </div>

        );
    }


}

function calculateWinner(squares) {
    const lines = [
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

ReactDOM.render(<Game />, document.getElementById('root'));



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

const Avatar = () => <img src='file:///C:/Users/Shizzy%20Brizzy/Desktop/react/my-app/public/logo192.png' alt="Ma d'aiye mi laamu" />;
const UserName = () => <h4>{prompt('Whats your name?')}</h4>;
const Profile = () =>
    <div>
        <Avatar />
        <UserName />
    </div>;

ReactDOM.render(<Profile />, document.getElementById('root1'));


class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setState({ date: new Date() });
    }
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        );
    }
}
ReactDOM.render(<Clock />, document.getElementById('root2'));


const Application = () =>
    <>
        <Nav />
        <Jumbotron />
        <Toys />
        <Footer />
    </>
const Nav = () => <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
    <div className="container">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                <a className="nav-item nav-link" href="#home">Home
        <span className="sr-only">(current)</span>
                </a>
            </div>
        </div>
    </div>
</nav>

const Jumbotron = () => <div className="jumbotron jumbotron-fluid bg-info text-white">
    <div className="container text-sm-center pt-5">
        <h1 className="display-2">Vumbula Toys</h1>
        <p className="lead">Your one stop toys shop</p>
        <div className="btn-group mt-4" role="group" aria-label="Callout Buttons">
            <button type="button" className="btn btn-primary btn-lg">Order Now</button>
        </div>
    </div>
</div>

const Toys = () => <><h1 id="toys" className="display-4 my-4 text-center text-muted">Toys</h1>
    <div className="row">
        <div className="col-md-6 col-lg-3">
            <div className="card mb-3">
                <img className="card-img-top" src="img/1.png" alt="wahala dey" />
                <div className="card-body">
                    <h4 className="card-title text-center">Toy One</h4>
                    <p className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s.
        </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-3">
            <div className="card mb-3">
                <img className="card-img-top" src="img/2.png" alt="wahala dey" />
                <div className="card-body">
                    <h4 className="card-title text-center">Toy Two</h4>
                    <p className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s.
                         </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-3">
            <div className="card mb-3">
                <img className="card-img-top" src="img/3.png" alt="wahala dey" />
                <div className="card-body">
                    <h4 className="card-title text-center">Toy Three</h4>
                    <p className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s.
                </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-3">
            <div className="card mb-3">
                <img className="card-img-top" src="img/4.png" alt="wahala dey" />
                <div className="card-body">
                    <h4 className="card-title text-center">Toy Four</h4>
                    <p className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s.
        </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-3">
            <div className="card mb-3">
                <img className="card-img-top" src="img/5.png" alt="wahala dey" />
                <div className="card-body">
                    <h4 className="card-title text-center">Toy Five</h4>
                    <p className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s.
        </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-3">
            <div className="card mb-3">
                <img className="card-img-top" src="img/6.png" alt="wahala dey" />
                <div className="card-body">
                    <h4 className="card-title text-center">Toy Six</h4>
                    <p className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s.
        </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-3">
            <div className="card mb-3">
                <img className="card-img-top" src="img/7.png" alt="wahala dey" />
                <div className="card-body">
                    <h4 className="card-title text-center">Toy Seven</h4>
                    <p className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s.
        </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-3">
            <div className="card mb-3">
                <img className="card-img-top" src="img/8.png" alt="wahala dey" />
                <div className="card-body">
                    <h4 className="card-title text-center">Toy Eight</h4>
                    <p className="card-text">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s.
        </p>
                </div>
            </div>
        </div>
    </div>
</>

const Footer = () => <div className="row py-3">
    <div className="col-md-7">
        <ul className="nav">
            <li className="nav-item">
                <a className="nav-link" href="#">Contact Us</a>
            </li>
        </ul>
    </div>
    <div className="col-md text-md-right">
        <small>&copy; Vumbula Kids Shop</small>
    </div>
</div>

ReactDOM.render(<Application />, document.getElementById('root3'));