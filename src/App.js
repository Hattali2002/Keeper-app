import './App.css';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState('');
  const [keeper, setKeeper] = useState([]); // Use state to manage the notes

  useEffect(() => {
    const storedKeeper = JSON.parse(localStorage.getItem('keeper'));
    if (storedKeeper) {
      setKeeper(storedKeeper);
    }
  }, []);

  const onChangeHandler = (event) => {
    setData(event.target.value);
  };
  
  const submit = () => {
    const updatedKeeper = [...keeper, data]; // Create a new array with the updated data
    localStorage.setItem('keeper', JSON.stringify(updatedKeeper)); 
    setKeeper(updatedKeeper); // Update the state
    setData('');
  };
  const filter = (trash) => {
    const updatedKeeper = keeper.filter(element=>element !== trash); 
    localStorage.setItem('keeper', JSON.stringify(updatedKeeper)); 
    setKeeper(updatedKeeper);  
  };
  
  return (
    <>
      <div className="heading p-1">
        <i className="fa-solid fa-crown mx-4"></i>
        <h1>Keeper</h1>
      </div>
      <div className="add-icon my-5">
        <textarea
          id="w3review"
          name="w3review"
          rows="4"
          cols="50"
          value={data}
          onChange={onChangeHandler}
        />
        <button onClick={submit} className='add'>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      <div className="content container">
        <div className="row">
        {keeper.map((element, index) => ( 
          <div className="col md-4 add-icon my-3 " key={index}>
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="30"
            value={element}
            onChange={onChangeHandler}
          />
          <button className='trash add'  onClick={()=>{filter(element)}}>
          <i className="fa-solid fa-trash"></i>
          </button>
        </div>
        ))}
        </div>
      </div>
    </>
  );
}
