export const checkAvailibility = (itemList=[] , product) => {
    const item = itemList.find((item) => item.productId == product._id)
    if(item) return true
    else return false
}