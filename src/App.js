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
import Ydetail from './pages/Ydetail';
import Footer from './components/Footer';

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
        <Footer></Footer>
      </Route>
      <div>
        <switch>
          <Route path='/Youtuber' component={Youtuber} exact />
          <Route path='/Editer' component={Editer} exact />
          <Route path='/Thumbnailer' component={Thumbnailer} exact />
          <Route path='/Winwin' component={Winwin} exact />
          <Route path='/Help' component={Help} exact />
          <Route path='/Ydetail/:board_id' component={Ydetail} exact />
        </switch>
      </div>
    </div>
  );
}

export default App;
