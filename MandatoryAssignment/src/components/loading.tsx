import { Loader } from 'lucide-react'

function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center py-20 gap-3">
            <Loader size={24} className="text-rose-accent animate-spin" />
            <span className="text-gray-400">Loading...</span>
        </div>
    )
}

export default LoadingSpinner