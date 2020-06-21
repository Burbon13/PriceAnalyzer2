import React from "react";
import useStyles from "./styles";
import ProductListItem from "../../components/ProductListItem";

const products = [
    {
        name: 'iPhone',
        currentPrice: 3899.99,
        lowestPrice: 3599.90,
        currency: 'RON',
        store: 'eMag',
        lastUpdateDate: new Date()
    },
    {
        name: 'Sony XMH3000',
        currentPrice: 1600.99,
        lowestPrice: 1450.90,
        currency: 'RON',
        store: 'Altex',
        lastUpdateDate: new Date()
    },
    {
        name: 'MacBook Pro 16',
        currentPrice: 16900.99,
        lowestPrice: 14500.90,
        currency: 'RON',
        store: 'eMag',
        lastUpdateDate: new Date()
    }
]

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div>
            {products.map((product, index) => {
                return <ProductListItem product={product}/>
            })}
        </div>
    );
};

export default Dashboard;
