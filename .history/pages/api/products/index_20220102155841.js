import nc from "next-connect"
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
    await db.connect()
    await Product.find({})
})

export default handler