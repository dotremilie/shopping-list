'use server'

import itemModel from "@/models/itemModel";
import connectDB from "@/config/database";
import Item from "@/models/Item";

export async function addItem(item: Item){
    const newItem = new itemModel({
        name: item.name,
        count: item.count
    });
    
    try {
        await connectDB();
    
        const savedItem = await newItem.save();
        console.log('Item saved:', savedItem);
    } catch (err) {
        console.error('Error saving item:', err);
    }
}