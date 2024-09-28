
declare global {

	type EventCallbackonMessageReceived = (event: Electron.IpcRendererEvent, label: string) => void;
	type EventCallbackOnConnected = (event: Electron.IpcRendererEvent) => void;
	type EventCallbackOnDisconnect = (event: Electron.IpcRendererEvent) => void;
	type EventCallbackOnConfigLoad = (event: Electron.IpcRendererEvent, data: AppConfig) => void;

	interface AppConfig {
		type: number, min_fsr: number, max_servo: number, duration_default: number
	}

	interface Window {
		videoApi: {
			startApp: () => void,
			loadConfig: () => void,
			onMessageReceived: (callback: EventCallbackonMessageReceived) => void,
			onConnected: (callback: EventCallbackOnConnected) => void,
			onDisconnect: (callback: EventCallbackOnDisconnect) => void,
			onConfigLoad: (callback: EventCallbackOnConfigLoad) => void,
		},
	}
}

export { };