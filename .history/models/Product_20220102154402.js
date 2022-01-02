import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name: { type: String, require: true },
    slug: { type: String, require: true },
    brand: { type: String, require: true },
    category: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },

})