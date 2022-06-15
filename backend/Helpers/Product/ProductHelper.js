class ProductHelper {
    constructor(query, queryString)
    {
        this.query = query;
        this.queryString = queryString;
    }

    search()
    {
        const keyword = this.queryString.keyword ? {
            name : {
                $regex : this.queryString.keyword,
                $options : "i",
            } 
        } : {};
        
        this.query = this.query.find({...keyword});
        return this;
    }

    filter()
    {
        // If we assign directly queryCopy = this.queryString then it will mutate queryString too.
        const queryCopy = {...this.queryString};
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((value) => delete queryCopy[value]);
        
        // Add $ in start of the keys
        let queryStringify = JSON.stringify(queryCopy);
        queryStringify = queryStringify.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStringify));
        return this;
    }
}


module.exports = ProductHelper;