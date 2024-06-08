'use client'

import React from 'react'
import { FiCheck, FiEdit2, FiTrash2 } from 'react-icons/fi'
import { clsx } from 'clsx'
import Item from '@/app/models/Item'

interface Props {
    item: Item,
    onRemove: (id: string) => void,
    onEdit: (item: Item) => void,
}

const ShoppingListItem: React.FC<Props> = ({ item, onRemove, onEdit }) => {
    const [name, setName] = React.useState(item.name)
    const [count, setCount] = React.useState(item.count.toString())
    const [disabled, setDisabled] = React.useState(true)
    const [checked, setChecked] = React.useState(false)

    return (
        <li
            className="flex gap-2 w-full overflow-hidden px-4"
        >
            <div className="relative flex-1 min-w-12">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    className={clsx(
                        'flex-1 w-full h-full min-w-12 bg-transparent text-ellipsis enabled:border-b-[1px] border-stone-500 p-1',
                        {
                            'text-stone-500 line-through': checked,
                        })}

                    disabled={disabled}
                />
                {
                    disabled && (
                        <div
                        className="absolute inset-0"
                        onClick={() => {
                            setChecked(!checked)
                        }}></div>
                    )
                }
            </div>
            <input
                type="text"
                value={count}
                onChange={(e) => {
                    let value = parseInt(e.target.value)

                    if (isNaN(value) || value < 0) setCount('0')
                    else if (value <= 99) setCount(value.toString())
                }}
                disabled={disabled}
                className={clsx('bg-transparent text-ellipsis enabled:border-b-[1px] border-stone-500 appearance-none p-1 text-center w-10',
                    {
                        'text-stone-500 line-through': checked,
                    })}
            />
            {
                !checked ? (
                    disabled ? (
                        <button
                            onClick={() => {
                                // TODO: save current value to variable

                                setDisabled(!disabled)
                            }}
                            className="rounded-xl p-3 text-lg aspect-square h-full border-2 border-blue-600 text-blue-600">
                            <FiEdit2 />
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                // TODO: submit change to database, check with current value if changed
                                // TODO: submit change to database, check with current value if changed

                                setDisabled(!disabled)
                            }}
                            className="rounded-xl p-3 text-lg aspect-square h-full border-2 border-green-600 text-green-600">
                            <FiCheck />
                        </button>
                    )
                ) : null
            }
            <button
                onClick={() => {
                    // TODO: delete

                    onRemove(item.id)
                }}
                className="rounded-xl p-3 text-lg aspect-square h-full border-2 border-red-600 text-red-600">
                <FiTrash2 />
            </button>
        </li>
    )
}

export default ShoppingListItem