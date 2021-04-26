import React from 'react';
import Logo from './components/Logo';
import Evideo from './components/Evideo';
import Svideo from './components/Svideo';
import Main_Board from './components/Main_Board';
import VideoBox from './components/VideoBox';
import './App.css';

function App() {
  return (
    <div>
      <Logo></Logo>
      <div className='allBoard'>
        <VideoBox></VideoBox>
        <Main_Board></Main_Board>
      </div>
    </div>
  );
}

export default App;
