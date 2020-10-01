const mongoose = require("mongoose"); 

const InitiateDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log("MongoDb connected!")
    } catch (error) {
        console.log(error);
        throw error;
    }
}    

module.exports = InitiateDb;