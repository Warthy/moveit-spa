
import './App.css';
import Home from'./Home';
import Connexion from './Connexion'
import Inscription from './Inscription'
import AddActivities from './AddActivities'
import Profil from './Profil'
import HomeLogged from './HomeLogged'
import EmploiDuTemps from './EmploiDuTemps'
import ActivityUser from './ActivityUser'
import ActivityId from './ActivityId';
import UserId from './UserID';
import Page404 from './Page404';
import {BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

import AuthService from "./service/auth.service";

let token=false;
function App() {

 
  const authentifié = localStorage.getItem('user');
  if(authentifié){
    AuthService.getCurrentUser()
    token=true;
  }else{
    token=false;
  
  }
  return (
    <div className="App">
    
      <Router>

        <Switch>
     
      <Route path="/" exact component={Home}/>
      <Route path="/connexion" exact component={Connexion}/>
      <Route path="/inscription" exact component={Inscription}/>
      <Route path="/addActivities"render={()=>(token ? (<Route component={AddActivities} />) : 
      (<Redirect to='/' />))}/>
      <Route path="/profil" render={()=>(token ? (<Route component={Profil} />) :
      (<Redirect to='/' />))}/>
  <Route path="/home/:id" exact component={HomeLogged} />
      <Route  path="/Home" render={()=>(token ? (<Route component={HomeLogged} />) :
      (<Redirect to='/' />))}/>

      <Route path="/activityUser" render ={()=>(token ? (<Route component={ActivityUser} />):
      (<Redirect to='/' />))}/>
      
    
      <Route path="/emploi" render={()=>(token ? (<Route component={EmploiDuTemps} />):
      (<Redirect to='/' />))}/>
      <Route path="/activity/:id" component={ActivityId} />

      <Route path="/user/:id" component={UserId} />
      <Route path="/friend/:id" component={UserId} />
      <Route component={Page404} />


      </Switch>
      </Router>

     </div>
  );
}

export default App;
