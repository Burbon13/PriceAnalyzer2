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
import {Provider as ReduxProvider} from 'react-redux';
import rootReducer from "./lib/redux";
import thunk from 'redux-thunk';
import {positions, Provider as AlertProvider} from "react-alert";
import AlertMUITemplate from "react-alert-template-mui";

let store = createStore(rootReducer, applyMiddleware(thunk));

const alertOptions = {
    position: positions.MIDDLE
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <ReduxProvider store={store}>
                <AlertProvider template={AlertMUITemplate} {...alertOptions}>
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
                </AlertProvider>
            </ReduxProvider>
        </ThemeProvider>
    );
}

export default App;
