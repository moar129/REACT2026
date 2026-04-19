import { Link } from 'react-router-dom'
import { Home, SearchX } from 'lucide-react'

function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center py-20 gap-6 text-center">

            {/* Ikon */}
            <SearchX size={80} className="text-gray-700" />

            {/* Tekst */}
            <div className="flex flex-col gap-2">
                <h1 className="text-6xl font-bold text-rose-accent">404</h1>
                <h2 className="text-2xl font-semibold text-white">Siden findes ikke</h2>
                <p className="text-gray-400">
                    Den side du leder efter eksisterer ikke eller er blevet flyttet.
                </p>
            </div>

            {/* Tilbage til forsiden knap */}
            <Link
                to="/"
                className="flex items-center gap-2 bg-rose-accent hover:bg-rose-hover
                           text-white px-6 py-3 rounded-lg font-medium
                           transition-colors duration-200">
                <Home size={18} />
                Tilbage til forsiden
            </Link>

        </div>
    )
}

export default NotFoundPage