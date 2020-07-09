const initialState = {
    // TODO CHANGE
    product: {
        name: 'MacBook PRO 16\'',
        currentPrice: 16000.99,
        lowestPrice: 14500.90,
        currency: 'RON',
        store: 'eMag',
        lastUpdateDate: new Date(),
        link: 'https://www.emag.ro/laptop-apple-macbook-pro-16-touch-bar-procesor-intelr-coretm-i7-2-60-ghz-16gb-512gb-ssd-radeon-pro-5300m-4gb-silver-int-kb-mvvl2ze-a/pd/D48CDGBBM/?ref=smart-history-ml_1_3&provider=rec&recid=rec_51_c8875f4925299e143494213cc7df5b975645da56cdedb4921515d61f4122e8b4_1593965226&scenario_ID=51',
        history: [
            {
                price: 15590.99,
                date: new Date("2020/01/01")
            },
            {
                price: 14500.99,
                date: new Date("2020/01/01")
            },
            {
                price: 16525.50,
                date: new Date("2020/01/04")
            },
            {
                price: 16000.99,
                date: new Date("2020/01/05")
            },
            {
                price: 15590.99,
                date: new Date("2020/01/07")
            },
            {
                price: 12500.99,
                date: new Date("2020/01/10")
            },
            {
                price: 16025.50,
                date: new Date("2020/01/11")
            },
            {
                price: 16300.99,
                date: new Date("2020/01/12")
            },
            {
                price: 15590.99,
                date: new Date("2020/01/14")
            },
            {
                price: 14750.99,
                date: new Date("2020/01/15")
            },
            {
                price: 16225.50,
                date: new Date("2020/01/20")
            },
            {
                price: 16200.99,
                date: new Date("2020/01/21")
            },
            {
                price: 16590.99,
                date: new Date("2020/01/22")
            },
            {
                price: 15500.99,
                date: new Date("2020/01/24")
            },
            {
                price: 16625.50,
                date: new Date("2020/01/25")
            },
            {
                price: 17300.99,
                date: new Date("2020/01/26")
            },
        ]
    },
    loading: false,
    error: null
};

const product = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_PRODUCT':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: action.data.error
            };
        case 'PRODUCT_LOADED':
            return {
                ...state,
                loading: false,
                error: null,
                product: action.data.product
            };
        default:
            return state;
    }
};

export default product;
