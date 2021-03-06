import React, {useState} from "react";
import useStyles from "./styles";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import {Line} from 'react-chartjs-2';
import {productHistoryToLineData} from "../../lib/utils/chart-converters";
import {prettyDateTimeString} from "../../lib/utils/date-utils";
import {averagePrice} from "../../lib/utils/stats-utils";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Product = ({product, loading, error, ...props}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleDeleteClickOpen = () => {
        setOpen(true);
    };

    const handleDeleteClose = () => {
        setOpen(false);
    };

    const deleteProduct = () => {
        console.log('Deleting product');
        handleDeleteClose();
    };

    return (
        <div className={classes.root}>
            <div className={classes.heading}>
                <div className={classes.naming}>
                    <div>
                        <h1>
                            {product.name}
                        </h1>
                    </div>
                    <div>
                        &nbsp; from {product.store}
                    </div>
                </div>
                <Button variant="contained" color="primary" href={product.link} target="_blank">
                    OPEN WEB PAGE
                </Button>
            </div>
            <div className={classes.history}>
                <Line
                    data={productHistoryToLineData(product.history)}
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        },
                    }}
                />
            </div>
            <div className={classes.stats}>
                <div className={classes.statsItem}>
                    Current price: <strong>{product.currentPrice.toFixed(2)} {product.currency}</strong>
                </div>
                <div className={classes.statsItem}>
                    Lowest price: <strong>{product.lowestPrice.toFixed(2)} {product.currency}</strong>
                </div>
                <div className={classes.statsItem}>
                    Last check: <strong>{prettyDateTimeString(product.lastUpdateDate)}</strong>
                </div>
                <div className={classes.statsItem}>
                    Average price: <strong>{averagePrice(product.history).toFixed(2)} {product.currency}</strong>
                </div>
                {/*// TODO: Add other stats*/}
            </div>
            <div className={classes.settings}>
                {/*// TODO*/}
            </div>
            <div className={classes.delete}>
                <Button variant="contained" color="primary" className={classes.modifyButton}>
                    MODIFY
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDeleteClickOpen}>
                    DELETE
                </Button>
                <Dialog
                    open={open}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Delete this product?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure wou want to delete this product? This action is irreversible!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDeleteClose} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={deleteProduct} color="primary">
                            DELETE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        product: state.product.product,
        loading: state.product.loading,
        error: state.product.error
    };
};

export default connect(mapStateToProps)(Product);
