const mongoose = require('mongoose')
const connectToDB = async (url) =>{
    try{
        const conn = await mongoose.connect(url);
        console.log(`Connected to the ${conn.connection.db.databaseName} database...`)
    }catch(err){
        console.error(err);
    }
}

module.exports = connectToDB;