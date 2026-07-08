import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductCard from './ProductCard'
import type { QuantityItem } from '../../types'

const item: QuantityItem = {
    id: 'cam-a',
    name: 'Camera A',
    description: 'A camera.',
    image: '/products/cam-a.png',
    price: 10,
}

describe('ProductCard', () => {
    it('marks itself selected when any variant has a positive quantity', () => {
        render(
            <ProductCard bundleItem={item} quantities={{ default: 2 }} onQuantityChange={vi.fn()} min={0} max={99} />
        )

        expect(screen.getByText('Camera A').closest('.ProductCard')).toHaveAttribute('data-selected', 'true')
    })

    it('is not marked selected when every variant quantity is zero', () => {
        render(
            <ProductCard bundleItem={item} quantities={{ default: 0 }} onQuantityChange={vi.fn()} min={0} max={99} />
        )

        expect(screen.getByText('Camera A').closest('.ProductCard')).not.toHaveAttribute('data-selected')
    })
})
