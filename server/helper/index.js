/**
 * It takes a user object and returns a new object with only the properties we want to expose to the
 * client
 * @param data - The data that you want to convert to JSON.
 * @returns An object with the following properties:
 * id, firstName, lastName, gender, phone, email, homeNumber, address, state, isSendNews, question,
 * dateOfBirth
 */
export const customerJsonReponse = (data) => {
    if (!data) return
    return {
        id: data._id || data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        phone: data.phone,
        email: data.email,
        homeNumber: data.homeNumber,
        address: data.address,
        state: data.state,
        isSendNews: data.isSendNews,
        question: data.question,
        dateOfBirth: data.dateOfBirth
    }
}

/**
 * It takes a data object and returns a new object with the same properties but with different names
 * @param data - The data object that is passed to the function.
 */
export const customerCreateUpdateJson = (data) => {
    if (!data) return
    return {
        _id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        homeNumber: data.homeNumber,
        address: data.address,
        state: data.state,
        email: data.email,
        password: data.password,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth
    }
}

/**
 * It takes a user object and returns a new object with only the properties we want to expose to the
 * client
 * @param data - The data that you want to convert to JSON.
 * @returns An object with the following properties:
 * id, firstName, lastName, gender, phone, email, homeNumber, address, state, isSendNews, question,
 * dateOfBirth
 */
export const supplierJsonReponse = (data) => {
    if (!data) return
    return {
        id: data._id || data.id,
        companyName: data.companyName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        state: data.state,
        password: data.password,
        products: data.products
    }
}

/**
 * It takes a data object and returns a new object with the same properties but with different names
 * @param data - The data object that is passed to the function.
 */
export const supplierCreateUpdateJson = (data) => {
    if (!data) return
    return {
        _id: data.id,
        companyName: data.companyName,
        address: data.address,
        state: data.state,
        email: data.email,
        password: data.password,
        phone: data.phone,
        products: data.products
    }
}

export const productMappingJson = (data) => {
    if (!data) return
    return {
        _id: data.id,
        productName: data.productName,
        supplierId: data.supplierId,
        purchasePrice: data.purchasePrice,
        salePrice: data.salePrice,
        imageUrl: data.imageUrl,
        description: data.description
    }
}

export const productResponse = (data) => {
    if (!data) return
    return {
        id: data._id || data.id,
        productName: data.productName,
        supplierId: data.supplierId,
        purchasePrice: data.purchasePrice,
        salePrice: data.salePrice,
        imageUrl: data.imageUrl,
        description: data.description
    }
}

export const returnPurchaseJson = (data) => {
    if (!data) return
    return {
        id: data._id,
        customerId: data.customerId,
        purchaseDate: data.purchaseDate,
        totalAmount: data.totalAmount,
        orders: data.orders
    }
}

export const returnSaleJson = (data) => {
    if (!data) return
    return {
        id: data._id,
        supplierId: data.supplierId,
        saleDate: data.saleDate,
        totalAmount: data.totalAmount,
        orders: data.orders
    }
}