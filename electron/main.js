const { app, BrowserWindow } = require('electron')
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 525,
    height: 600,
    resizable: false,     // ❌ user cannot resize
    maximizable: false,   // ❌ disable maximize button
  });

  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "../public/index.html"));
  }
}

app.whenReady().then(() => {
  createWindow()
})