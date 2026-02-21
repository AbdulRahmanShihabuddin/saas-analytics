/**
 * useTheme — Dark / Light theme composable
 * 
 * Persists theme choice in a cookie and applies it to <html data-theme="...">.
 * Usage:
 *   const { theme, toggleTheme, initTheme } = useTheme()
 */

export function useTheme() {
    const themeCookie = useCookie<'dark' | 'light'>('theme', {
        default: () => 'dark',
        maxAge: 60 * 60 * 24 * 365 // 1 year
    })

    const theme = themeCookie

    function applyTheme(t: 'dark' | 'light') {
        if (import.meta.client) {
            document.documentElement.setAttribute('data-theme', t)
        }
    }

    function toggleTheme() {
        const next = theme.value === 'dark' ? 'light' : 'dark'
        theme.value = next
        applyTheme(next)
    }

    function initTheme() {
        applyTheme(theme.value)
    }

    return { theme, toggleTheme, initTheme }
}
