'use server'

import ItemModel from '@/models/ItemModel'
import connectDB from '@/config/database'
import Item from '@/models/Item'

export async function addItem(item: Item) {
    const newItem = new ItemModel({
        name: item.name,
        count: item.count,
    })

    try {
        await connectDB()

        const savedItem = await newItem.save()
        console.log('Item saved:', savedItem)

        return savedItem
    } catch (err) {
        console.error('Error saving item:', err)
    }
}