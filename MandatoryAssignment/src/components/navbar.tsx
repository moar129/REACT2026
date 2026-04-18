import { Link, useLocation } from 'react-router-dom'
// link is used to navigate between pages without reloading, instead of using <a> tags which would cause a full page reload
// useLocation is used to determine the current path for active link styling. We can use it to compare the current path with the link's path and apply different styles accordingly.
import { Home, Search, Heart } from 'lucide-react' // Importing icons from lucide-react for use in the navigation bar

function Navbar() {

    // uselocation hook to get the current path and determine which link is active for styling purposes
    // pathname gives us the current URL path, which we can compare against our link paths to apply active styles
    // linkClass is a helper function that we have defined. it takes path as an argument and returns a string of class names. 

    const location = useLocation()

    const linkClass = (path: string) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${location.pathname === path // if the current path matches the link's path, we apply active styles, otherwise we apply default styles with hover effects
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