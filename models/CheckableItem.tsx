import Item from '@/models/Item'

export default interface CheckableItem extends Item {
    isChecked: boolean;
}