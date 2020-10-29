import { dialog } from 'electron'
import { ipcMain, ipcRenderer } from 'electron'
import EPub from 'epub'
import { UserSettings } from './userSettings'
import cheerio from 'cheerio'

const channelPrefix = 'api.epub'

function openEpub(path: string) {
    return new Promise<EPub>((resolve) => {
        const epub = new EPub(path)

        epub.on('end', () => {
            resolve(epub)
        })

        epub.parse()
    })
}

function getChapters(epub: EPub) {
    return epub.flow.map((f) => ({ id: f.id, title: f.title }))
}

export function initAPIHandlers(windowState: UserSettings) {
    let epub: EPub | null = null

    ipcMain.handle(`${channelPrefix}.open`, async (_, bookPath?: string) => {
        let result: Electron.OpenDialogReturnValue | null = null

        if (!bookPath) {
            result = await dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [
                    {
                        name: 'epub',
                        extensions: ['epub'],
                    },
                ],
            })
        }

        const filePath = bookPath
            ? bookPath
            : result?.canceled === false
            ? result.filePaths[0]
            : null

        if (filePath) {
            epub = await openEpub(filePath)
            windowState.setCurrentFile(filePath)

            return {
                filePath,
                metadata: epub.metadata,
                chapters: getChapters(epub),
            }
        } else {
            return null
        }
    })

    ipcMain.handle(`${channelPrefix}.getChapter`, (_, id: string) => {
        return new Promise((resolve, reject) => {
            if (!epub) {
                return reject('No file loaded')
            }

            epub.getChapterRaw(id, (e, str) => {
                if (e) {
                    reject(e)
                }

                const $ = cheerio.load(str.replace(/<br[^>]*>/g, '\n\n'))
                const paragraphs = $('body').text()
                    .split(/[\n\r]+/g).map(p => p.trim() + ' ')
                    .filter(p => {
                        return !!p.trim()
                    })

                resolve({
                    paragraphs 
                })
            })
        })
    })
}

export const apiInvokers = {
    open: (opts?: { bookPath?: string }) =>
        ipcRenderer.invoke(`${channelPrefix}.open`, opts?.bookPath),
    getChapter: (id: string) =>
        ipcRenderer.invoke(`${channelPrefix}.getChapter`, id),
}
