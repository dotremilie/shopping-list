'use client'

import { FiPlus } from 'react-icons/fi'
import React from 'react'
import CheckableItem from '@/models/CheckableItem'
import Item from '@/models/Item'

interface Props {
    onAdd: (item: CheckableItem) => void
}

const ShoppingListForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = React.useState('')
    const [count, setCount] = React.useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'item-name') {
            setName(e.target.value)
        }

        if (e.target.name === 'item-count') {
            let value = parseInt(e.target.value)

            if (isNaN(value) || value < 0) setCount('')
            else if (value <= 99) setCount(value.toString())
        }
    }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            const response = await fetch('api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    count: count ? parseInt(count) : 1,
                }),
            })

            if (response.ok) {
                const item = await response.json()

                onAdd(
                    {
                        id: item._id,
                        name: name,
                        count: count ? parseInt(count) : 1,
                        isChecked: false,
                    },
                )

                setName('')
                setCount('')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div
            id="shopping-list-form"
            className="sticky top-0 z-20 flex flex-col gap-4 w-full p-4 dark:bg-stone-900 bg-stone-200"
        >
            <input
                type="text"
                id="item-name"
                name="item-name"
                placeholder="Item name"
                value={name}
                onChange={handleChange}
                className="bg-transparent border-b-[1px] border-stone-500 p-2 w-full dark:placeholder:text-stone-400 placeholder:text-stone-500 outline-none ring-0 focus:dark:border-white focus:border-black"
            />

            <input
                type="text"
                id="item-count"
                name="item-count"
                placeholder="Item count"
                value={count}
                onChange={handleChange}
                className="bg-transparent border-b-[1px] border-stone-500 p-2 w-full dark:placeholder:text-stone-400 placeholder:text-stone-500 outline-none ring-0 focus:dark:border-white focus:border-black"
            />

            <button
                className="transition flex items-center justify-center gap-2 rounded-xl p-3 text-lg h-full dark:bg-green-700 hover:dark:bg-green-600 hover:dark:text-white active:dark:bg-green-500 text-black dark:text-white bg-green-400 hover:bg-green-500 active:bg-green-600"
                onClick={handleClick}
            >
                Add to List
                <FiPlus />
            </button>
        </div>
    )
}

export default ShoppingListForm