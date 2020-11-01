import * as path from 'path'

import d from 'debug'
import { BrowserWindow, app, shell } from 'electron'

import { windowStateKeeper } from './userSettings'
import { initAPIHandlers } from './api'

import * as isDev from 'electron-is-dev'

const debug = d('copywork:main')
const reloadGlob = path.join(__dirname, '../../{build,src}/**/*.{js,ts,tsx}')

if (isDev) {
    require('electron-reload')(reloadGlob, {
        electron: path.join(__dirname, '../../node_modules/.bin/electron'),
        forceHardReset: true,
    })
}

let mainWindow: BrowserWindow | null = null

function createMainWindow() {
    const windowState = windowStateKeeper('main')

    mainWindow = new BrowserWindow({
        ...windowState,

        title: 'copywork',
        titleBarStyle: 'hidden',
        trafficLightPosition: {
            x: 15,
            y: 30,
        },

        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: false,
            preload: path.join(__dirname, './bridge.js'),
        },
    })

    windowState.track(mainWindow)

    if (isDev) {
        mainWindow.loadURL('http://localhost:3000/index.html')
    } else {
        mainWindow.loadURL(`file://${__dirname}/build/index.html`)
    }

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    mainWindow.webContents.on('new-window', function (e, url) {
        e.preventDefault()
        shell.openExternal(url)
    })

    return windowState
}

app.on('ready', async () => {
    try {
        const windowState = createMainWindow()
        initAPIHandlers(windowState)
    } catch (e) {
        debug('Error initializing app %s', e)
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        debug('Activating main window')
        createMainWindow()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
