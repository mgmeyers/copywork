import styled, { CSSObject } from '@emotion/styled'
import { Theme } from './ThemeProvider'

const paragraphCSS: CSSObject = {
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
    display: 'block',
    fontFamily: "'Source Serif Pro', serif",
    fontSize: 'inherit',
    fontVariantLigatures: 'no-common-ligatures',
    height: '100%',
    fontWeight: 'inherit',
    lineHeight: 'inherit',
    margin: 0,
    outline: 'none',
    overflowWrap: 'break-word',
    padding: 0,
    whiteSpace: 'pre-wrap',
    width: '100%',
    wordWrap: 'break-word',
}

export const Textarea = styled.textarea({
    ...paragraphCSS,
    opacity: 0.001,
})

export const CaretWrapper = styled.div<{ theme: Theme }>(({ theme }) => ({
    ...paragraphCSS,
    color: theme.getForeground(60),
}))

export const CaretChar = styled.span<{ theme: Theme; focused: boolean }>(
    ({ theme }) => ({
        color: theme.getForeground(20),
        background: theme.getAccent(0),
        position: 'relative',
        zIndex: 0,
    })
)

export const Complete = styled.span<{ theme: Theme }>(({ theme }) => ({
    color: theme.getForeground(0),
    position: 'relative',
    zIndex: 1,
}))

export const Incomplete = styled.span<{ theme: Theme }>(({ theme }) => ({
    color: theme.getForeground(60),
}))

export const CompletedParagraph = styled.span<{ theme: Theme }>(
    ({ theme }) => ({
        color: theme.getForeground(80),
    })
)

export const UpcomingParagraph = styled.span<{ theme: Theme }>(({ theme }) => ({
    color: theme.getForeground(80),
}))

export const ErrorChar = styled.span<{ theme: Theme }>(({ theme }) => ({
    color: theme.color.error,
}))
