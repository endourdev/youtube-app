// We import all modules here.
const { app, BrowserWindow } = require("electron");
const RPC = require("discord-rpc");
const config = require("./src/config/config.json");
const rpc = new RPC.Client({
    transport: "ipc"
});

// Main function. He define title and others stuff.
function createWindow () {
  const win = new BrowserWindow({
    title: "YouTube Browser",
    autoHideMenuBar: true,
    width: 1280,
    height: 720,
  });

  win.loadURL("https://youtube.com/");

};

// We create main window here.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    };
  });
});

app.on("ready", () => {

  rpc.on("ready", () => {

    // We set button.
    rpc.setActivity({
      buttons: [
        { label: `Développez avec nous`, url: `${config.githubURL}` },
        { label : `Rejoignez le suppirt`, url: `${config.discord}`}
    ],

      // We set all details for your rpc.
      details: `Regarde des vidéos`,
      startTimestamp: new Date(),
      largeImageKey: "youtube",
      largeImageText: "Le divertissement est un bien essentiel."
        
        
    });
  });

    // Connect to Discord with discord-rpc module
    rpc.login({ 
      clientId: config.clientId,
    });

});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  };
});