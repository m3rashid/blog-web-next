import mongoose from 'mongoose'

const mongoUri =
  process.env.NODE_ENV === 'production'
    ? `mongodb+srv://${process.env.MONGO_USERNAME!}:${process.env
        .MONGO_PASSWORD!}@${process.env
        .MONGO_CLUSTER_NAME!}.2qudl.mongodb.net/${process.env
        .MONGO_DB_NAME!}?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017/blog'

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return
  }
  await mongoose.connect(mongoUri)
}

export default connectDb
