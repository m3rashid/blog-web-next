import mongoose from 'mongoose'

const connectDb = async () => {
  if (mongoose.connections[0]) {
    return
  }
  await mongoose.connect('mongodb://localhost:27017/blog')
}

export default connectDb
