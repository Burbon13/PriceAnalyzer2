import React from "react"
import useStyles from "./styles";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {prettyDateTimeString} from '../../lib/utils/date-utils'

const ProductListItem = ({product}) => {
    const classes = useStyles();

    const onManageClicked = () => {

    };

    return (
        <Paper variant={"outlined"} className={classes.root}>
            <div className={classes.item}>
                <strong>
                    {product.name}
                </strong>
            </div>
            <Paper variant={"outlined"} className={classes.item}>
                Current price: {product.currentPrice} {product.currency}
            </Paper>
            <Paper variant={"outlined"} className={classes.item}>
                Lowest price: {product.lowestPrice} {product.currency}
            </Paper>
            <Paper variant={"outlined"} className={classes.item}>
                {prettyDateTimeString(product.lastUpdateDate)}
            </Paper>
            <Paper variant={"outlined"} className={classes.item}>
                {product.store}
            </Paper>
            <Button variant="outlined" color={"secondary"} className={classes.manageButton}>
                Manage
            </Button>
        </Paper>
    );
};

export default ProductListItem;
