'use server'

import ItemModel from '@/models/ItemModel'
import connectDB from '@/config/database'
import Item from '@/models/Item'

export async function removeItems(ids: string[]) {
    try {
        await connectDB()

        const removedItem = await ItemModel.deleteMany({_id: {$in: ids}})

        if (removedItem) {
            console.log('Item removed:', removedItem)
        } else {
            console.log('Item not found with id in ', ids)
        }
    } catch (err) {
        console.error('Error removing item:', err)
    }
}