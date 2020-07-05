import React from "react";
import useStyles from "./styles";
import {connect} from "react-redux";


const Product = ({product, loading, error, ...props}) => {
    const classes = useStyles();

    return (
        <div>{product.name}</div>
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
