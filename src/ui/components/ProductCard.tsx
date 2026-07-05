import type { BundleItem } from '../../types'


interface ProductCard {
    bundleItem: BundleItem
    quantity: number
    onQuantityChange: (itemId: string, quantity: number) => void
}
export default function ProductCard({ bundleItem, quantity, onQuantityChange }: ProductCard) {
    return (
        <>
            <div>{bundleItem.name}</div>
            <div>{bundleItem.price}</div>
            <div>{quantity}</div>
        </>
    )
}
