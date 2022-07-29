import React, { useState } from 'react'

function Search(props) {
    const [name, setName] = useState("");
  return (
    <div>
        Search by API name: 
        <input type='text' placeholder='Search' required onChange={(e)=> setName(e.target.value)}></input>
        <button type='submit' onClick={()=>props.search(name)}>Search</button>
    </div>
  )
}

export default Search