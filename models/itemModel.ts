import { Schema, model, models } from "mongoose";

const itemSchema = new Schema({
    name: {type: String},
    count: {type: Number},
}, { timestamps: true })

const itemModel = models.item || model('item', itemSchema, 'shopping_list');

export default itemModel;