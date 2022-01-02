import nc from "next-connect"
import data from "../../utils/data"
import Product from "../../models/Product"
import db from '../../utils/db'

const handler = async (req, res) {
    await db.connect();
    await Product.deleteMany()
    await Product.insertMany(data)
    await db.disconnect()

    res.send({ message: "Seeded succesfully" })
}

export default handler;