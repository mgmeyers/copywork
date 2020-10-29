import React from 'react'
import chroma from 'chroma-js'

import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import useSystemTheme from 'react-use-system-theme'

const common = {
    font: {
        editor: {
            family: "'Source Serif Pro', serif",
            weight: 600,
            size: 22,
            lineHeight: 1.6,
        },
        ui: {
            family: "-apple-system, BlinkMacSystemFont, sans-serif",
            weight: 400,
            size: 16,
            lineHeight: 1.4,
        }
    },
}

const defaultTheme = {
    light: {
        ...common,
        color: {
            foreground: '#000',
            background: '#fff',
            accent: '#f5cb5c',
            error: '#f00',
        },
    },
    dark: {
        ...common,
        color: {
            foreground: '#fff',
            background: '#000',
            accent: '#f5cb5c',
            error: '#f00',
        },
    },
}

export type Theme = typeof defaultTheme.light & {
    getForeground(n: number): string
    getAccent(n: number): string
}

export function ThemeProvider(props: React.PropsWithChildren<any>) {
    const systemTheme = useSystemTheme('dark') as 'light' | 'dark'

    const colorScales = React.useMemo(() => {
        const foregroundScale = chroma.scale([
            defaultTheme[systemTheme].color.foreground,
            defaultTheme[systemTheme].color.background,
        ])

        const accentScale = chroma.scale([
            defaultTheme[systemTheme].color.accent,
            defaultTheme[systemTheme].color.background,
        ])

        return({
            getForeground: (n: number) => foregroundScale(n / 100).hex(),
            getAccent: (n: number) => accentScale(n / 100).hex(),
        })
    }, [systemTheme])

    return (
        <EmotionThemeProvider theme={{
            ...defaultTheme[systemTheme],
            ...colorScales
        }}>
            {props.children}
        </EmotionThemeProvider>
    )
}
