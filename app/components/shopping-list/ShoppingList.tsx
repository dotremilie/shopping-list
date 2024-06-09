'use client'

import React, { useEffect, useState } from 'react'
import ShoppingListForm from '@/app/components/shopping-list/ShoppingListForm'
import ShoppingListItem from '@/app/components/shopping-list/ShoppingListItem'
import { FiSmile, FiTrash2 } from 'react-icons/fi'
import CheckableItem from '@/models/CheckableItem'
import { removeItems } from '@/_actions/removeItems'

const ShoppingList = () => {
    const [items, setItems] = useState<CheckableItem[]>([])
    const [checkedCount, setCheckedCount] = React.useState<number>(0)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('api/items')
            const data = await response.json()

            let checkableItems: CheckableItem[] = []

            data.forEach((item: any) => {
                let checkableItem: CheckableItem = {
                    id: item._id,
                    name: item.name,
                    count: item.count,
                    isChecked: false,
                }

                checkableItems.push(checkableItem)
            })

            return checkableItems
        }

        fetchData().then((items) => {
            setItems(items)
        })
    }, [])

    useEffect(() => {
        setCheckedCount(items.filter(item => item.isChecked).length)
    }, [items])

    const addItem = async (newItem: CheckableItem) => {
        setItems([...items, newItem])
    }

    const removeItem = async (removedItem: CheckableItem) => {
        try {
            const response = await fetch('api/items', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: removedItem.id,
                    name: removedItem.name,
                    count: removedItem.count,
                }),
            })

            if (response.ok) {
                setItems(items.filter(item => item.id !== removedItem.id))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const editItem = async (updatedItem: CheckableItem) => {
        try {
            const response = await fetch('api/items', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: updatedItem.id,
                    name: updatedItem.name,
                    count: updatedItem.count,
                }),
            })

            if (response.ok) {
                setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)))
            }
        } catch (error) {
            console.error(error)
        }
    }

    const checkItem = (checkedItem: CheckableItem) => {
        setItems(items.map(item => (item.id === checkedItem.id ? checkedItem : item)))
    }

    const removeCheckedItems = async () => {
        try {
            const checkedItemIds: string[] = items.filter(item => item.isChecked).map(item => item.id)

            const response = await fetch('api/items', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: checkedItemIds }),
            })

            if (response.ok) {
                setItems(items.filter(item => !item.isChecked))
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col gap-4 min-h-screen w-full">
            <ShoppingListForm onAdd={addItem} />
            <div className="flex flex-col gap-4">
                {
                    checkedCount > 0 ? (
                        <div
                            className="rounded-xl sticky z-10 top-[212px] flex items-center justify-between mx-4 p-4 text-sm bg-stone-200 dark:bg-stone-900">
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

                {
                    items.length > 0 ? (
                        <ul
                            id="shopping-list"
                            className="flex flex-col gap-2 mb-16"
                        >
                            {
                                items.map(
                                    (item) =>
                                        <ShoppingListItem key={item.id} item={item} onRemove={removeItem}
                                                          onEdit={editItem}
                                                          onCheck={checkItem} />,
                                )
                            }
                        </ul>
                    ) : (
                        <div
                            className="flex flex-col gap-2 w-full text-stone-500 font-semibold items-center justify-center">
                            <FiSmile className="text-4xl" />
                            Your shopping list is empty.
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default ShoppingList