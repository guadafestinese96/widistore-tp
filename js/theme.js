/**
 * @file        theme.js
 * @description Sistema de tema claro/oscuro con persistencia en localStorage
 *              y detección automática de preferencia del sistema.
 *              Aplica la clase 'dark' al <html> cuando el tema oscuro está activo.
 * @subject     Programación III – UTN
 * @author      UTN-FRA
 * @version     1.0.0
 * @since       2026
 */

// =============================================================================
// CLAVE DE LOCALSTORAGE
// =============================================================================
const THEME_STORAGE_KEY = 'utn-prog3-theme';

// =============================================================================
// OBTENER LA PREFERENCIA DEL SISTEMA
// =============================================================================
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// =============================================================================
// OBTENER EL TEMA GUARDADO (O DEL SISTEMA SI NO HAY SELECCIÓN)
// =============================================================================
function getSavedTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) {
        return saved;
    }
    return getSystemTheme();
}

// =============================================================================
// APLICAR EL TEMA AL DOCUMENTO
// =============================================================================
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// =============================================================================
// GUARDAR EL TEMA EN LOCALSTORAGE
// =============================================================================
function saveTheme(theme) {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
}

// =============================================================================
// ALTERNAR ENTRE CLARO Y OSCURO
// =============================================================================
function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    saveTheme(newTheme);
    // Pequeño delay para asegurar que el DOM se actualice antes de actualizar el ícono
    requestAnimationFrame(() => updateToggleIcon(newTheme));
}

// =============================================================================
// ACTUALIZAR EL ÍCONO DEL BOTÓN DE TOGGLE
// =============================================================================
function updateToggleIcon(theme) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    if (theme === 'dark') {
        button.innerHTML = '<i class="bi bi-sun"></i>'; // Sol para cambiar a claro
        button.title = 'Cambiar a tema claro';
    } else {
        button.innerHTML = '<i class="bi bi-moon"></i>'; // Luna para cambiar a oscuro
        button.title = 'Cambiar a tema oscuro';
    }
}

// =============================================================================
// INICIALIZAR EL SISTEMA DE TEMA
// =============================================================================
function initTheme() {
    const theme = getSavedTheme();
    applyTheme(theme);

    // Escuchar cambios en la preferencia del sistema (opcional)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo aplicar si el usuario no ha seleccionado manualmente
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
            const systemTheme = e.matches ? 'dark' : 'light';
            applyTheme(systemTheme);
            updateToggleIcon(systemTheme);
        }
    });
}

// =============================================================================
// AGREGAR EL BOTÓN DE TOGGLE AL ENCABEZADO
// =============================================================================
function addThemeToggle() {
    const header = document.querySelector('header nav');
    if (!header) return;

    // Verificar si el botón ya existe para evitar duplicados
    if (document.getElementById('theme-toggle')) return;

    const button = document.createElement('button');
    button.id = 'theme-toggle';
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Cambiar tema');

    // Estilos inline para el botón (pueden moverse a CSS)
    button.style.cssText = `
        background: transparent;
        border: 1px solid currentColor;
        border-radius: 4px;
        padding: 0.3rem 0.75rem;
        color: inherit;
        cursor: pointer;
        font-size: 0.85rem;
        font-weight: 500;
        transition: background-color 0.2s, color 0.2s;
    `;

    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'transparent';
    });

    button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
    });

    header.appendChild(button);

    // Actualizar el texto del botón según el tema actual
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    updateToggleIcon(currentTheme);
}

// =============================================================================
// INICIALIZAR CUANDO EL DOM ESTÉ LISTO
// =============================================================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        addThemeToggle();
    });
} else {
    initTheme();
    addThemeToggle();
}