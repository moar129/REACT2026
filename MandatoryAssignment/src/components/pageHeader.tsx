import type { LucideIcon } from 'lucide-react'

// Vi tager et ikon og en titel ind som props
// LucideIcon er typen på alle ikoner fra lucide-react
function PageHeader({ icon: Icon, title }: { icon: LucideIcon, title: string }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <Icon size={28} className="text-rose-accent" />
            <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
    )
}

export default PageHeader