export interface Chapter {
    id: string
    title: string
}

export interface BookData {
    metadata: {
        title: string
    }
    chapters: Chapter[]
}