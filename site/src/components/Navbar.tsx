import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import logoNavbar from '../assets/logos/logo_digipath_fundo_branco.png'

type Page = 'home' | 'sobre' | 'datapath' | 'noticias'

interface NavbarProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const navItems: { id: Page; label: string }[] = [
  { id: 'home', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'datapath', label: 'Datapath' },
  { id: 'noticias', label: 'Notícias' },
]

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleClick = (id: Page) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleClick('home')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img src={logoNavbar} alt="DigiPath" className="h-10 w-auto" />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gradient">digiPATH</span>
              <p className="text-[10px] text-[var(--color-text-muted)] -mt-1 leading-tight">
                Plataforma de Patologia Digital
              </p>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer
                  ${currentPage === item.id
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-slate-100'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-[var(--color-text-muted)] hover:bg-slate-100 cursor-pointer"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-white">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer
                  ${currentPage === item.id
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-muted)] hover:bg-slate-100'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
