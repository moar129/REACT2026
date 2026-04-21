import type { LucideIcon } from 'lucide-react'

// Vi tager et ikon, en værdi og en valgfri ikonfarve ind som props
// Hvis ikonfarven ikke er angivet, bruger vi en standardfarve (her: 'text-rose-accent')
function StatBadge({ icon: Icon, value, iconClass }: {icon: LucideIcon, value: string | number, iconClass?: string}) {
    return (
        <div className="flex items-center gap-2 bg-bg-surface border border-border rounded-lg px-4 py-2">
            <Icon size={18} className={iconClass ?? 'text-rose-accent'} /> {/* Hvis iconClass er angivet, bruger vi det, ellers bruger vi 'text-rose-accent' */}
            <span className="text-white font-medium">{value}</span>
        </div>
    )
}

export default StatBadge