import { userApi } from "./slices/userApi"

export const deleteSingleProductsInStore = ({dispatch , productsId}) => {
    dispatch(userApi.util.updateQueryData("getUserTotalProducts" , undefined , draft => {
        return {
            ...draft,
            data : {
                products : draft.data.products.filter(product => product._id != productsId),
                productsLength : draft.data.products.length - 1
            }
        }
    }))
}