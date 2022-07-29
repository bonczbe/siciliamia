import './App.css';
import React, { useEffect, useState, useRef} from 'react';
import Search from './components/Search';
import Card from './components/Card';

function App() {
  const [allData, setAllData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const inputRef = useRef();

  const getAll = async () => {
    try {
      let res = await fetch("http://localhost:3008/data");
      let data = await res.json();
      setAllData(data);
    } catch (error) {
      console.log(error);
    }
    inputRef.current.value = '';
    setSearchedData([]);
  }
  useEffect(() => {
    
    getAll();

  }, []);
  

  const searching = async(name)=>{
    try {
      let res = await fetch("http://localhost:3008/api?filter="+name, {method: 'POST'});
      let data = await res.json();
      setSearchedData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const refresh = async()=>{
        try {
          await fetch("http://localhost:3008/refresh");
          getAll();
        } catch (error) {
          console.log(error);
        }
  }
  return (
    <div className="App">
      <nav>
        <Search inputRef={inputRef} search = {searching} text={'Search by API name:'}></Search>
        <button onClick={()=>refresh()}>Fetch all data</button>
        <button onClick={()=>getAll()}>Reset search</button>
      </nav>
      <div className="data">
        {
          (searchedData.length === 0) ?
          allData.map((data) => {
            return <Card key={data._id} values={data}/>
          }):
          searchedData.map((data) => {
            return <Card key={data._id} values={data}/>
          })
        }
      </div>
    </div>
  );
}

export default App;
