import React, {useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import useStyles from "./styles";
import clsx from 'clsx';
import Drawer from "@material-ui/core/Drawer";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from "@material-ui/core/List";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import Divider from "@material-ui/core/Divider";

const SideMenu = ({history, ...props}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpenClose = () => {
        setOpen(!open);
    };

    const changePage = (page) => {
        history.push(page)
    };

    return (
        <div className={classes.root}>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerOpenClose}>
                        <MenuIcon color="primary"/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button key={'Products'} onClick={() => changePage('/dashboard')}>
                        <ListItemIcon>
                            <DashboardIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary={'Products'}/>
                    </ListItem>
                    <ListItem button key={'Settings'} onClick={() => changePage('/settings')}>
                        <ListItemIcon>
                            <SettingsIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary={'Settings'}/>
                    </ListItem>
                    <ListItem button key={'About'} onClick={() => changePage('/info')}>
                        <ListItemIcon>
                            <InfoIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText primary={'About'}/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <Container>
                    {props.children}
                </Container>
            </main>
        </div>
    );
};

export default SideMenu;
