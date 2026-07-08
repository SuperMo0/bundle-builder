import './PlanImage.css'
import { publicAsset } from '../../lib/publicAsset'

interface PlanImageProps {
    variantLabel: string
}

export default function PlanImage({ variantLabel }: PlanImageProps) {
    return (
        <div className="PlanImage">
            <img src={publicAsset("/icons/product-placeholder.svg")} alt="" className="PlanRow-icon" />
            <p className="PlanRow-name">
                Cam <span className="PlanRow-variant">{variantLabel}</span>
            </p>
        </div>
    )
}
