import { Schema, model, models } from 'mongoose'

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        required: true,
        min: 0
    },
}, { timestamps: true })

const ItemModel = models.item || model('item', itemSchema, 'shopping_list')

export default ItemModel