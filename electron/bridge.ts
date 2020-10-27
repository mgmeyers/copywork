import { contextBridge } from 'electron'
import { apiInvokers } from './api'

contextBridge.exposeInMainWorld('apiBridge', apiInvokers)