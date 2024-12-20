export const getWishlistIdUsingProductId = (productId , wishLists = []) => {
    const item = wishLists.find((wishlist) => wishlist.productId == productId)
    return item?._id || null
}

export const getCartIdUsingProductId = (productId , cartItems = []) => {
    const item = cartItems.find((cart) => cart.productId == productId)
    return item?._id || null
}

export const getSelectedAddress = (addressList = []) => {
    return addressList.find((address) => address.selectStatus == true)
}