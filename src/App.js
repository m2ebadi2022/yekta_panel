import './assets/css/myStyle.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { NewSefaresh } from './pages/newSefaresh';

import { Catalogs } from './pages/catalogs';
import { Nav } from './components/nav';

import { Provider } from 'react-redux';
import { store } from './store';
import { SlideMenu } from './components/SlideMenu';
import CrmFormOdati from './pages/crmFormOdati';
import CrmFormControlKeifi from './pages/crmFormControlKeifi';
import CrmKarshenas from './pages/crmKarshenas';
import { SefareshatSabtShode } from './pages/sefareshatSabtShode';
import { SefareshatEntezar } from './pages/sefareshatEntezar';
import ProfilePage from './pages/ProfilePage';
import NotFound from './pages/notFound';




function App() {




  return (
    <div >
      <Provider store={store} >


        <Router>


          <Nav />
          <SlideMenu />



          <div className="content-body" style={{ minHeight: "788px" }}>
            <div className="container-fluid">

              <Routes>

                {/* <Route path='/' element={<Login />} exact /> */}
                <Route path='/' element={<Home />} exact />
                <Route path='/profilePage' element={<ProfilePage />} exact />
                <Route path='/crmFormOdati' element={<CrmFormOdati />} exact />
                <Route path='/crmFormControlKeifi' element={<CrmFormControlKeifi />} exact />
                <Route path='/crmKarshenas' element={<CrmKarshenas />} exact />

                <Route path='/newsefaresh' element={<NewSefaresh />} exact />
                <Route path='/sefareshatEntezar' element={<SefareshatEntezar />} exact />
                <Route path='/sefareshatSabtShode' element={<SefareshatSabtShode />} exact />

                
                <Route path='/catalogs' element={<Catalogs />} exact />

                <Route path='*' element={<NotFound />} />
              </Routes>


            </div>
          </div>



        </Router>


      </Provider>
    </div>
  );
}

export default App;
