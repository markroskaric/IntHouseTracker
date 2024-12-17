import { app, BrowserWindow } from "electron";
import registerListeners from "./helpers/ipc/listeners-register";
// "electron-squirrel-startup" seems broken when packaging with vite
//import started from "electron-squirrel-startup";
import path from "path";

const inDevelopment = process.env.NODE_ENV === "development";

function createWindow() {
    const preload = path.join(__dirname, "preload.js");
    const mainWindow = new BrowserWindow({
        width: 1300,
        height: 800,
        webPreferences: {
            devTools: inDevelopment,
            contextIsolation: true,
            nodeIntegration: true,
            nodeIntegrationInSubFrames: false,
            webSecurity: false,

            preload: preload,
        },
        autoHideMenuBar: true,
    });
    registerListeners(mainWindow);

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(
            path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
        );
    }

    // Handle login event for Basic Authentication
    app.on("login", (event, webContents, details, authInfo, callback) => {
        event.preventDefault(); // Prevent the default action (cancel the request)
        const username = "ADMIN"; // Replace with your actual username
        const password = "SBTAdmin!"; // Replace with your actual password
        callback(username, password); // Provide credentials
    });
}

app.whenReady().then(createWindow);

//osX only
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
//osX only ends
