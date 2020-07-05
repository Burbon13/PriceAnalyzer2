const initialState = {
    // TODO CHANGE
    product: {
        name: 'MacBook PRO 16\'',
        currentPrice: 16000.99,
        lowestPrice: 14500.90,
        currency: 'RON',
        store: 'eMag',
        lastUpdateDate: new Date(),
        history: []
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
