'use server'

import ItemModel from '@/models/ItemModel'
import connectDB from '@/config/database'
import Item from '@/models/Item'

export async function removeItem(item: Item) {
    try {
        await connectDB()

        const removedItem = await ItemModel.deleteOne({ _id: item.id })
        if (removedItem) {
            console.log('Item removed:', removedItem)
        } else {
            console.log('Item not found with id:', item.id)
        }
    } catch (err) {
        console.error('Error removing item:', err)
    }
}