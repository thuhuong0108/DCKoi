interface FeatureCardProps {
    color: string;
    title: string;
    description: string;
}

const FeatureCard = ({ color, title, description }: FeatureCardProps) => {
    return (
        <div className="flex flex-wrap gap-3.5">
            <div className={`flex shrink-0 self-start ${color} h-[145px] w-[7px]`}/>
            <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
                <div className="flex justify-between items-center text-2xl font-medium tracking-tight min-h-[33px]">
                    <div className="self-stretch my-auto h-[33px] min-w-[240px] w-[670px] max-md:max-w-full">
                        {title}
                    </div>
                </div>
                <div className="mt-2.5 text-sm font-light tracking-normal min-h-[115px] text-zinc-500 max-md:max-w-full">
                    {description}
                </div>
            </div>
        </div>
    );
};

export default FeatureCard
