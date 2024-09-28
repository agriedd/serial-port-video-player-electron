import { ipcMain } from 'electron';
// const buffer = require('buffer');
import udp from 'dgram';
import app from 'electron';
import * as fs from 'fs/promises';
import { readFileSync } from 'fs';



export function appStartService(browserWindow: Electron.CrossProcessExports.BrowserWindow) {

	console.log('app service started');
	console.log('app load config');


	ipcMain.on('start-app', async (_event: Electron.IpcMainEvent) => {

		console.log('video is playing');
		console.log('listening to ');


		startConnection(browserWindow);
	});

	ipcMain.on('load-config', async (_event: Electron.IpcMainEvent) => {
		try {

			let path = "./resources/config.json"
			const json = JSON.parse(readFileSync(path).toString());
	
			browserWindow.webContents.send('config', json);
	
		} catch (error) {
			console.log("🚀 ~ ipcMain.on ~ error:", error)
		}
	});
	// ipcMain.on('load-image-list', async (_event: Electron.IpcMainEvent) => {

	// 	console.log('start load json images');

	// 	loadJsonFile(browserWindow);
	// });
}

function startConnection(browserWindow: Electron.CrossProcessExports.BrowserWindow) {
	// creating a client socket
	const client = udp.createSocket('udp4');

	//buffer msg
	const data = Buffer.from('siddheshrane');

	console.log('memulai sambungan...');

	client.on('message', function (msg: unknown, _info: unknown) {
		
		// console.log('Data received from server : ' + msg.toString());
		browserWindow.webContents.send('received-message', msg.toString());

		// if (typeof msg === 'string') {
		// 	console.log('Data received from server : ' + msg.toString());
		// 	// browserWindow.webContents.send('show-image-label', msg.toString());
		// 	if (typeof msg === 'string') {
		// 		console.log('Data received from server : ' + msg.toString());
		// 		// send message to renderer
		// 	}
		// }
	});

	client.on('connect', function () {
		console.log('tersambung!');
		browserWindow.webContents.send('connected', true);
		
	});
	client.on('close', function () {
		console.log('ditutup!');
		browserWindow.webContents.send('disconnect', true);
	});
	client.on('error', function () {
		// try to reconnection
		// send message to renderer
		// reconnecting
		// recursive connection
		console.log('Terputus!');
		console.log('Mencoba menghubungkan kembali..');
		client.close();
		setTimeout(() => {
			startConnection(browserWindow);
		}, 3000);
	});

	//sending msg
	client.send(data, 12000, 'localhost', function (error: unknown) {
		if (error) {

			client.close();
			console.log('Terputus!');
			console.log('Mencoba menghubungkan kembali..');

			setTimeout(() => {
				startConnection(browserWindow);
			}, 3000);
		} else {
			console.log('Data sent !!!');
		}
	});
}