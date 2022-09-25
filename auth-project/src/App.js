import './App.css';
import coffee from "./images/coffee.png";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <div className='left-container'>
        <img src={coffee} alt='coffee-png'/>
      </div>
      <div className='right-container'>
        <div className='right-inner-container'>
          <h3>hey there!</h3>
          <h1>Let everyone know what you do</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in mi euismod, dapibus mi et, hendrerit erat. Ut velit justo, posuere eget magna quis, facilisis euismod dolor. Duis sed consectetur arcu.</p>
          <button className='login-button'><Link to="/profile/:fromHomepage"  className='link'>Go to login page</Link></button>
        </div>
      </div>
    </div>
  );
}

export default App;
