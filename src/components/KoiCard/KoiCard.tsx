interface KoiCardProps {
    image: string;
    title: string;
    description: string;
}

const KoiCard = ({ image, title, description }: KoiCardProps) => {
    return (
        <div className="flex flex-col grow shrink self-stretch my-auto w-full">
            <img
                loading="lazy"
                src={image}
                alt={title}
                className="object-cover w-full"
            />
            <div className="self-start mt-4 text-lg font-medium">{title}</div>
            <div className="mt-2 text-sm font-light">{description}</div>
        </div>
    );
}

export default KoiCard
