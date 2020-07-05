import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './lib/theme'
import SideMenu from "./components/SideMenu";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Info from "./pages/Info";
import Product from "./pages/Product";
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from "./lib/redux";
import thunk from 'redux-thunk';

let store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Route render={({location, history}) => (
                        <SideMenu history={history}>
                            <Switch>
                                <Route exact path="/" component={Dashboard}/>
                                <Route exact path="/index" component={Dashboard}/>
                                <Route exact path="/dashboard" component={Dashboard}/>
                                <Route exact path="/settings" component={Settings}/>
                                <Route exact path="/product" component={Product}/>
                                <Route exact path="/info" component={Info}/>
                            </Switch>
                        </SideMenu>
                    )}/>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
