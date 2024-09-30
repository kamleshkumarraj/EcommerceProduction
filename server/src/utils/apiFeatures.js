import { query } from "express";

class apiFetures{
    constructor(query , queryStr){
        this.query = query; // query --> productModels.find();
        this.queryStr = queryStr; // queryStr --> sending by client for searching like products name.

    }
    queryUpdater_search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : 'i'
            }
        } : {}
        this.query = this.query.find({...keyword}) // --> here we modified the query.find() method.
        return this;
    }
    queryUpdater_filter(){
        const queryStrCopy = {...this.queryStr}; // --> here we get a object of key value that is send client like category keyword or etc.
        const removeField = ['keyword' , 'limit' , 'page'];

        removeField.filter((key) => delete queryStrCopy[key])
        //now we apply features for filtering rating and price.

        // if we pass direct queryString copy then our filter is perform for price and rating but this filter is work as exact value. but we have to need filtering the according to greater equato or less equalto. then we modified in our queryStringCopy object.

        // after passing the query for filtering the price and rating our queryStrCopy like this : { category: 'Mens', price: { gt: '1200', lt: '1400' } }

        //but we have to need { category: 'Mens', price: { $gt: '1200', $lt: '1400' } }
        //so for doing this type we use regular expression in string adding something.

        let queryString = JSON.stringify(queryStrCopy);
        const updatedQuery = JSON.parse(queryString.replace(/\b(gt|gte|lt|lte)\b/g ,(key) => `$${key}`))
        this.query = this.query.find(updatedQuery)

        return this;
    }
    //now we apply logic for pagination means per page result.
    pagination(productsAmount=5){
        const currPage = this.queryStr.page || 1;
        const skipPage = Number(productsAmount * (currPage-1));
        
        this.query = this.query.limit(productsAmount).skip(skipPage)
        return this;
    }
}

export default apiFetures;