import { app } from 'electron'
import * as isDev from 'electron-is-dev'

export function getDataPath() {
    if (isDev) {
        return __dirname
    } else {
        return app.getPath('userData')
    }
}

export function handleError(location: string, error: Error) {
    console.error(location, error)
}