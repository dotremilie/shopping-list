import { NextRequest, NextResponse } from 'next/server'

import { getItems } from '@/_actions/getItems'
import { addItem } from '@/_actions/addItem'
import { removeItem } from '@/_actions/removeItem'
import { updateItem } from '@/_actions/updateItem'
import Item from '@/models/Item'
import { removeItems } from '@/_actions/removeItems'

export async function GET() {
    try {
        const items = await getItems()
        return NextResponse.json(items)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get items' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const item: Item = await req.json()
        const addedItem = await addItem(item)

        return NextResponse.json(addedItem)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json();

        if (data.ids) {
            await removeItems(data.ids)
            return NextResponse.json({ message: 'Items deleted' });
        }

        if (data.id) {
            await removeItem(data.id)
            return NextResponse.json({ message: 'Item deleted' });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const item = await req.json();
        await updateItem(item);
        return NextResponse.json({ message: 'Item updated' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
    }
}