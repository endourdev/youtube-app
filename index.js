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
  const url = win.loadURL("https://youtube.com/");

  url.catch()
};

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    };
  });
});

function titreVideos() {
  fetch(url)
  .then(response => {
    const headers = response.headers;
    const titleVids = headers.get('title');
    console.log(titleVids, headers);
  });
  console.warn("Nous n'accédons à aucune de vos données...");
  console.log(titleVids)
}

rpc.on("ready", () => {
    
  rpc.setActivity({
    buttons: [
      { label: `Développez avec nous`, url: `https://discord.gg/secure-support` }
  ],
      details: `Regarde des vidéos`,
      startTimestamp: new Date(),
      largeImageKey: "youtube",
      largeImageText: "Le divertissement est un bien essentiel."
      
      
  });
  const terminal_msg = "Le rich presence est en place regarde ton Discord !"
  console.log(terminal_msg);
  const ok = true
  if (ok === true) {
    console.log(ok)
  } else {
    console.warn("Le rich presence n'as pas été mis en place !")
  }
});

rpc.login({
  clientId: "1100466716074586132"
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  };
});