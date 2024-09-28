import { contextBridge, ipcRenderer } from 'electron';

type EventCallbackOnMessageReceived = (event: Electron.IpcRendererEvent, label: string) => void;
type EventCallbackOnConfigLoad = (event: Electron.IpcRendererEvent, data: { type: number, min_fsr: number, max_servo: number, duration_default: number }) => void;
type EventCallbackOnConnected = (event: Electron.IpcRendererEvent, e: boolean) => void;

contextBridge.exposeInMainWorld('videoApi', {
	startApp: () => {
		ipcRenderer.send('start-app');
	},
	loadConfig: () => {
		ipcRenderer.send('load-config');
	},
	
	onMessageReceived: (callback: EventCallbackOnMessageReceived) => {
		ipcRenderer.on('received-message', callback);
	},
	onConfigLoad: (callback: EventCallbackOnConfigLoad) => {
		ipcRenderer.on('config', callback);
	},
	onConnected: (callback: EventCallbackOnConnected) => {
		ipcRenderer.on('connected', callback);
	},
	onDisconnect: (callback: EventCallbackOnConnected) => {
		ipcRenderer.on('disconnect', callback);
	},
});