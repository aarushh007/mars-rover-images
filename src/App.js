import { useEffect, useState } from 'react';
import './App.css';
const request = require('request');

function App() {
  const [images, setImages] = useState();
  const [loading, setLoading] = useState(true);
  const [none, setNone] = useState(true);
  const [wrongYear, setWrongYear] = useState(false);
  useEffect(()=>{
    request('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=UMg7tot4UoRptcQu3YOj9YfikRUELBuYcQZciDxK', {json: true}, (err, res, body) => {
      if(err){console.log(err);return}
      setImages(body.photos)
    })
    setLoading(false);
  },[])
  useEffect(()=>{
    if(images){
      if(images.length == 0){
        if(!loading){
          document.querySelector('#no_photos').innerText = 'no photos were taken on this date bruh. choose another date';
          setNone(true);
        }
      } else {
        document.querySelector('#no_photos').innerText = '';
        setNone(false);
      }
    }
  })
  const search = () => {
    if (document.querySelector('#date').value === date) return;
    if(document.querySelector('#date').value){
      if (parseInt(document.querySelector('#date').value.slice(0, 4)) > 2012){
      setWrongYear(false);
      document.querySelector('#no_photos').innerText = '';
      setImages([])
      setLoading(true);
      request(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${document.querySelector('#date').value}&api_key=UMg7tot4UoRptcQu3YOj9YfikRUELBuYcQZciDxK`, {json: true}, (err, res, body) => {
      if(err){console.log(err);return}
      setLoading(false);
      setImages(body.photos)
      setDate(document.querySelector('#date').value)
    })
    } else {
      setWrongYear(true);
    }}
  }
  const [date, setDate] = useState('2015-06-03');
  return (
    <div className="App">
      <p id='copyright'>Website created by Aarush 2021©</p>
      <div className="search">
        <div className="stuff">
          <h1>Search for Curiosity Rover images</h1>
          <p>Click the calendar icon to choose date or type it in.</p>
          <p>(hint: The Rover only started taking photos at the start of 2013)</p>
        <input className='form-control' id='date' type='date' max='2021-03-25' min='2013-01-01' />
        {wrongYear && <p>Rover did not take photos in this year</p>}
        <button className='btn btn-primary btn-lg' onClick={search}>Search</button>
        </div>
      </div>
      <div className="results">
      {!loading && <h2 id='results-date'>Showing results for {date}</h2>}
      {(!loading && !none) && <p id='scroll'>Scroll down to see more <i class="fas fa-caret-down"></i></p>}
      {loading && <p id='loading'>loading...</p>}
      <p id='no_photos'></p>
      {images && images.map(img => {
        return (
          <div className="img">
            <img src={img.img_src} alt='img' />
            <p>{img.camera.full_name}</p>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
