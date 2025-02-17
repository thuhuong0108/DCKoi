import ImgKoiPond from "@/assets/images/koipond.png";
import { ColorLens, DesignServices, LocationOnOutlined, MoreVertOutlined } from "@mui/icons-material";
import { Card, Col, Dropdown, MenuProps } from "antd";

const { Meta } = Card;

export interface DesignCardData {
    projectId: string,
    address: string,
    dimensions: string,
    color: string,
    name: string,
    phone: string
};

interface DesignCardProps {
    props: DesignCardData
}

const items: MenuProps['items'] = [
    {
        key: "1",
        label: "a"
    },
    {
        key: "2",
        label: "b"
    },
    {
        key: "3",
        label: "c"
    },
]

const DesignCard = ({ props }: DesignCardProps) => {
    return (
        <Col span={8}>
            <Card
                hoverable
                style={{ width: 480 }}
                cover={<img alt="koipondimg" src={ImgKoiPond} />}
            >
                <Meta description={
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <h1 className="font-bold text-xl text-black">{props.projectId}</h1>
                            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                                <MoreVertOutlined />
                            </Dropdown>
                        </div>
                        <div className="flex items-center text-black">
                            <LocationOnOutlined />
                            <p className="font-semibold text-lg">{props.address}</p>
                        </div>

                        {/* Pond Info */}
                        <div className="flex justify-stretch text-black">
                            <div className="flex items-center w-full">
                                <DesignServices />
                                <p className="text-lg font-semibold">{props.dimensions}</p>
                            </div>
                            <div className="flex items-center w-full">
                                <ColorLens />
                                <p className="text-lg font-semibold">{props.color}</p>
                            </div>
                        </div>

                        {/* Divider Line */}
                        <div className="border-t border-black"></div>

                        {/* Customer Info */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg" alt="avatar" width={45} className="rounded-3xl" />
                                <p className="font-semibold text-black text-lg">{props.name}</p>
                            </div>
                            <p className="text-lg font-bold text-red-500">{props.phone}</p>
                        </div>
                    </div>
                } />
            </Card>
        </Col>
    )
}

export default DesignCard