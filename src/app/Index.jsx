import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import { Nav, PrivateRoute, Alert } from '@/_components';
import { Home } from '@/home';
import { Profile } from '@/profile';
import { Admin } from '@/admin';
import { Account } from '@/account';

// Note: That did NOT works at GH Pages + Actions !
//import { AboutPage } from '@/AboutPage';
//import { MyInfoPage } from '@/MyInfoPage';
//import { ErrorPage } from '@/ErrorPage';

// Note: That DID works at GH Pages + Actions !
import { AboutPage } from '@/aboutpage/AboutPage.jsx';
import { MyInfoPage } from '@/myinfopage/MyInfoPage.jsx';
import { ErrorPage } from '@/errorpage/ErrorPage.jsx';

function App() {
    const { pathname } = useLocation();  
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
	   return subscription.unsubscribe;
	  
    }, []);

    return (
        <div className={'app-container' + (user && ' bg-light')}>
            <Nav />
            <Alert />
            <Switch>
            
                <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
               
                <PrivateRoute exact path="/" component={Home} />

                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/admin" roles={[Role.Admin]} component={Admin} />
                
                <Route path="/account" component={Account} />
                
                <Route exact path="/gh-pages-react-node-orm-test" component={AboutPage} />
                <Route exact path="/foo" component={AboutPage} />

                <Route exact path="/about" component={AboutPage} />
                
				<Route exact path="/persteenolsen" component={MyInfoPage} />
				
				<Route path="*" component={ErrorPage} />

				
            </Switch>
        </div>
    );
}

export { App }; 