import './App.css';
import Timezone from './components/Timezone'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Timezone name="America/Buenos_Aires" localTime="11/06/2020 4:35PM" />
      </header>
    </div>
  );
}

export default App;
