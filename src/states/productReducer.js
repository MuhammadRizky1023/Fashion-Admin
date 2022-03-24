const initialState = {
        products: [],
        categories: [],
        product: {},
        productShow: []
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return {
                ...state,
                productShow: action.payload,
                product: action.payload
            }
        
        
        case 'ADD_PRODUCTS':
            const product = state.product.filter((item) => {
                return  item.id  ===  state.payload ; 
            })
            return {
                ...state,
                product,
            }
        
        case 'FIND_PRODUCT_BY_ID':
            const productById = state.products
            .find(product => String(product.id )=== String(action.payload.id))

            return {
                ...state,
                product: productById
            }
        
        case 'UPDATE_PRODUCT':
            const products = state.products
            const productIndex = products
            .findIndex(
              product => String(product.id) === String(action.payload.id)
            )
    
          if (productIndex >= 0) {
            products[productIndex] = action.payload
          }
    
            return {
                ...state,
                products: products
            }
        
        
        
        case 'DELETE_PRODUCT':
            const newProduct = state.product.filter((product) => {
                return product.id !== state.payload
            })
            return {
                ...state,
                product: newProduct,
                productShowed: newProduct
            }
    
        default:
            return state;
    }
}
