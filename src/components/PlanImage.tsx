import './PlanImage.css'

interface PlanImageProps {
    variantLabel: string
}

export default function PlanImage({ variantLabel }: PlanImageProps) {
    return (
        <div className="PlaneImage">
            <img src={"/wyze-icon.svg"} alt="" className="PlanRow-icon" />
            <p className="PlanRow-name">
                Cam <span className="PlanRow-variant">{variantLabel}</span>
            </p>
        </div>
    )
}
