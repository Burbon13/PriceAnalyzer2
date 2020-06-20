import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './lib/theme'
import SideMenu from "./components/SideMenu";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SideMenu/>
        </ThemeProvider>
    );
}

export default App;
