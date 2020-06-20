import React, {useState} from "react";
import AppBar from '@material-ui/core/AppBar';
import useStyles from "./styles";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Drawer from "@material-ui/core/Drawer";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from "@material-ui/core/List";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import Divider from "@material-ui/core/Divider";

const SideMenu = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDrawerOpenClose = () => {
        setOpen(!open);
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
                        <MenuIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItem button key={'Products'}>
                        <ListItemIcon>
                            <DashboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Products'}/>
                    </ListItem>
                    <ListItem button key={'Settings'}>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Settings'}/>
                    </ListItem>
                    <ListItem button key={'About'}>
                        <ListItemIcon>
                            <InfoIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'About'}/>
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
            </main>
        </div>
    );
};

export default SideMenu;
