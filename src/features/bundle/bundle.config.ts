import type { BundleItem } from "../../types"

export type StepSelectionMode = 'quantity' | 'single'

export interface BundleStep {
    id: string
    title: string
    icon: string
    selectionMode: StepSelectionMode
    items: BundleItem[]
}

export const bundleSteps: BundleStep[] = [
    {
        id: 'cameras',
        title: 'Choose your cameras',
        icon: '/livestream.svg',
        selectionMode: 'quantity',
        items: [
            {
                id: 'wyze-cam-v4',
                name: 'Wyze Cam v4',
                image: '/products/wyze-cam-v4.png',
                price: 27.98,
                originalPrice: 35.98,
                colors: ['White', 'Grey', 'Black'],
            },
            {
                id: 'wyze-cam-pan-v3',
                name: 'Wyze Cam Pan v3',
                image: '/products/wyze-cam-pan-v3.png',
                price: 34.98,
                originalPrice: 39.98,
                colors: ['White', 'Black'],
            },
            {
                id: 'wyze-cam-floodlight-v2',
                name: 'Wyze Cam Floodlight v2',
                image: '/products/wyze-cam-floodlight-v2.png',
                price: 69.98,
                originalPrice: 89.98,
                colors: ['White', 'Black'],
            },
            {
                id: 'wyze-duo-cam-doorbell',
                name: 'Wyze Duo Cam Doorbell',
                image: '/products/wyze-duo-cam-doorbell.png',
                price: 69.98,
            },
            {
                id: 'wyze-battery-cam-pro',
                name: 'Wyze Battery Cam Pro',
                image: '/products/wyze-battery-cam-pro.png',
                price: 89.98,
                colors: ['White', 'Black'],
            },
        ],
    },
    {
        id: 'plan',
        title: 'Choose your plan',
        icon: '/plan.svg',
        selectionMode: 'single',
        // PLACEHOLDER — only "Cam Unlimited" is confirmed from the review panel.
        // Replace with the real tier list once the expanded "Choose your plan" step is available.
        items: [
            {
                id: 'cam-basic',
                name: 'Cam Basic',
                image: '/plans/cam-basic.png',
                price: 0,
                billingPeriod: 'month',
            },
            {
                id: 'cam-unlimited',
                name: 'Cam Unlimited',
                image: '/plans/cam-unlimited.png',
                price: 9.99,
                originalPrice: 12.99,
                billingPeriod: 'month',
            },
        ],
    },
    {
        id: 'sensors',
        title: 'Choose your sensors',
        icon: '/sensors.svg',
        selectionMode: 'quantity',
        items: [
            {
                id: 'wyze-sense-motion-sensor',
                name: 'Wyze Sense Motion Sensor',
                image: '/products/wyze-sense-motion-sensor.png',
                price: 29.99,
            },
            {
                id: 'wyze-sense-hub',
                name: 'Wyze Sense Hub (Required)',
                image: '/products/wyze-sense-hub.png',
                price: 0,
                originalPrice: 29.92,
                required: true,
            },
        ],
    },
    {
        id: 'protection',
        title: 'Add extra protection',
        icon: '/extra.svg',
        selectionMode: 'quantity',
        // PLACEHOLDER — only the MicroSD card is confirmed from the review panel.
        // Replace with the real accessories catalog once the expanded step is available.
        items: [
            {
                id: 'wyze-microsd-256gb',
                name: 'Wyze MicroSD Card (256GB)',
                image: '/products/wyze-microsd-256gb.png',
                price: 20.98,
            },
        ],
    },
]
