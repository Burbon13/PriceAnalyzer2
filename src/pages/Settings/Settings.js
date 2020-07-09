import React from "react";
import useStyles from "./styles";
import Button from "@material-ui/core/Button";
import {getLatestProductDetails} from "../../lib/html-analytics/analytics";

const Settings = () => {
    const classes = useStyles();

    return (
        <div>
            Settings
            <Button onClick={() => {
                getLatestProductDetails();
            }}>
                TEST
            </Button>
        </div>
    );
};

export default Settings;
