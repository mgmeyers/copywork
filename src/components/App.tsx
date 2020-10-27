import React from 'react'
import styled from '@emotion/styled'

import {
    useLatest,
    useLocalStorage,
    useMount,
} from 'react-use'
import { TitleBar } from './TitleBar'
import { Paragraph } from './Paragraph'
import { BookData } from '../types'

export const PagePadding = styled.div({
    padding: '33vh 0',
})

function App() {
    const [paragraphIndexRaw, setParagraphIndex] = useLocalStorage(
        'paragraphIndex',
        0
    )
    const [chapterIndexRaw, setChapterIndex] = useLocalStorage(
        'chapterIndex',
        0
    )
    const [bookPath, setBookPath] = useLocalStorage<string>('bookPath')

    const paragraphIndex = paragraphIndexRaw || 0
    const chapterIndex = chapterIndexRaw || 0

    const [paragraphs, setParagraphs] = React.useState<string[] | null>(null)
    const [bookData, setBookData] = React.useState<BookData | null>(null)

    React.useEffect(() => {
        if (bookData) {
            window.apiBridge
                .getChapter(bookData.chapters[chapterIndex].id)
                .then((res: any) => {
                    setParagraphs(res.paragraphs as string[])
                })
                .catch((e: any) => console.error(e))
        }
    }, [bookData, chapterIndex])

    const incrementChapter = useLatest(() => {
        setChapterIndex(
            Math.min(chapterIndex + 1, (bookData?.chapters?.length || 1) - 1)
        )
        setParagraphIndex(0)
    })

    const decrementChapter = useLatest(() => {
        setChapterIndex(Math.max(0, chapterIndex - 1))
        setParagraphIndex(0)
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
        ({ openLast = false }: { openLast?: boolean }) => {
            window.apiBridge.open({ openLast }).then((res) => {
                if (res) {
                    setBookData(res)

                    if (bookPath !== res.filePath) {
                        setChapterIndex(0)
                        setParagraphIndex(0)
                    }

                    setBookPath(res.filePath)
                }
            })
        },
        [setParagraphIndex, setChapterIndex, setBookPath, bookPath]
    )

    useMount(() => {
        openBook({ openLast: true })
    })

    return (
        <PagePadding>
            <TitleBar
                chapterIndex={chapterIndex}
                incrementChapter={incrementChapter}
                decrementChapter={decrementChapter}
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
        </PagePadding>
    )
}

export default App
