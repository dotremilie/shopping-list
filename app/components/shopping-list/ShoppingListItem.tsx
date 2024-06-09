'use client'

import React from 'react'
import { FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { clsx } from 'clsx'
import CheckableItem from '@/models/CheckableItem'

interface Props {
    item: CheckableItem,
    onRemove: (item: CheckableItem) => void,
    onEdit: (item: CheckableItem) => void,
    onCheck: (item: CheckableItem) => void,
}

const ShoppingListItem: React.FC<Props> = ({ item, onRemove, onEdit, onCheck }) => {
    const [name, setName] = React.useState(item.name)
    const [count, setCount] = React.useState(item.count.toString())
    const [checked, setChecked] = React.useState(false)
    const [disabled, setDisabled] = React.useState(true)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'item-name') {
            setName(e.target.value)
        }

        if (e.target.name === 'item-count') {
            let value = parseInt(e.target.value)

            if (isNaN(value) || value < 0) setCount('0')
            else if (value <= 99) setCount(value.toString())
        }
    }

    return (
        <li
            className="flex gap-2 w-full overflow-hidden px-4"
        >
            <div className="relative flex-1 min-w-12">
                <input
                    type="text"
                    name="item-name"
                    value={name}
                    onChange={handleChange}
                    className={clsx(
                        'flex-1 w-full h-full min-w-12 bg-transparent text-ellipsis enabled:border-b-[1px] border-stone-500 p-1 outline-none ring-0 focus:dark:border-white focus:border-black',
                        {
                            'text-stone-500 line-through': checked,
                        },
                    )}

                    disabled={disabled}
                />
                {
                    disabled && (
                        <div
                            className="absolute inset-0"
                            onClick={
                                () => {
                                    setChecked(!checked)
                                    item.isChecked = !checked

                                    onCheck(item)
                                }
                            }
                        >
                        </div>
                    )
                }
            </div>
            <input
                type="text"
                name="item-count"
                value={count}
                onChange={handleChange}
                className={clsx(
                    'bg-transparent text-ellipsis enabled:border-b-[1px] border-stone-500 appearance-none p-1 text-center w-10 outline-none ring-0 focus:dark:border-white focus:border-black',
                    {
                        'text-stone-500 line-through': checked,
                    },
                )}
                disabled={disabled}
            />
            {
                !checked ? (
                    disabled ? (
                        <button
                            name="edit-button"
                            onClick={
                                () => {
                                    setDisabled(!disabled)
                                }
                            }
                            className="transition flex items-center justify-center rounded-xl p-3 text-lg aspect-square h-full border-2
                            dark:border-blue-600 dark:text-blue-600
                            hover:dark:bg-blue-600 hover:dark:text-white
                            active:bg-blue-500 active:border-0 active:text-black active:dark:text-white
                            border-blue-400 text-blue-400
                            hover:bg-blue-400 hover:text-black"
                        >
                            <FiEdit2 />
                        </button>
                    ) : (
                        <button
                            name="confirm-edit-button"
                            onClick={
                                () => {
                                    if (name.length === 0) return

                                    onEdit(
                                        {
                                            id: item.id,
                                            name: name,
                                            count: parseInt(count),
                                            isChecked: checked,
                                        },
                                    )

                                    setDisabled(!disabled)
                                }
                            }
                            className="transition flex items-center justify-center rounded-xl p-3 text-lg aspect-square h-full border-2
                            dark:border-green-600 dark:text-green-600
                            hover:dark:bg-green-600 hover:dark:text-white
                            active:bg-green-500 active:border-0 active:text-black active:dark:text-white
                            border-green-400 text-green-400
                            hover:bg-green-400 hover:text-black
                            "
                        >
                            <FiCheck />
                        </button>
                    )
                ) : null
            }
            <button
                onClick={
                    () => {
                        onRemove(item)
                    }
                }
                className="transition flex items-center justify-center rounded-xl p-3 text-lg aspect-square h-full border-2
                            dark:border-red-600 dark:text-red-600
                            hover:dark:bg-red-600 hover:dark:text-white
                            active:bg-red-500 active:border-0 active:text-black active:dark:text-white
                            border-red-400 text-red-400
                            hover:bg-red-400 hover:text-black"
            >
                <FiTrash2 />
            </button>
        </li>
    )
}

export default ShoppingListItem