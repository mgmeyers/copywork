import React from 'react'
import cleanTextUtils from 'clean-text-utils'

import {
    CaretWrapper,
    CaretChar,
    CompletedParagraph,
    UpcomingParagraph,
    ErrorChar,
    Incomplete,
    Complete,
} from './Textarea'

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
                {complete ? (
                    <CompletedParagraph>{string}</CompletedParagraph>
                ) : (
                    <UpcomingParagraph>{string}</UpcomingParagraph>
                )}
            </CaretWrapper>
        )
    }

    const result: DiffResult[] = []

    for (let i = 0, len = input.length; i < len; i++) {
        const prev = result.length - 1
        const isPrevErr = prev >= 0 ? result[prev].error : false

        const inputChar =
            input[i] !== ' '
                ? cleanTextUtils.replace.smartChars(input[i])
                : input[i]
        const refChar =
            string[i] !== ' '
                ? cleanTextUtils.replace.smartChars(string[i])
                : string[i]

        if (refChar !== inputChar) {
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
                    val: string[i],
                })
            } else {
                result[prev].val += string[i]
            }
        }
    }

    const char = string[input.length]

    return (
        <CaretWrapper>
            <Complete>
                {result.map((r, i) => {
                    if (r.error) {
                        return <ErrorChar key={i}>{r.val}</ErrorChar>
                    }

                    return <React.Fragment key={i}>{r.val}</React.Fragment>
                })}
            </Complete>
            <CaretChar focused={focused}>
                {char === '\n' ? ' \n' : char}
            </CaretChar>
            <Incomplete>{string.substring(input.length + 1)}</Incomplete>
        </CaretWrapper>
    )
}
