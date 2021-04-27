import React from 'react';
import Logo from './components/Logo';
import VideoBox from './components/VideoBox';
import './App.css';
import MainBoard from './components/MainBoard';
import { Route } from 'react-router';
import Youtuber from './pages/Youtuber';
import Editer from './pages/Editer';
import Thumbnailer from './pages/Thumbnailer';
import Winwin from './pages/Winwin';
import Help from './pages/Help';
import Wboard from './components/Wboard';

function App() {
  return (
    <div>
      <Logo></Logo>
      <Route path='/' exact>
        <div className='allBoard'>
          <VideoBox></VideoBox>
          <MainBoard></MainBoard>
          <Wboard></Wboard>
        </div>
      </Route>
      <div>
        <switch>
          <Route exact path='/Youtuber' component={Youtuber} />
          <Route path='/Editer' component={Editer} exact />
          <Route path='/Thumbnailer' component={Thumbnailer} exact />
          <Route path='/Winwin' component={Winwin} exact />
          <Route path='/Help' component={Help} exact />
        </switch>
      </div>
    </div>
  );
}

export default App;
