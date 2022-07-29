import React from 'react'

function Card(props) {
  return (
    <div className="card">
      <h5>API : {props.values.API}</h5>
      <p>Description : {props.values.Description}</p>
      <p> Category : {props.values.Category}</p>
      <a href={props.values.Link}>{props.values.Link}</a>
    </div>
  )
}

export default Card