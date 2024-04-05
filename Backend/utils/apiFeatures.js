class ApiFeatures {
    constructor(query, querystr)  // query ka mathlabm  like Product.find() 
    {                            // querystr= keyword= like we search samosa
        this.query = query;
        this.querystr = querystr;
    }
    search() {
        const keyword = this.querystr.keyword ? {
            name: {
                $regex: this.querystr.keyword, // regular expression
                $options: "i" // i means case insensitive
            }
        }
            : {};
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {
        const queryCopy = { ...this.querystr } // ye sab ojbject hai toh by refernce passs ho rahe hai isliye spread operator use kiya hai
        //removing some fields for category
        const removeFields = ["keyword", "page", "limit"]
        removeFields.forEach(key => delete queryCopy[key])


        // filter for price and  rating
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);//converting gt
        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }
    pagination(resultPerPage)
    {
        const currentPage=Number(this.querystr.page)||1;
        const skip=resultPerPage*(currentPage-1);
        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
    }

}
module.exports = ApiFeatures