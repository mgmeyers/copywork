import React from 'react'
import styled from '@emotion/styled'

import { BookData } from '../types'
import { Button, ManualIcon, SelectMenu } from 'evergreen-ui'
import { Theme } from './ThemeProvider'

export const Title = styled.div<{ theme: Theme }>(({ theme }) => ({
    background: theme.getForeground(100),
    borderBottom: `1px solid ${theme.getForeground(95)}`,
    color: theme.getForeground(95),
    left: 0,
    padding: 10,
    position: 'fixed',
    textAlign: 'center',
    top: 0,
    WebkitAppRegion: 'drag',
    width: '100%',
    zIndex: 1,
}))

function getTitle(chapterTitle: string | undefined, chapterIndex: number) {
    return chapterTitle
        ? chapterTitle
        : `Section ${chapterIndex + 1}`
}

export function TitleBar({
    chapterIndex,
    bookData,
    openBook,
    setChapterIndex,
}: {
    chapterIndex: number
    openBook: (params?: { bookPath?: string }) => void
    bookData: BookData | null
    setChapterIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}) {
    const bookTitle = bookData?.metadata.title
    const chapterTitle = bookData?.chapters[chapterIndex].title

    return (
        <Title>
            <Button
                onClick={() => {
                    openBook()
                }}
                appearance="minimal"
                iconBefore={ManualIcon} height={24}
            >
                {bookTitle}
            </Button>
            {' '}/{' '}
            <SelectMenu
                closeOnSelect
                title="Select chapter"
                options={(bookData?.chapters || []).map((ch, i) => ({
                    label: getTitle(ch.title, i),
                    value: getTitle(ch.title, i),
                }))}
                selected={getTitle(chapterTitle, chapterIndex)}
                onSelect={(item) =>
                    setChapterIndex(
                        bookData?.chapters.findIndex(
                            (v) => v.title === item.value
                        ) || 0
                    )
                }
            >
                <Button appearance="minimal" height={24}>
                    {getTitle(chapterTitle, chapterIndex)}
                </Button>
            </SelectMenu>
        </Title>
    )
}
