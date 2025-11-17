export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'ui-theme'

// -----------------------------------------------------
// Atribui o tema ao <html data-theme="">
// -----------------------------------------------------
export function setTheme(theme: Theme, save: boolean = true) {
    document.documentElement.setAttribute('data-theme', theme)

    if (save) {
        localStorage.setItem(THEME_STORAGE_KEY, theme)
    }
}

// -----------------------------------------------------
// Lê o tema atual do HTML ou do armazenamento
// -----------------------------------------------------
export function getTheme(): Theme {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
        return stored
    }

    // Fallback: tenta usar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
}

// -----------------------------------------------------
// Alterna entre dark/light
// -----------------------------------------------------
export function toggleTheme(): Theme {
    const current = getTheme()
    const next: Theme = current === 'dark' ? 'light' : 'dark'
    setTheme(next)
    return next
}
