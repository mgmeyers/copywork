import React from 'react'

import { CaretWrapper } from './Textarea'

interface DiffResult {
    error: boolean
    val: string
}

export function Caret({
    active,
    complete,
    string,
    input,
    focused,
}: {
    active: boolean
    complete: boolean
    string: string
    input: string
    focused: boolean
}) {
    if (!active) {
        return (
            <CaretWrapper>
                <span className={complete ? 'complete' : 'next'}>{string}</span>
            </CaretWrapper>
        )
    }

    const result: DiffResult[] = []

    for (let i = 0, len = input.length; i < len; i++) {
        const prev = result.length - 1
        const isPrevErr = prev >= 0 ? result[prev].error : false
        const inputChar = input[i]

        if (string[i] !== inputChar) {
            const errChar =
                inputChar === ' ' ? '_' : inputChar === '\n' ? '↩' : inputChar
            if (isPrevErr) {
                result[prev].val += errChar
            } else {
                result.push({
                    error: true,
                    val: errChar,
                })
            }
        } else {
            if (isPrevErr || prev < 0) {
                result.push({
                    error: false,
                    val: inputChar,
                })
            } else {
                result[prev].val += inputChar
            }
        }
    }

    const char = string[input.length]

    return (
        <CaretWrapper>
            <span className="pre">
                {result.map((r, i) => {
                    if (r.error) {
                        return (
                            <span key={i} className="error">
                                {r.val}
                            </span>
                        )
                    }

                    return <React.Fragment key={i}>{r.val}</React.Fragment>
                })}
            </span>
            <span className={`caret${focused ? ' focused' : ''}`}>
                {char === '\n' ? ' \n' : char}
            </span>
            <span className="post">{string.substring(input.length + 1)}</span>
        </CaretWrapper>
    )
}