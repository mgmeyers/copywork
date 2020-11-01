import React from 'react'
import styled from '@emotion/styled'
import { Button } from 'evergreen-ui'

import { useLatest, useLocalStorage, useMount } from 'react-use'
import { TitleBar } from './TitleBar'
import { Paragraph } from './Paragraph'
import { BookData } from '../types'
import { Theme } from './ThemeProvider'

export const AppWrapper = styled.div<{ theme: Theme }>(({ theme }) => ({
    fontFamily: theme.font.ui.family,
    fontSize: theme.font.ui.size,
    fontWeight: theme.font.ui.weight,
    lineHeight: theme.font.ui.lineHeight,
    padding: '7em 0',
    minHeight: 'calc(100% - 14em)',
    width: '100%'
}))

export const ButtonWrapper = styled.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})

function App() {
    const [paragraphIndexRaw, setParagraphIndex] = useLocalStorage(
        'paragraphIndex',
        0
    )
    const [chapterIndexRaw, setChapterIndexRaw] = useLocalStorage(
        'chapterIndex',
        0
    )
    const [bookPath, setBookPath] = useLocalStorage<string>('bookPath')

    const paragraphIndex = Number(paragraphIndexRaw) || 0
    const chapterIndex = Number(chapterIndexRaw) || 0

    const [paragraphs, setParagraphs] = React.useState<string[] | null>(null)
    const [bookData, setBookData] = React.useState<BookData | null>(null)
    const [
        hasTriggeredInitialLoad,
        setHasTriggeredInitialLoad,
    ] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (bookData && bookData.chapters[chapterIndex]) {
            window.apiBridge
                .getChapter(bookData.chapters[chapterIndex].id)
                .then((res: any) => {
                    setParagraphs(res.paragraphs as string[])
                })
                .catch((e: any) => console.error(e))
        }
    }, [bookData, chapterIndex])

    const setChapterIndex = React.useCallback((index: number) => {
        setChapterIndexRaw(index)
        setParagraphIndex(0)
    }, [])

    const incrementChapter = useLatest(() => {
        setChapterIndex(
            Math.min(chapterIndex + 1, (bookData?.chapters?.length || 1) - 1)
        )
    })

    const paragraphCount = useLatest(paragraphs?.length || 0)
    const getParagraph = React.useCallback(
        (index: number) => {
            if (index >= paragraphCount.current) {
                incrementChapter.current()
                setParagraphIndex(0)
            } else {
                setParagraphIndex(index)
            }
        },
        [paragraphCount, incrementChapter, setParagraphIndex]
    )

    const skipEmptyChapter = useLatest(() => {
        if (
            paragraphs &&
            paragraphs.filter((p) => !!p).length === 0 &&
            bookData &&
            chapterIndex < bookData.chapters.length - 1
        ) {
            incrementChapter.current()
        }
    })

    React.useEffect(() => {
        skipEmptyChapter.current()
    }, [paragraphs, skipEmptyChapter])

    const openBook = React.useCallback(
        (opts?: { bookPath?: string }) => {
            window.apiBridge
                .open(opts)
                .then((res) => {
                    if (res) {
                        setBookData(res)

                        if (bookPath !== res.filePath) {
                            setChapterIndex(0)
                        }

                        setBookPath(res.filePath)
                    }

                    setHasTriggeredInitialLoad(true)
                })
                .catch((e) => {
                    console.error(e)
                    setHasTriggeredInitialLoad(true)
                })
        },
        [setParagraphIndex, setChapterIndex, setBookPath, bookPath]
    )

    useMount(() => {
        if (bookPath) {
            openBook({ bookPath })
        } else {
            setHasTriggeredInitialLoad(true)
        }
    })

    if (hasTriggeredInitialLoad && !bookData) {
        return (
            <AppWrapper>
                <ButtonWrapper>
                    <Button onClick={() => openBook()} height={40}>Open EPub File</Button>
                </ButtonWrapper>
            </AppWrapper>
        )
    }

    return (
        <AppWrapper>
            <TitleBar
                chapterIndex={chapterIndex}
                setChapterIndex={setChapterIndex}
                openBook={openBook}
                bookData={bookData}
            />
            {paragraphs?.map((p, i) => (
                <Paragraph
                    key={`${chapterIndex}-${i}`}
                    index={i}
                    active={paragraphIndex === i}
                    complete={paragraphIndex > i}
                    string={p}
                    getParagraph={getParagraph}
                />
            ))}
        </AppWrapper>
    )
}

export default App
