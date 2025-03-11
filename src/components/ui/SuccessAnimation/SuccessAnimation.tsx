import { Check } from "lucide-react"

const SuccessAnimation = () => {
    return (
        <div className="relative flex items-center justify-center m-12">
            <div className="absolute w-28 h-28 rounded-full animate-pulse bg-emerald-200/60"></div>
            <div className="absolute w-24 h-24 rounded-full animate-pulse bg-emerald-300/70"></div>
            <div className="absolute w-20 h-20 rounded-full animate-pulse bg-emerald-400/80"></div>
            <div className="absolute w-16 h-16 rounded-full animate-pulse bg-emerald-500/90"></div>
            <div className="relative w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
        </div>
    )
}

export default SuccessAnimation
