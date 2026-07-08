import { describe, it, expect } from 'vitest'
import { deriveReviewData } from '../deriveReview'
import type { BundleStep, BundleSelections } from '../bundle.config'

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
                originalPrice: 20,
                colors: [
                    { name: 'Red', image: '/products/cam-a-red.png' },
                    { name: 'Blue', image: '/products/cam-a-blue.png' },
                ],
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
                originalPrice: 15,
                planTier: 'Unlimited',
            },
        ],
    },
]

describe('deriveReviewData', () => {
    it('emits one line item per variant with a positive quantity, not one per product', () => {
        const selections: BundleSelections = {
            cameras: { 'cam-a': { Red: 2, Blue: 1 } },
            plan: { basic: { default: 0 }, unlimited: { default: 1 } },
        }

        const { sections } = deriveReviewData(steps, selections)
        const cameraLines = sections.find((s) => s.id === 'cameras')!.lineItems

        expect(cameraLines).toHaveLength(2)
        expect(cameraLines.map((l) => l.name)).toEqual(
            expect.arrayContaining(['Camera A — Red', 'Camera A — Blue'])
        )
    })

    it('excludes variants whose quantity has dropped to zero', () => {
        const selections: BundleSelections = {
            cameras: { 'cam-a': { Red: 2, Blue: 0 } },
            plan: { basic: { default: 0 }, unlimited: { default: 0 } },
        }

        const { sections } = deriveReviewData(steps, selections)
        const cameraLines = sections.find((s) => s.id === 'cameras')!.lineItems

        expect(cameraLines).toHaveLength(1)
        expect(cameraLines[0].name).toBe('Camera A — Red')
    })

    it('selects whichever plan item has a positive quantity and includes it in the totals', () => {
        const selections: BundleSelections = {
            cameras: { 'cam-a': { Red: 0, Blue: 0 } },
            plan: { basic: { default: 0 }, unlimited: { default: 1 } },
        }

        const { selectedPlan, totalPrice, totalOriginalPrice } = deriveReviewData(steps, selections)

        expect(selectedPlan?.id).toBe('unlimited')
        expect(totalPrice).toBe(10)
        expect(totalOriginalPrice).toBe(15)
    })

    it('sums per-variant line pricing (price * quantity) plus the plan into the totals', () => {
        const selections: BundleSelections = {
            cameras: { 'cam-a': { Red: 2, Blue: 1 } },
            plan: { basic: { default: 0 }, unlimited: { default: 1 } },
        }

        const { totalPrice, totalOriginalPrice } = deriveReviewData(steps, selections)

        // Red: 10*2=20 (orig 20*2=40), Blue: 10*1=10 (orig 20*1=20), plan: 10 (orig 15)
        expect(totalPrice).toBe(20 + 10 + 10)
        expect(totalOriginalPrice).toBe(40 + 20 + 15)
    })

    it('omits selectedPlan and its price when no plan option has a positive quantity', () => {
        const selections: BundleSelections = {
            cameras: { 'cam-a': { Red: 1, Blue: 0 } },
            plan: { basic: { default: 0 }, unlimited: { default: 0 } },
        }

        const { selectedPlan, planLabel, totalPrice, totalOriginalPrice } = deriveReviewData(steps, selections)

        expect(selectedPlan).toBeUndefined()
        expect(planLabel).toBe('PLAN')
        expect(totalPrice).toBe(10)
        expect(totalOriginalPrice).toBe(20)
    })

    it('ignores a selection entry for an item id that no longer exists in steps', () => {
        const selections: BundleSelections = {
            cameras: { 'cam-a': { Red: 1 }, 'discontinued-cam': { default: 5 } },
            plan: { basic: { default: 0 }, unlimited: { default: 0 } },
        }

        const { sections } = deriveReviewData(steps, selections)
        const cameraLines = sections.find((s) => s.id === 'cameras')!.lineItems

        expect(cameraLines).toHaveLength(1)
        expect(cameraLines[0].itemId).toBe('cam-a')
    })

    it('produces an empty lineItems array for a step where every quantity is zero', () => {
        const selections: BundleSelections = {
            cameras: { 'cam-a': { Red: 0, Blue: 0 } },
            plan: { basic: { default: 0 }, unlimited: { default: 0 } },
        }

        const { sections } = deriveReviewData(steps, selections)
        const cameraSection = sections.find((s) => s.id === 'cameras')!

        expect(cameraSection.lineItems).toEqual([])
    })
})
