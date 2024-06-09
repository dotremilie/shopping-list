'use server'

import ItemModel from '@/models/ItemModel'
import connectDB from '@/config/database'

export async function getItems() {
    try {
        await connectDB()

        return await ItemModel.find()
    } catch (err) {
        console.error('Error getting items:', err)
    }
}