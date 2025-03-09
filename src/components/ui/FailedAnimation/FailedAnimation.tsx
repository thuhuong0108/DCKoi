import { X } from "lucide-react"

const FailedAnimation = () => {
    return (
        <div className="relative flex items-center justify-center m-12">
            <div className="absolute w-28 h-28 rounded-full animate-pulse bg-red-200/60"></div>
            <div className="absolute w-24 h-24 rounded-full animate-pulse bg-red-300/70"></div>
            <div className="absolute w-20 h-20 rounded-full animate-pulse bg-red-400/80"></div>
            <div className="absolute w-16 h-16 rounded-full animate-pulse bg-red-500/90"></div>
            <div className="relative w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <X className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
        </div>
    )
}

export default FailedAnimation
