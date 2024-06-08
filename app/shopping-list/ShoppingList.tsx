'use client'

import React, { useState } from 'react'
import Item from '@/app/models/Item'
import ShoppingListForm from '@/app/shopping-list/ShoppingListForm'
import ShoppingListItem from '@/app/shopping-list/ShoppingListItem'

const ShoppingList = () => {
    const [items, setItems] = useState<Item[]>([
        { id: '1', name: 'Item 1', count: 1 },
        { id: '2', name: 'Item 2', count: 2 },
    ])

    const addItem = (newItem: Item) => {
        setItems([...items, newItem])
    }

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id))
    }

    const editItem = (updatedItem: Item) => {
        setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)))
    }

    return (
        <div className="flex flex-col gap-4">
            <ShoppingListForm onAdd={addItem} />
            <ul className="flex flex-col gap-2">
                {items.map((item) => (
                    <ShoppingListItem key={item.id} item={item} onRemove={removeItem} onEdit={editItem} />
                ))}
            </ul>
        </div>

    )
}

export default ShoppingList