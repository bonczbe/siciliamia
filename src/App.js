import './App.css';
import React from 'react';
import Search from './components/Search';
import Card from './components/Card';

function App() {
  const searching = (name)=>{
    console.log(name);
  }
  const refresh = ()=>{
    
  }
  return (
    <div className="App">
      <nav>
        <button onClick={()=>refresh}>Refresh database</button>
        <Search search = {searching}></Search>
      </nav>
      <Card/>
    </div>
  );
}

export default App;
