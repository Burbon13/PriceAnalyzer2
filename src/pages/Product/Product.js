import React from "react";
import useStyles from "./styles";
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import {Line} from 'react-chartjs-2';
import {productHistoryToLineData} from "../../lib/utils/chart-converters";
import {prettyDateTimeString} from "../../lib/utils/date-utils";
import {averagePrice} from "../../lib/utils/stats-utils";
import {useAlert} from "react-alert";

const Product = ({product, loading, error, ...props}) => {
    const classes = useStyles();
    const alert = useAlert();

    const handleDelete = () => {
        alert.show("Are you sure you want to delete?", {
            title: "DELETE ACTION!",
            type: "Info",
            actions: [
                {
                    copy: "Delete",
                    onClick: () => {

                    }
                },
                {
                    copy: "Cancel",
                    onClick: () => {

                    }
                },
            ]
        });
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
                    onClick={handleDelete}>
                    DELETE
                </Button>
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
