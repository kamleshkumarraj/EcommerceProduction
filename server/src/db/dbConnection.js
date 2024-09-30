import mongoose from 'mongoose';

const connectdb = async () =>{
        await mongoose.connect(process.env.MONGODB_URL)
        .then((connect) => console.log(`connection is successfully established on host : ${connect.connection.host} and port : ${connect.connection.port}`))
   
}
export default connectdb;