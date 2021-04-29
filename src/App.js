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
import SignUp1 from './pages/SignUp/SignUp1';
import { withRouter } from 'react-router';
import Navi from './components/Navi';
import YoutuberProfile from './pages/YoutuberProfile';
import Yregister from './pages/Yregister';
import Switch from 'react-bootstrap/Switch';

const exceptArray = [
  '/SignUp1',
  '/SignUp1/Required',
  '/SignUp1/NonRequired'
]

function App({ location }) {
  return (
    <div>
      <Navi></Navi>
      {exceptArray.indexOf(location.pathname) < 0 && <Logo />}
      <Route path='/' exact>
        <div className='allBoard'>
          <VideoBox></VideoBox>
          <MainBoard></MainBoard>
          <Wboard></Wboard>
        </div>
        <Footer></Footer>
      </Route>
      <div>
        <Switch>
          <Route path='/Youtuber' component={Youtuber} />
          <Route path='/Editer' component={Editer} />
          <Route path='/Thumbnailer' component={Thumbnailer} />
          <Route path='/Winwin' component={Winwin} />
          <Route path='/Help' component={Help} />
          <Route path='/Ydetail/:board_id' component={Ydetail} />
          <Route path='/SignUp1' component={SignUp1} />
          <Route path='/YoutuberProfile' component={YoutuberProfile} />
          <Route path='/Yregister' component={Yregister} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
