import { ProjectDesignType } from "@/models/ProjectType";
import { Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const CustomerDesignCard = ({
    id,
    imageUrl,
    version,
    status,
}: ProjectDesignType) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (id) {
            navigate(`/design/${id}`);
        }
    };

    return (
        <Card
            className="rounded-lg bg-white w-[300px] "
            hoverable
            onClick={handleCardClick}
            cover={
                <img
                    alt="example"
                    src={imageUrl}
                    className="rounded-t-lg"
                    style={{ height: "200px" }}
                />
            }
        >

            <div className="flex items-center justify-between mt-2">
                <div className="flex flex-col justify-between mt-2">
                    <div className="flex items-center">
                        <span className="ml-2 text-sm">{status}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="ml-2 text-sm">Version {version}</span>
                    </div>
                </div>
            </div>

            {/* line */}
            <div>
                <hr className="my-2" />
            </div>

            {/* customer */}

            <div className="flex items-center flex-row justify-between">
                <Typography.Text strong aria-level={2}>
                    {status}
                </Typography.Text>
            </div>
        </Card>
    )
}

export default CustomerDesignCard
