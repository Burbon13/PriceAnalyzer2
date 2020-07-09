import React from "react"
import useStyles from "./styles";
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import {prettyDateTimeString} from '../../lib/utils/date-utils'
import { useHistory } from 'react-router-dom';

const ProductListItem = ({product, ...props}) => {
    const classes = useStyles();
    const history = useHistory();

    const onManageClicked = () => {
        history.push('/product');
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
            <Button
                variant="outlined"
                color={"secondary"}
                className={classes.manageButton}
                onClick={onManageClicked}>
                Manage
            </Button>
        </Paper>
    );
};

export default ProductListItem;
