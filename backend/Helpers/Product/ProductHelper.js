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
        console.log(queryCopy);
        removeFields.forEach((value, index) => delete queryCopy[value]);
        console.log(queryCopy);
    }
}


module.exports = ProductHelper;