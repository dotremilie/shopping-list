'use client'

import { FiPlus } from 'react-icons/fi'
import React from 'react'
import CheckableItem from '@/models/CheckableItem'

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

    const handleSubmit = () => {
        onAdd(
            {
                id: '',
                name: name,
                count: count ? parseInt(count) : 1,
                isChecked: false,
            },
        )

        setName('')
        setCount('')
    }

    return (
        <form
            id="shopping-list-form"
            className="flex flex-col gap-4 w-full p-4 dark:bg-stone-900 bg-stone-200"
        >
            <input
                type="text"
                id="item-name"
                name="item-name"
                placeholder="Item name"
                value={name}
                onChange={handleChange}
                className="bg-transparent border-b-[1px] border-stone-500 p-2 w-full dark:placeholder:text-stone-400 placeholder:text-stone-500 outline-none ring-0 focus:dark:border-white focus:border-black"
                required
            />

            <input
                type="text"
                id="item-count"
                name="item-count"
                placeholder="Item count"
                value={count}
                onChange={handleChange}
                className="bg-transparent border-b-[1px] border-stone-500 p-2 w-full dark:placeholder:text-stone-400 placeholder:text-stone-500 outline-none ring-0 focus:dark:border-white focus:border-black"
                required
            />

            <button
                type="submit"
                className="transition flex items-center justify-center gap-2 rounded-xl p-3 text-lg h-full
                            dark:bg-green-700
                            hover:dark:bg-green-600 hover:dark:text-white
                            active:dark:bg-green-500 text-black dark:text-white
                            bg-green-400
                            hover:bg-green-500
                            active:bg-green-600"
                onSubmit={handleSubmit}
            >
                Add to List
                <FiPlus />
            </button>
        </form>
    )
}

export default ShoppingListForm