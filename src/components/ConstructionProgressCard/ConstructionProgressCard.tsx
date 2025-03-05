import { CircularProgress } from "../ui"
import Card from "../ui/Card"

const ConstructionProgressCard = () => {
    return (
        <Card
            className="shadow-innerTop p-4 w-[400px] shadow-green-400">
            <Card.Header className="custom-header">
                <label className="font-bold text-xl">Tiến độ hoàn thành dự án</label>
            </Card.Header>
            <Card.Body className="custom-body">
                <div className="flex justify-end">
                    <CircularProgress
                        value={40}
                        size={55}
                        style={
                            { color: "#4ade80" }
                        }
                    />
                </div>
            </Card.Body>
        </Card>
    )
}

export default ConstructionProgressCard
