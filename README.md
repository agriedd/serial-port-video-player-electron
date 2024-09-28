# Design

** in Indonesian

![](./docs/serialport-video-app.drawio.svg)



# electron-vite-vue
## Quick Setup

```sh
# clone the project
git clone https://github.com/agriedd/serial-port-video-player-electron

# enter the project directory
cd serial-port-video-player-electron

# install dependency
npm install

# develop
npm run dev
```
## Build

```sh
npm run build
```

## Directory

```diff
+ ├─┬ electron
+ │ ├─┬ main
+ │ │ └── index.ts    entry of Electron-Main
+ │ └─┬ preload
+ │   └── index.ts    entry of Preload-Scripts
  ├─┬ src
  │ └── main.ts       entry of Electron-Renderer
  ├── index.html
  ├── package.json
  ├── vite.config.ts
  ├─┬ resources
  │ └── config.json
```

## Configuration
```json
{
	"type": 0,
	"min_fsr": 250,
	"max_servo": 5,
	"duration_default": 30.0
}
```

## Video Placement

```dir
  ├─┬ resources
  │ ├── config.json
    ├── video-1.mp4
    └── video-2.mp4
```


# Arduino

copy and burn into arduino board

```dir
  root
  └─┬ arduino
    └── main.ino
```

# Python

```dir
  root
  └─┬ serialport
    ├── main.py
    └── config.json
```

## Configuration
just replace the serialport value with COM something your arduino port to

```json
{
	"serialport": "COM7"
}
```

### Build to EXE

install **pyinstaller**
```bash
pip install -U pyinstaller
```
then run
```bash
cd serialport && pyinstaller main.py
```
