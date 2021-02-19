import './App.css';
import MemeForm from './components/MemeForm';
import Stream from './components/Stream';

function App() {
  return (
    <div className="App">
      <div className="MemeForm">
        <MemeForm />
      </div>
      <hr/>
      <div className="Stream">
        <Stream/>
      </div>
    </div>
  );
}

export default App;
