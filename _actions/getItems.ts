'use server'

import itemModel from "@/models/itemModel";
import connectDB from "@/config/database";

export async function getItems(){
    try {
        await connectDB();
        const data = await itemModel.find();
        return data;
    } catch (err) {
        console.error('Error getting items:', err);
    }
}