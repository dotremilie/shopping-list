'use server'

import ItemModel from '@/models/ItemModel'
import connectDB from '@/config/database'
import Item from '@/models/Item'

export async function updateItem(item: Item, updatedData: any) {
    try {
        await connectDB()
        const updatedItem = await ItemModel.findByIdAndUpdate(
            item.id,
            updatedData,
            { new: true, runValidators: true },
        )
        if (updatedItem) {
            console.log('Item updated:', updatedItem)
        } else {
            console.log('Item not found with id:', item.id)
        }
    } catch (err) {
        console.error('Error updating item:', err)
    }
}