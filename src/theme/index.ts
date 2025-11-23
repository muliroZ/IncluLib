export type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'ui-theme' as const;

// -----------------------------------------------------
// Leitura segura do localStorage
// -----------------------------------------------------
function safeGetLocalTheme(): Theme | null {
    try {
        const value = localStorage.getItem(THEME_STORAGE_KEY);
        return value === 'light' || value === 'dark' ? value : null;
    } catch {
        return null; // storage indisponível
    }
}

// -----------------------------------------------------
// Escrita segura do localStorage
// -----------------------------------------------------
function safeSetLocalTheme(theme: Theme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        /* ignora erros de storage */
    }
}

// -----------------------------------------------------
// Define tema no <html data-theme="">
// -----------------------------------------------------
export function setTheme(theme: Theme, save = true) {
    document.documentElement.dataset.theme = theme;

    if (save) {
        safeSetLocalTheme(theme);
    }
}

// -----------------------------------------------------
// Lê tema salvo ou usa o tema preferido do sistema
// -----------------------------------------------------
export function getTheme(): Theme {
    const stored = safeGetLocalTheme();
    if (stored) return stored;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
}

// -----------------------------------------------------
// Alterna entre 'light' e 'dark'
// -----------------------------------------------------
export function toggleTheme(): Theme {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    setTheme(next);
    return next;
}

// -----------------------------------------------------
// Mantém sincronizado com alteração do tema do sistema
// (opcional — remove se não quiser)
// -----------------------------------------------------
export function enableSystemThemeSync() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', () => {
        const systemTheme: Theme = media.matches ? 'dark' : 'light';
        setTheme(systemTheme);
    });
}
