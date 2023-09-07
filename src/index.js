import React from 'react';
import { Router, HashRouter } from 'react-router-dom';
import { render } from 'react-dom';

import { history } from './_helpers';
import { accountService } from './_services';

// Note: Needed for GH Pages !
// When build / deploy at GitHub Pages + Action have to be like below !
import { App } from './app/Index.jsx';

// Note: Using an Alias in Webpack
import 'styles/index.scss';

// Note: Give a wake up ping to the server ( at Azure ) from the idle mode and get the response value "hello" in x.message !
accountService.pingServer()
 .then( pong => {
	  
	  // Take a look at the Crome Developer Console 
	  console.log( 'INDEX => Pong from the Node Server: ' + pong.message );
	 });

// Starting the App  !
startApp(); 

 // Note: Needed for GH Pages !
 // HashRouter is needed for browser refresh / 404
function startApp() { 
    render(
         <HashRouter basename='/'>
            <App />
          </HashRouter>,
        document.getElementById('app')
    );
}

// Note: Before npm run build the statement module.hot.accept(); could / should to be disabled / comment out !!!
// In Webpck HotModuleReplacementPlugin() is used to set hot to true. 
// This way the browser dont need to reload the entire page when changing  file !// Note: Needed here - in contrast to Vue.js  !!

// Note: Needed to be disabled for GH Pages !
//if (module.hot) {
//  module.hot.accept();
// }


