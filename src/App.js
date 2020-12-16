import logo from './logo.svg';
import './App.css';
import Timezone from './components/Timezone'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <Timezone name="America/Buenos_Aires" localTime="11/06/2020 4:35PM" />

      </header>
    </div>
  );
}

export default App;
