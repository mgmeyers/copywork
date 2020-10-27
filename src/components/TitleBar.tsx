import React from 'react'
import styled from '@emotion/styled'
import { BsCaretRightFill, BsCaretLeftFill } from 'react-icons/bs'
import { RiBookOpenLine } from 'react-icons/ri'

import { BookData } from '../types'

export const Title = styled.div({
    background: '#ffffff',
    borderBottom: '1px solid #efefef',
    color: '#999',
    fontSize: 14,
    left: 0,
    padding: 15,
    position: 'fixed',
    textAlign: 'center',
    top: 0,
    WebkitAppRegion: 'drag',
    width: '100%',
    zIndex: 1,
})

export const ArrowButton = styled.span<{ visible: boolean }>(({ visible }) => ({
    display: 'inline-block',
    cursor: 'pointer',
    visibility: visible ? 'visible' : 'hidden',
    svg: {
        position: 'relative',
        top: 2,
    },
}))

export const ArrowPadding = styled.span({
    display: 'inline-block',
    content: "' '",
    marginRight: '0.75em',
})

export function TitleBar({
    chapterIndex,
    decrementChapter,
    incrementChapter,
    bookData,
    openBook,
}: {
    chapterIndex: number
    openBook: (params: { openLast: boolean }) => void
    decrementChapter: React.MutableRefObject<() => void>
    incrementChapter: React.MutableRefObject<() => void>
    bookData: BookData | null
}) {
    const bookTitle = bookData?.metadata.title
    const chapterTitle = bookData?.chapters[chapterIndex].title

    return (
        <Title>
            <ArrowButton
                visible={chapterIndex > 0}
                onClick={() => {
                    decrementChapter.current()
                }}
            >
                <BsCaretLeftFill />
            </ArrowButton>
            <ArrowPadding />
            <ArrowButton
                visible
                onClick={() => {
                    openBook({ openLast: false })
                }}
            >
                <RiBookOpenLine /> {bookTitle}
            </ArrowButton>{' '}
            / {chapterTitle ? `${chapterTitle}` : `Section ${chapterIndex + 1}`}
            <ArrowPadding />
            <ArrowButton
                visible={chapterIndex < (bookData?.chapters.length || 0)}
                onClick={() => {
                    incrementChapter.current()
                }}
            >
                <BsCaretRightFill />
            </ArrowButton>
        </Title>
    )
}