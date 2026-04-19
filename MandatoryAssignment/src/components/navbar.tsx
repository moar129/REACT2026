import { Link, useLocation } from 'react-router-dom'
// link bruges til at lave navigationslinks i stedet for almindelige <a> tags, fordi det forhindrer siden i at reloade og i stedet håndterer navigationen internt i React
// useLocation er en hook der giver os adgang til den nuværende URL, som vi bruges til at style det aktive link i navigationen
import { Home, Search, Heart } from 'lucide-react' // importer ikoner fra lucide-react biblioteket, som vi bruger i vores navigation



function Navbar() {

    // pathname giver os den nuværende URL path, som vi kan sammenligne med vores link paths for at anvende aktive styles
    // linkClass er en hjælpefunktion som vi har defineret. den tager path som argument og returnerer en string af class navne.
    const location = useLocation()

    const linkClass = (path: string) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${location.pathname === path 
            ? 'bg-rose-accent text-white' // active styles
            : 'text-gray-400 hover:text-white hover:bg-white/10' // default styles with hover effects
        }`

    return (
        <nav className="bg-bg-surface border-b border-border shadow-lg">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold tracking-wide text-rose-accent">
                    AniTrack
                </Link>
                <div className="flex gap-2">
                    <Link to="/" className={linkClass('/')}>
                        <Home size={18} />
                        Hjem
                    </Link>
                    <Link to="/search" className={linkClass('/search')}>
                        <Search size={18} />
                        Søg
                    </Link>
                    <Link to="/favorites" className={linkClass('/favorites')}>
                        <Heart size={18} />
                        Favoritter
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar