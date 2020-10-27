import styled, { CSSObject } from '@emotion/styled'

const paragraphCSS: CSSObject = {
    background: 'transparent',
    border: 'none',
    borderRadius: 0,
    display: 'block',
    fontFamily: "'Source Serif Pro', serif",
    fontSize: 'inherit',
    fontVariantLigatures: 'no-common-ligatures',
    fontWeight: 600,
    height: '100%',
    lineHeight: 1.6,
    margin: 0,
    outline: 'none',
    overflowWrap: 'break-word',
    padding: 0,
    whiteSpace: 'pre-wrap',
    width: '100%',
    wordWrap: 'break-word',
}

export const Textarea = styled.textarea({
    opacity: 0.001,
    ...paragraphCSS,
})

export const CaretWrapper = styled.div({
    color: '#000',

    '> .caret': {
        color: '#f5cb5c',
    },
    '> .caret.focused': {
        color: '#555',
        background: '#f5cb5c',
    },
    '> .post': {
        color: '#aaa',
    },
    '> .complete': {
        color: '#ccc',
    },
    '> .next': {
        color: '#ddd',
    },
    '> .pre > .error': {
        color: '#f00',
    },

    ...paragraphCSS,
})

