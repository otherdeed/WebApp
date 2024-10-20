import './App.css';
import TopPanel from '../src/components/topPanel/topPanel';
import BottomPanel from '../src/components/bottomPanel/bottomPanel';
import RegistrationWindow from '../src/components/registrationWindow/registrationWindow';

function App() {
  return (
    <div className="App">
      <RegistrationWindow/>
      <TopPanel/>
      <BottomPanel/>
    </div>
  );
}

export default App;
