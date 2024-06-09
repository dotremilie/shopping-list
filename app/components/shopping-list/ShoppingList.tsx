'use client'

import React, { useState } from 'react'
import ShoppingListForm from '@/app/components/shopping-list/ShoppingListForm'
import ShoppingListItem from '@/app/components/shopping-list/ShoppingListItem'
import { FiMeh, FiPackage, FiTrash2 } from 'react-icons/fi'
import CheckableItem from '@/models/CheckableItem'
import Item from '@/models/Item'

const ShoppingList = () => {
    const [items, setItems] = useState<CheckableItem[]>([
        { id: '1', name: 'Item 1', count: 1, isChecked: false },
        { id: '2', name: 'Item 2', count: 2, isChecked: false },
    ])
    const [checkedCount, setCheckedCount] = React.useState<number>(items.filter(item => item.isChecked).length)

    // TODO: fetch item list from database

    const addItem = (newItem: CheckableItem) => {
        // TODO: insert item to database

        setItems([...items, newItem])
    }

    const removeItem = (removedItem: Item) => {
        // TODO: delete item from database

        console.log('Succesfully removed Item: ', removedItem)

        setItems(items.filter(item => item.id !== removedItem.id))
    }

    const editItem = (updatedItem: CheckableItem) => {
        // TODO: update item in database

        setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)))
    }

    const checkItem = (checkedItem: CheckableItem) => {
        setItems(items.map(item => (item.id === checkedItem.id ? checkedItem : item)))

        setCheckedCount(items.filter(item => item.isChecked).length)
    }

    const removeCheckedItems = () => {
        // TODO: delete checked items from database

        setItems(items.filter(item => !item.isChecked))
        setCheckedCount(0)
    }

    return (
        <div className="flex flex-col gap-4 h-screen w-full">
            <ShoppingListForm onAdd={addItem} />
            {
                checkedCount > 0 ? (
                    <div
                        className="rounded-xl flex items-center justify-between mx-4 p-4 text-sm bg-stone-200 dark:bg-stone-900">
                        {checkedCount} {checkedCount > 1 ? 'items' : 'item'} checked.
                        <button
                            className="rounded-xl p-3 h-full bg-red-400 dark:bg-red-900 text-black dark:text-white flex gap-2 items-center justify-center"
                            onClick={removeCheckedItems}
                        >
                            <FiTrash2 />
                            Delete
                        </button>
                    </div>
                ) : null
            }
            <ul
                id="shopping-list"
                className="flex flex-col gap-2"
            >
                {
                    items.length > 0 ? (
                        items.map(
                            (item) => (
                                <ShoppingListItem key={item.id} item={item} onRemove={removeItem} onEdit={editItem}
                                                  onCheck={checkItem} />
                            ),
                        )
                    ) : (
                        <div
                            className="flex flex-col gap-2 w-full text-stone-500 font-semibold items-center justify-center">
                            <FiMeh className="text-4xl" />
                            Your shopping list is empty.
                        </div>
                    )
                }
            </ul>
        </div>

    )
}

export default ShoppingList