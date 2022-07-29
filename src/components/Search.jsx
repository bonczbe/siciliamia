import React, { useState } from 'react'

function Search(props) {
    const [name, setName] = useState("");
  return (
    <div className='search'>
        <span>{props.text} </span>
        <input ref={props.inputRef} type='text' placeholder='Search' required onChange={(e)=> setName(e.target.value)}></input>
        <button type='submit' onClick={()=>{props.search(name)}}>Search</button>
    </div>
  )
}

export default Search