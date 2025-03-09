import { ProjectType } from "@/models"
import { Phone } from "@mui/icons-material";
import { Card } from "antd"
import { useNavigate } from "react-router-dom"

const CustomerProjectDesignCard = ({
    id,
    name,
    packageName,
    phone,
    area,
    depth,
    address,
    createdDate,
    status
}: ProjectType) => {
    const navigate = useNavigate();

    const handleSelectProject = (id: string) => {
        navigate(`/design/${id}`);
    }

    return (
        <Card
            className="rounded-lg bg-white w-[300px]"
            onClick={() => handleSelectProject(id)}
            hoverable
            children={
                <>
                <div className="bg-gray-200 rounded-lg p-2 space-y-6">
                    <div className="flex justify-between">
                        <span className="bg-white px-2 py-1 rounded-xl font-semibold">{createdDate}</span>
                        <span className="bg-green-200 text-green-500 px-2 py-1 rounded-xl">{status}</span>
                    </div>

                    <div className="space-y-2">
                        <p className="text-lg font-semibold">Project</p>
                        <p className="text-xl font-bold">{name} - {packageName}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Phone />
                        <span className="text-lg font-semibold">{phone}</span>
                    </div>
                </div>

                <div className="mt-2 flex justify-between gap-2">
                    <p className="font-semibold text-lg">{address}</p>
                    <p className="font-bold text-lg">{area * depth}m3</p>
                </div>
                </>
            } />
    )
}

export default CustomerProjectDesignCard
