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

export const findProduct = (products = [] , target) => {
    return products.find(product => product._id == target)
}

export function getRandomColor(format = "rgb") {
    // Generate random values
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
  
    // Generate random hue, saturation, and lightness for HSL
    const hue = Math.floor(Math.random() * 361); // 0 to 360
    const saturation = Math.floor(Math.random() * 101); // 0 to 100
    const lightness = Math.floor(Math.random() * 101); // 0 to 100
  
    // Return color based on the specified format
    switch (format.toLowerCase()) {
      case "rgb":
        return `rgb(${red}, ${green}, ${blue})`;
  
      case "hex":
        return `#${red.toString(16).padStart(2, "0")}${green
          .toString(16)
          .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
  
      case "hsl":
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  
      default:
        throw new Error("Invalid format! Choose 'rgb', 'hex', or 'hsl'.");
    }
  }
  

  