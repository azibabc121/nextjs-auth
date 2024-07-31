import mongoose from 'mongoose';

export async function connectDb() {
    try {
        mongoose.connect(process.env.DB_URL || "")
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log(`MongoDb connected`)
        })

        connection.on('error', (err) => {
            console.error('MongoDb connection error please make sure db is up and run' + err)
            process.exit() // need some more study onto this 
        })
    } catch (error) {
        console.log("Something went wrong in connecting to db")
        console.log("\n" + error)
    }
}