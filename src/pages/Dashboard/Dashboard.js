import React from "react";
import useStyles from "./styles";
import ProductListItem from "../../components/ProductListItem";

let products = [
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
    },
    {
        name: 'DELL D2720DC',
        currentPrice: 2150.99,
        lowestPrice: 1850.00,
        currency: 'RON',
        store: 'eMag',
        lastUpdateDate: new Date()
    },
    {
        name: 'ASUS Zenbook 14',
        currentPrice: 4500.99,
        lowestPrice: 4275.90,
        currency: 'RON',
        store: 'Altex',
        lastUpdateDate: new Date()
    },
    {
        name: 'JBL Charge 4',
        currentPrice: 599.99,
        lowestPrice: 849.90,
        currency: 'RON',
        store: 'eMag',
        lastUpdateDate: new Date()
    }
];
products = products.concat(products);
products = products.concat(products);
products = products.concat(products);
products = products.concat(products);

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {products.map((product, index) => {
                return <ProductListItem product={product} className={classes.item}/>
            })}
        </div>
    );
};

export default Dashboard;
