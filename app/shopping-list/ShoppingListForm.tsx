'use client'

import { FiPlus } from 'react-icons/fi'
import React from 'react'
import Item from '@/app/models/Item'

interface Props {
    onAdd: (item: Item) => void
}

const ShoppingListForm: React.FC<Props> = ({ onAdd }) => {
    const [name, setName] = React.useState('')
    const [count, setCount] = React.useState('')

    return (
        <div className="flex flex-col gap-4 w-full p-4 bg-stone-900">
            <input
                type="text"
                placeholder="Item name"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                className="bg-transparent text-ellipsis enabled:border-b-[1px] border-stone-500 appearance-none p-2 w-full placeholder:text-stone-400"
            />
            <input
                type="text"
                placeholder="Item count"
                value={count}
                onChange={(e) => {
                    let value = parseInt(e.target.value)

                    if (isNaN(value) || value < 0) setCount('0')
                    else if (value <= 99) setCount(value.toString())
                }}
                className="bg-transparent text-ellipsis enabled:border-b-[1px] border-stone-500 appearance-none p-2 w-full placeholder:text-stone-400"
            />
            <button
                className="bg-green-900 rounded-xl py-2 flex items-center justify-center gap-2"
                onClick={() => {
                    onAdd({ id: '', name: name, count: count ? parseInt(count) : 1 })

                    setCount('')
                    setCount('')
                }}
            >
                Add to List
                <FiPlus />
            </button>
        </div>
    )
}

export default ShoppingListForm