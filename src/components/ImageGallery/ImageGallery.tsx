import { Card, Row } from "antd";

const ImageGallery = ({ images, selectedImage, onSelect }) => {
    return (
        <>
            <Card className="w-full aspect-[16/9] flex justify-center items-center overflow-hidden border-none">
                <img src={selectedImage} alt="main" className="w-full h-full object-cover rounded-2xl" />
            </Card>
            <Row className="mt-4 flex items-center gap-2 justify-center">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`thumb-${index}`}
                        className={`w-12 h-12 object-cover border-2 rounded-lg cursor-pointer ${selectedImage === img ? "border-blue-500" : "border-gray-300"}`}
                        onClick={() => onSelect(img)}
                    />
                ))}
            </Row>
        </>
    );
};

export default ImageGallery;