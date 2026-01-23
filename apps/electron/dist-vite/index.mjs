import { app as s, dialog as I, BrowserWindow as m, protocol as $, Tray as W, Menu as L, ipcMain as N, nativeTheme as j, shell as T, session as V, net as O } from "electron";
import P, { join as d } from "node:path";
import { createHandler as q } from "next-electron-rsc";
import { parseArgs as M } from "node:util";
import { setTimeout as R } from "node:timers/promises";
import H from "electron-store";
import _ from "electron-updater";
import { existsSync as B } from "node:fs";
import { readdir as z, stat as G, rm as Q } from "node:fs/promises";
import { format as J } from "date-fns";
import i from "electron-log/main.js";
globalThis.__dirname ||= import.meta.dirname;
s.isPackaged || (s.getVersion = () => "0.0.1");
I.showErrorBox = function(t, e) {
  console.error(`Error logged without system dialog: ${t}
${e}`);
};
process.on("uncaughtException", (t) => {
  console.error("Uncaught exception:", t);
});
process.on("unhandledRejection", (t) => {
  console.error("Unhandled promise rejection:", t);
});
const v = s.isPackaged, h = (() => {
  const e = M({
    options: {
      /** Log level */
      "app-log-level": {
        type: "string",
        default: v ? "info" : "silly"
        // Default: info
        // default: 'info',  // Default: info
      },
      /** Specify APP runtime environment (dev, prod). Default is empty, determined by env vars */
      "app-env": {
        type: "string",
        default: ""
      }
    },
    strict: !1
    // Default: true, throws on unknown options
  });
  return console.log("appCliStartArgs", e), e.values;
})();
h["app-log-level"];
const K = h["app-env"] ? h["app-env"] === "dev" : !0;
h["app-env"] && h["app-env"];
process.platform;
process.platform;
const X = process.platform === "linux", b = s.getPath("sessionData"), f = {
  /** Application data root directory */
  sessionDir: b,
  /** System locale */
  lang: s.getLocale(),
  /** Temporary files directory */
  tempDir: d(b, "temp"),
  /** Application logs directory */
  logsDir: s.getPath("logs"),
  /** Configuration file */
  configFile: d(b, "config.json"),
  /** Preload script file path */
  get preloadFilePath() {
    return v ? d(import.meta.dirname, "./preload/index.cjs") : d(import.meta.dirname, "../../preload/dist/index.cjs");
  },
  /** Web resource base URL */
  // get webBaseURL() {
  //   return !isPackaged && import.meta.env.VITE_DEV_SERVER_URL !== undefined
  //     ? import.meta.env.VITE_DEV_SERVER_URL
  //     : `file://${join(import.meta.dirname, './web/index.html')}`
  // },
  get webBaseURL() {
    return "http://localhost:3000";
  }
};
console.debug("appConfig", f);
const c = K ? "bqy-dev" : "bqy", S = "bqy-media";
let U;
async function Y() {
  const t = new m({
    // Use 'ready-to-show' event to show window
    show: !1,
    webPreferences: {
      // https://www.electronjs.org/docs/latest/api/webview-tag#warning
      webviewTag: !1,
      sandbox: !X,
      spellcheck: !1,
      preload: f.preloadFilePath
    }
  });
  t.on("ready-to-show", () => {
    t?.show(), v || t?.webContents.openDevTools({ mode: "detach" });
  });
  const e = s.getAppPath(), o = process.env.NODE_ENV === "development", n = P.join(e, "dist", "web/apps/web/");
  console.log("APP", e);
  const { createInterceptor: u, localhostUrl: y } = q({
    dev: o,
    dir: n,
    protocol: $,
    debug: !0,
    turbo: !0
  });
  return U = await u({
    session: t.webContents.session
  }), t.on("close", () => {
    U?.();
  }), await t.loadURL(f.webBaseURL), console.log("[APP] Loaded", y), t;
}
let r;
async function k() {
  (!r || r.isDestroyed()) && (r = await Y()), r.isMinimized() && r.restore(), r.setSkipTaskbar(!1), r.setAlwaysOnTop(!0), r.show(), r.focus(), r.setAlwaysOnTop(!1);
}
function p() {
  return r;
}
let l;
async function Z() {
  if (await R(), l)
    return l.setContextMenu(D()), l;
  const t = P.join(import.meta.dirname, "..", "resources/tray.png");
  return l = new W(t), l.setToolTip(s.getName()), l.setContextMenu(D()), l.on("click", () => {
    p()?.show(), p()?.setSkipTaskbar(!1);
  }), l;
}
function D() {
  return L.buildFromTemplate([
    {
      label: "show",
      click: () => {
        p()?.show();
      }
    },
    {
      label: "exit",
      click: () => {
        l.destroy(), p()?.destroy();
      }
    }
  ]);
}
class ee {
  channel;
  listeners = {};
  constructor(e = "IPC-bridge") {
    this.channel = e, this.bindMessage();
  }
  on(e, o) {
    if (this.listeners[e])
      throw new Error(`Handler for message ${String(e)} already exists`);
    this.listeners[e] = o;
  }
  off(e) {
    this.listeners[e] && delete this.listeners[e];
  }
  async send(e, ...o) {
    m.getAllWindows().forEach((u) => {
      u.webContents.send(this.channel, {
        name: e,
        payload: o
      });
    });
  }
  bindMessage() {
    N.handle(this.channel, this.handleReceivingMessage.bind(this));
  }
  async handleReceivingMessage(e, o) {
    try {
      if (this.listeners[o.name])
        return {
          type: "success",
          result: await this.listeners[o.name](
            e,
            ...o.payload
          )
        };
      throw new Error(`Unknown IPC message ${String(o.name)}`);
    } catch (n) {
      return {
        type: "error",
        error: n.toString()
      };
    }
  }
}
const te = {
  theme: {
    type: "string",
    enum: ["system", "light", "dark"],
    default: "system"
  },
  autoLaunch: {
    type: "boolean",
    default: !1
  },
  allowPrerelease: {
    type: "boolean",
    default: !1
  },
  downloadMirror: {
    anyOf: [{ type: "string" }, { type: "null" }]
  },
  lastCheckedAt: {
    anyOf: [{ type: "number" }, { type: "null" }]
  },
  downloadDir: {
    type: "string",
    default: ""
  }
}, A = new H({
  schema: te,
  clearInvalidConfig: !0
}), { autoUpdater: a } = _, x = d(import.meta.dirname, "../dev-app-update.yml"), oe = ["checking", "available", "downloading", "downloaded", "not-available", "error"];
class se {
  state = { status: "idle" };
  updateDownloaded = !1;
  checkingPromise = null;
  devConfigEnabled;
  listeners = /* @__PURE__ */ new Set();
  constructor() {
    this.devConfigEnabled = !s.isPackaged && B(x), this.devConfigEnabled && (a.forceDevUpdateConfig = !0, a.updateConfigPath = x), a.autoDownload = !0, a.autoInstallOnAppQuit = !1, a.fullChangelog = !0, a.logger = console, a.on("checking-for-update", () => {
      this.setState({ status: "checking", error: void 0 });
    }), a.on("update-available", (e) => {
      this.updateDownloaded = !1, this.setState({ status: "available", info: e, progress: void 0 });
    }), a.on("update-not-available", (e) => {
      this.updateDownloaded = !1, this.setState({ status: "not-available", info: e, progress: void 0 });
    }), a.on("error", (e) => {
      const o = e instanceof Error ? e.message : String(e);
      this.updateDownloaded = !1, this.setState({ status: "error", error: o, progress: void 0 });
    }), a.on("download-progress", (e) => {
      this.setState({ status: "downloading", progress: e });
    }), a.on("update-downloaded", (e) => {
      this.updateDownloaded = !0, this.setState({ status: "downloaded", info: e, progress: void 0 });
    });
  }
  /** Manually trigger an update check */
  async checkForUpdates() {
    return this.canCheckUpdates() ? this.checkingPromise ? this.checkingPromise : (this.checkingPromise = a.checkForUpdates().then((e) => (e?.updateInfo && this.isNewerVersion(e.updateInfo.version) ? this.setState({ status: "available", info: e.updateInfo }) : this.setState({ status: "not-available", info: e?.updateInfo, progress: void 0 }), this.state)).catch((e) => {
      const o = e instanceof Error ? e.message : String(e);
      return this.setState({ status: "error", error: o, progress: void 0 }), this.state;
    }).finally(() => {
      this.checkingPromise = null;
    }), this.checkingPromise) : (this.setState({ status: "error", error: "No update feed configured for the current runtime", progress: void 0 }), this.state);
  }
  /** Get the latest known update state */
  getState() {
    return this.state;
  }
  /** Subscribe to updater state changes */
  onStateChange(e) {
    return this.listeners.add(e), () => {
      this.listeners.delete(e);
    };
  }
  /** Whether there is a downloadable update */
  hasUpdate() {
    return this.updateDownloaded ? !0 : this.state.info !== void 0 && this.isNewerVersion(this.state.info.version) && (this.state.status === "available" || this.state.status === "downloading");
  }
  /** Download (if necessary) and restart to install */
  async upgradeNow() {
    if (!this.hasUpdate())
      throw new Error("No update is currently available");
    this.updateDownloaded || await a.downloadUpdate(), a.quitAndInstall(!1, !0);
  }
  canCheckUpdates() {
    return s.isPackaged || this.devConfigEnabled;
  }
  isNewerVersion(e) {
    try {
      const o = s.getVersion();
      return this.normalizeVersion(e) > this.normalizeVersion(o);
    } catch {
      return e !== s.getVersion();
    }
  }
  normalizeVersion(e) {
    return Number(e.split(".").map((o) => o.padStart(2, "0")).join(""));
  }
  setState(e) {
    const o = e.status && oe.includes(e.status);
    this.state = {
      ...this.state,
      ...e,
      checkedAt: o ? Date.now() : this.state.checkedAt
    }, this.emitState();
  }
  emitState() {
    for (const e of this.listeners)
      e(this.state);
  }
}
const g = new se();
class ne {
  state = { status: "idle" };
  async checkForUpdates() {
    return this.state = {
      status: "not-available",
      checkedAt: Date.now()
    }, this.state;
  }
  hasUpdate() {
    return !1;
  }
  async upgradeNow() {
  }
}
const E = new ne();
function ae(t) {
  const e = g.onStateChange((o) => {
    t.send("app:updateState", o);
  });
  s.once("before-quit", () => {
    e();
  }), t.on("app:getAppVersion", (o) => s.getVersion()), t.on("app:setSystemTheme", (o, n) => {
    j.themeSource = n;
  }), t.on("app:saveSoftConfig", (o, n) => {
    Object.assign(A.store, n);
  }), t.on("app:getSoftConfig", (o) => ({ ...A })), t.on("app:checkForUpdates", (o) => g.checkForUpdates()), t.on("app:getUpdateState", () => g.getState()), t.on("app:checkWebForUpdates", (o) => E.checkForUpdates()), t.on("app:hasUpdate", (o) => g.hasUpdate()), t.on("app:quitAndInstall", async (o, n) => {
    n.type === "app" ? g.upgradeNow() : n.type === "web" && await E.upgradeNow();
  }), t.on("app:showLogDir", (o) => {
    T.openPath(f.logsDir);
  }), t.on("app:showHideTrafficLight", (o, n) => {
    p()?.setWindowButtonVisibility?.(n);
  }), t.on("app:isMainWindow", (o) => p()?.id === m.fromWebContents(o.sender)?.id), t.on("app:showCurrentWebviewWindow", (o) => {
    m.fromWebContents(o.sender)?.show();
  }), t.on("app:getGPUFeatureStatus", (o) => s.getGPUFeatureStatus());
}
function re(t) {
  ae(t);
}
const w = new ee();
function ie() {
  re(w);
}
s.commandLine.appendSwitch("experimental-network-inspection");
!v && s.commandLine.appendSwitch("ignore-connections-limit", "localhost");
s.on("open-url", async (t, e) => {
  t.preventDefault(), await C(e, "open-url");
});
async function le() {
  s.removeAsDefaultProtocolClient(c), process.defaultApp ? process.argv.length >= 2 && s.setAsDefaultProtocolClient(c, process.execPath, [
    P.resolve(process.argv[1])
  ]) : s.setAsDefaultProtocolClient(c), s.on("second-instance", async (t, e) => {
    console.log("commandLine", e), await k(), await C(e.at(-1) || "", "second-instance");
  }), s.on("web-contents-created", (t, e) => {
    e.setWindowOpenHandler(({ url: o }) => (T.openExternal(o), { action: "deny" }));
  }), s.on("window-all-closed", () => {
    process.platform !== "darwin" && (console.log("All windows was closed. Quit app."), s.quit());
  }), s.on("activate", () => k());
  try {
    await s.whenReady(), ce(), await k(), Z(), await de(), console.log("setupApp done");
  } catch (t) {
    console.error("Failed create window:", t);
  }
}
function ce(t = V.defaultSession.protocol) {
  t.isProtocolHandled(S) || t.handle(S, (e) => {
    const o = e.url.slice(`${S}:`.length);
    return console.debug("protocol handle", o), O.fetch(o);
  });
}
async function de() {
  try {
    const t = process.argv.find(
      (e) => e.startsWith(`${c}://`)
    );
    t && await C(t, "cold-start");
  } catch (t) {
    console.error("Failed to handle protocol on cold start:", t);
  }
}
async function C(t, e) {
  try {
    if (!t || !t.startsWith(`${c}://`)) return;
    console.log(`deep-link [${e}]:`, t);
    const o = t.split("?")[1];
    t.includes(`${c}://oauth2callback`) && (w.send("oauth2:google-callback", `?${o}`), console.log("oauth2callback:", e, t)), t.includes(`${c}://inviteUser2project`) && (w.send("invite:to-project", `?${o}`), console.log("inviteUser2project:", e, t)), t.includes(`${c}://open-page`) && (w.send("open:page", `?${o}`), console.log("open-page:", e, t)), p()?.show?.();
  } catch (o) {
    console.error("Failed to dispatch deep link:", e, o);
  }
}
function pe() {
  i.transports.console.format = "[{y}-{m}-{d} {h}:{i}:{s}] [{level}] {text}", i.transports.file.format = `[{y}-{m}-{d} {h}:{i}:{s}] [{level}][${s.getVersion()}] {text}`, i.transports.console.useStyles = !0, i.transports.file.level = h["app-log-level"], i.transports.file.sync = !1, i.transports.file.resolvePathFn = () => {
    const t = J(Date.now(), "yyyy-MM-dd");
    return d(f.logsDir, `${t}.log`);
  }, Object.assign(console, i.functions), i.errorHandler.startCatching(), ue();
}
async function ue() {
  const t = f.logsDir;
  try {
    const e = await z(t), o = Date.now();
    e.forEach(async (n) => {
      const u = d(t, n), y = await G(u);
      o - y.mtimeMs > 10080 * 60 * 1e3 && Q(u, { recursive: !0, force: !0 }).then(() => {
        i.info(`Deleted expired log file: ${n}`);
      }).catch((F) => {
        i.error(`Failed to delete file: ${n}`, F);
      });
    });
  } catch (e) {
    i.error("Failed to read log directory:", e);
  }
}
async function he() {
  pe(), ie(), await le();
}
const fe = s.requestSingleInstanceLock();
fe || (s.quit(), process.exit(0));
he();
