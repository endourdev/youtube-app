const { app, BrowserWindow } = require('electron');
const path = require('path');
const RPC = require("discord-rpc");
const { url } = require('inspector');
const rpc = new RPC.Client({
    transport: "ipc"
});

function createWindow () {
  const win = new BrowserWindow({
    title: "YouTube Browser",
    autoHideMenuBar: true,
    width: 1280,
    height: 720,
  });

  win.loadURL("https://youtube.com/");

};

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    };
  });
});

let titleVids;

function titreVideos() {
  fetch(window.location.href)
  .then(response => {
    const headers = response.headers;
    let titleVids = headers.get('title');
    console.log(titleVids, headers);
  });
  console.log(titleVids)
};

app.on("ready", () => {

rpc.on("ready", () => {
    
  rpc.setActivity({
    buttons: [
      { label: `Développez avec nous`, url: `https://github.com/Wodd-Off/youtube-app` }
  ],
      details: `Regarde des vidéos`,
      startTimestamp: new Date(),
      largeImageKey: "youtube",
      largeImageText: "Le divertissement est un bien essentiel."
      
      
  });
    const terminal_msg = "Le rich presence est en place regarde ton Discord !"
    console.log(terminal_msg);
  });
  rpc.login({ 
    clientId: "1101068445673586709"
  });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  };
});