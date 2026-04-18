import { AlertCircle } from 'lucide-react'

function ErrorMessage() {
    return (
        <div className="flex items-center gap-3 bg-red-900/20 border border-red-800 
                        rounded-xl p-4 text-red-400">
            <AlertCircle size={20} />
            <span>Kunne ikke hente data — prøv igen senere.</span>
        </div>
    )
}

export default ErrorMessage