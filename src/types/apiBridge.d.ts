import EPub from 'epub'

interface APIBridge {
    open: (opts?: { bookPath?: string }) => Promise<{
        filePath: string,
        metadata: EPub.metadata,
        chapters: Array<{ id: string, title: string }>,
    }>,
    getChapter: (id: string) => Promise<{ paragraphs: string[] }>,
}

declare global {
    interface Window {
        apiBridge: APIBridge
    }
}