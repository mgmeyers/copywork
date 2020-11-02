import { BrowserWindow, Rectangle, screen } from 'electron'
import appSettings from 'electron-settings'

export interface WindowState extends Partial<Rectangle> {
    isMaximized?: boolean
    currentFile?: string
}

export interface StateSetters {
    track: (win: BrowserWindow) => void
    setCurrentFile: (filePath: string) => void
}

export type UserSettings = WindowState & StateSetters

function getDefaultWindowState(): WindowState {
    const workArea = screen.getPrimaryDisplay().workArea

    return {
        x: undefined,
        y: undefined,
        width: Math.floor(workArea.width * 0.8),
        height: Math.floor(workArea.height * 0.8),
        isMaximized: false,
        currentFile: undefined,
    }
}

export function windowStateKeeper(
    windowName: string
): UserSettings {
    let window: BrowserWindow
    let windowState: WindowState

    function loadState(): WindowState {
        const windowHasSettings = appSettings.hasSync(
            `windowState.${windowName}`
        )

        if (windowHasSettings) {
            return appSettings.getSync(`windowState.${windowName}`) as any
        }

        return getDefaultWindowState()
    }

    function saveState() {
        if (!windowState.isMaximized) {
            windowState = window.getBounds()
        }

        windowState.isMaximized = window.isMaximized()

        appSettings.set(`windowState.${windowName}`, windowState as any)
    }

    function track(win: BrowserWindow) {
        window = win

        win.on('resize', saveState)
        win.on('move', saveState)
        win.on('close', saveState)
    }

    function setCurrentFile(file: string) {
        windowState.currentFile = file
        appSettings.set(`windowState.${windowName}`, windowState as any)
    }

    windowState = loadState()

    return {
        x: windowState.x,
        y: windowState.y,
        width: windowState.width,
        height: windowState.height,
        isMaximized: windowState.isMaximized,
        currentFile: windowState.currentFile,
        track,
        setCurrentFile,
    }
}