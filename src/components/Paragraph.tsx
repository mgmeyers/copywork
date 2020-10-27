import React from 'react'
import styled from '@emotion/styled'

import {
    useEvent,
    useLatest,
    useUpdateEffect,
} from 'react-use'
import { offset } from 'caret-pos'
import scroll from 'scroll'
import { Textarea } from './Textarea'
import { Caret } from './Caret'

export const ParagraphWrapper = styled.div({
    position: 'relative',
    maxWidth: '50ch',
    display: 'grid',
    gridTemplate: '0fr / 1fr',
    placeItems: 'center',
    fontSize: 22,
    margin: '0 auto 1em',

    '*': {
        boxSizing: 'border-box',
    },

    '> *': {
        gridColumn: '1 / 1',
        gridRow: '1 / 1',
    },
})

export function Paragraph({
    string,
    active,
    complete,
    getParagraph,
    index,
}: {
    string: string
    active: boolean
    complete: boolean
    getParagraph: (index: number) => void
    index: number
}) {
    const [input, setInput] = React.useState('')
    const [focused, setFocused] = React.useState(false)
    const [offsetTop, setOffsetTop] = React.useState(0)
    const inputRef = React.useRef<HTMLTextAreaElement>(null)

    const setCaretPos = useLatest(() => {
        if (inputRef.current) {
            const caretOffset = offset(inputRef.current)
            setOffsetTop(caretOffset.top + caretOffset.height / 2)
        }
    })

    const setFocus = useLatest(() => {
        inputRef.current?.focus()
        inputRef.current?.setSelectionRange(input.length, input.length)
        setCaretPos.current()
    })

    React.useEffect(() => {
        if (active) {
            setFocus.current()
        }
    }, [active, setFocus])

    useUpdateEffect(() => {
        scroll.top(
            document.documentElement,
            offsetTop - window.innerHeight / 2,
            { duration: 500 }
        )
    }, [offsetTop])

    const onClick = React.useCallback(() => {
        if (active) {
            setFocus.current()
        }
    }, [active, setFocus])

    useEvent('click', onClick)

    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const val = e.target.value

            setInput(val)

            if (val.length === string.length) {
                getParagraph(index + 1)
            } else {
                setCaretPos.current()
            }
        },
        [index, getParagraph, string.length, setCaretPos]
    )
    const onFocus = React.useCallback(() => setFocused(true), [])
    const onBlur = React.useCallback(() => setFocused(false), [])

    return (
        <ParagraphWrapper>
            <Caret
                active={active}
                complete={complete}
                focused={focused}
                string={string}
                input={input}
            />
            <Textarea
                value={input}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
                autoComplete="off"
                onChange={onChange}
            />
        </ParagraphWrapper>
    )
}