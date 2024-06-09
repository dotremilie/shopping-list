'use server'

import itemModel from "@/models/itemModel";
import connectDB from "@/config/database";
import Item from "@/models/Item";

export async function updateItem(item: Item, updatedData: any){
    try {
        await connectDB();
        const updatedItem = await itemModel.findByIdAndUpdate(
            item.id,
            updatedData,
            { new: true, runValidators: true }
        );
        if (updatedItem) {
            console.log('Item updated:', updatedItem);
        } else {
            console.log('Item not found with id:', item.id);
        }
    } catch (err) {
        console.error('Error updating item:', err);
    }
}