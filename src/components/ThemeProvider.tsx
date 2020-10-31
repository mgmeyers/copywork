import React from 'react'
import chroma from 'chroma-js'

import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import useSystemTheme from 'react-use-system-theme'

import { css, Global } from '@emotion/core'
import { useTheme } from 'emotion-theming'

interface ColorScales {
    getForeground(n: number): string
    getAccent(n: number): string
}

const common = {
    font: {
        editor: {
            family: "'IBM Plex Serif', serif",
            weight: 500,
            size: 22,
            lineHeight: 1.6,
        },
        ui: {
            family: '-apple-system, BlinkMacSystemFont, sans-serif',
            weight: 400,
            size: 16,
            lineHeight: 1.4,
        },
    },
}

const defaultTheme = {
    light: {
        ...common,
        color: {
            foreground: '#222831',
            background: '#fff',
            accent: '#c3e4da',
            error: '#f00',
        },
    },
    dark: {
        ...common,
        color: {
            foreground: '#bbb',
            background: '#202124',
            accent: '#2b3331',
            error: '#f00',
        },
    },
}

export type Theme = typeof defaultTheme.light & ColorScales

function GlobalStyles() {
    const theme = useTheme<Theme>()
    return (
        <Global
            styles={css({
                'html, body': {
                    background: theme.getForeground(100),
                },

                '.ub-bg-clr_white': {
                    backgroundColor: theme.getForeground(100),
                },

                '.ub-bg_1eozcqw': {
                    backgroundColor: theme.getForeground(100),
                },

                '.ub-color_234361': {
                    color: theme.getForeground(20),
                },

                '.ub-color_425A70': {
                    color: theme.getForeground(30),
                },

                '.ub-b-btm_1px-solid-E4E7EB': {
                    borderBottom: `1px solid ${theme.getForeground(93)}`,
                },

                '.ub-b-btm_1px-solid-EDF0F2': {
                    borderBottom: `1px solid ${theme.getForeground(96)}`,
                },

                '.ub-color_1070ca': {
                    color: theme.getForeground(0)
                },

                '.css-b5v4p5[aria-current="true"], [data-css-b5v4p5][aria-current="true"], .css-b5v4p5[data-isselectable="true"]:active, [data-css-b5v4p5][data-isselectable="true"]:active': {
                    backgroundColor: theme.getForeground(94),
                },

                'svg.ub-box-szg_border-box': {
                    fill: theme.getForeground(40) + ' !important',
                },

                'input.ub-box-szg_border-box::placeholder': {
                    color: theme.getForeground(30),
                },

                '.ub-bs_17sc08g': {
                    boxShadow: '0 0 1px rgba(0, 0, 0, 0.1), 0 8px 10px -4px rgba(0, 0, 0, 0.2)'
                },

                '.css-1ii3p2c:not([disabled]):not([data-disabled]):active, [data-css-1ii3p2c]:not([disabled]):not([data-disabled]):active, .css-1ii3p2c:not([disabled]):not([data-disabled])[aria-expanded="true"], [data-css-1ii3p2c]:not([disabled]):not([data-disabled])[aria-expanded="true"], .css-1ii3p2c:not([disabled]):not([data-disabled])[data-active], [data-css-1ii3p2c]:not([disabled]):not([data-disabled])[data-active]': {
                    backgroundColor: theme.getForeground(96),
                },

                '.css-1ii3p2c:not([disabled]):not([data-disabled]):focus, [data-css-1ii3p2c]:not([disabled]):not([data-disabled]):focus, .css-1ii3p2c[data-simulate-notdisablednotdatadisabledfocus], [data-css-1ii3p2c][data-simulate-notdisablednotdatadisabledfocus]': {
                    boxShadow: `0 0 0 3px ${theme.getForeground(90)}`
                },

                '.ub-box-szg_border-box[role="dialog"]': {
                    border: `1px solid ${theme.getForeground(95)}`
                },

                '.css-b5v4p5[data-isselectable="true"]:hover, [data-css-b5v4p5][data-isselectable="true"]:hover': {
                    backgroundColor: theme.getForeground(97)
                }
            })}
        />
    )
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

        return {
            getForeground: (n: number) => foregroundScale(n / 100).hex(),
            getAccent: (n: number) => accentScale(n / 100).hex(),
        }
    }, [systemTheme])

    return (
        <EmotionThemeProvider
            theme={{
                ...defaultTheme[systemTheme],
                ...colorScales,
            }}
        >
            <GlobalStyles />
            {props.children}
        </EmotionThemeProvider>
    )
}
