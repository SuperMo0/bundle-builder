import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useBundleSelection } from '../hooks/useBundleSelection'
import type { BundleStep } from '../bundle.config'

const steps: BundleStep[] = [
    {
        id: 'cameras',
        title: 'Choose your cameras',
        icon: '/icons/livestream.svg',
        selectionMode: 'quantity',
        reviewLabel: 'Cameras',
        items: [
            {
                id: 'cam-a',
                name: 'Camera A',
                description: 'A camera.',
                image: '/products/cam-a.png',
                price: 10,
                colors: [
                    { name: 'Red', image: '/products/cam-a-red.png' },
                    { name: 'Blue', image: '/products/cam-a-blue.png' },
                ],
            },
        ],
    },
    {
        id: 'sensors',
        title: 'Choose your sensors',
        icon: '/icons/sensors.svg',
        selectionMode: 'quantity',
        reviewLabel: 'Sensors',
        items: [
            {
                id: 'hub',
                name: 'Hub (Required)',
                description: 'Required hub.',
                image: null,
                price: 0,
                required: true,
                maxQuantity: 1,
            },
        ],
    },
    {
        id: 'plan',
        title: 'Choose your plan',
        icon: '/icons/plan.svg',
        selectionMode: 'single',
        reviewLabel: 'PLAN',
        items: [
            { id: 'basic', name: 'Basic', description: 'Basic plan.', image: null, price: 0, planTier: 'Basic' },
            {
                id: 'unlimited',
                name: 'Unlimited',
                description: 'Unlimited plan.',
                image: null,
                price: 10,
                planTier: 'Unlimited',
            },
        ],
    },
]

beforeEach(() => {
    localStorage.clear()
})

describe('useBundleSelection', () => {
    it('floors a required item at 1 and refuses to zero it out', () => {
        const { result } = renderHook(() => useBundleSelection(steps))

        expect(result.current.getMinQuantity('sensors', 'hub')).toBe(1)
        expect(result.current.selections.sensors.hub.default).toBe(1)

        act(() => result.current.setQuantity('sensors', 'hub', 'default', 0))

        expect(result.current.selections.sensors.hub.default).toBe(1)
    })

    it('does not floor a non-required item', () => {
        const { result } = renderHook(() => useBundleSelection(steps))

        expect(result.current.getMinQuantity('cameras', 'cam-a')).toBe(0)
    })

    it('ceilings a single-unit item at its maxQuantity and refuses to exceed it', () => {
        const { result } = renderHook(() => useBundleSelection(steps))

        expect(result.current.getMaxQuantity('sensors', 'hub')).toBe(1)

        act(() => result.current.setQuantity('sensors', 'hub', 'default', 5))

        expect(result.current.selections.sensors.hub.default).toBe(1)
    })

    it('does not cap an item with no maxQuantity set', () => {
        const { result } = renderHook(() => useBundleSelection(steps))

        expect(result.current.getMaxQuantity('cameras', 'cam-a')).toBe(Infinity)

        act(() => result.current.setQuantity('cameras', 'cam-a', 'Red', 42))

        expect(result.current.selections.cameras['cam-a'].Red).toBe(42)
    })

    it('tracks each color variant of a product independently', () => {
        const { result } = renderHook(() => useBundleSelection(steps))

        act(() => result.current.setQuantity('cameras', 'cam-a', 'Red', 2))
        expect(result.current.selections.cameras['cam-a'].Red).toBe(2)
        expect(result.current.selections.cameras['cam-a'].Blue ?? 0).toBe(0)

        act(() => result.current.setQuantity('cameras', 'cam-a', 'Blue', 1))
        expect(result.current.selections.cameras['cam-a'].Red).toBe(2)
        expect(result.current.selections.cameras['cam-a'].Blue).toBe(1)
    })

    it('zeroes out the sibling item when a new plan is selected', () => {
        const { result } = renderHook(() => useBundleSelection(steps))

        act(() => result.current.setQuantity('plan', 'unlimited', 'default', 1))
        expect(result.current.selections.plan.unlimited.default).toBe(1)
        expect(result.current.selections.plan.basic.default).toBe(0)

        act(() => result.current.setQuantity('plan', 'basic', 'default', 1))
        expect(result.current.selections.plan.basic.default).toBe(1)
        expect(result.current.selections.plan.unlimited.default).toBe(0)
    })

    it('counts distinct products selected, not distinct variants', () => {
        const { result } = renderHook(() => useBundleSelection(steps))

        act(() => result.current.setQuantity('cameras', 'cam-a', 'Red', 1))
        act(() => result.current.setQuantity('cameras', 'cam-a', 'Blue', 1))

        // Same product (cam-a), two variants selected - still one distinct product.
        expect(result.current.getSelectedCount('cameras')).toBe(1)
    })

    it('restores a previously saved snapshot instead of the seeded defaults', () => {
        const first = renderHook(() => useBundleSelection(steps))
        act(() => first.result.current.setQuantity('cameras', 'cam-a', 'Red', 3))
        act(() => first.result.current.saveSnapshot())

        const second = renderHook(() => useBundleSelection(steps))
        expect(second.result.current.selections.cameras['cam-a'].Red).toBe(3)
    })

    it('falls back to seeded defaults when the persisted snapshot is corrupted JSON', () => {
        localStorage.setItem('bundle-builder:selections', '{not valid json')

        const { result } = renderHook(() => useBundleSelection(steps))

        expect(result.current.selections.cameras['cam-a'].Red).toBe(0)
        expect(result.current.selections.sensors.hub.default).toBe(1)
    })
})
