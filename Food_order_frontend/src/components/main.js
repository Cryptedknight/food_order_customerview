import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Login from './login';
import Menu1 from './menu';
import Landing from './landigpage';
import Signup from './signup';
import Admin from './admin';

const Main= () => (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path ="/login" component={Login} />
        <Route path="/menu" component={Menu1} />
        <Route path="/signup" component={Signup} />
        <Route path="/admin" component={Admin} />
    </Switch>
)

export default Main;