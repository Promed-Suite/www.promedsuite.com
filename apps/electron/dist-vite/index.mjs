import { app as o, BrowserWindow as m, Tray as I, Menu as W, nativeTheme as $, shell as A, ipcMain as E, session as L, net as N } from "electron";
import F, { join as c } from "node:path";
import { parseArgs as V } from "node:util";
import { setTimeout as j } from "node:timers/promises";
import O from "electron-store";
import M from "electron-updater";
import { existsSync as q } from "node:fs";
import { format as R } from "date-fns";
import i from "electron-log/main.js";
import { readdir as H, stat as z, rm as B } from "node:fs/promises";
const v = o.isPackaged, u = (() => {
  const e = V({
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
u["app-log-level"];
const G = u["app-env"] ? u["app-env"] === "dev" : !1;
u["app-env"] && u["app-env"];
process.platform;
process.platform;
const _ = process.platform === "linux", y = o.getPath("sessionData"), h = {
  /** Application data root directory */
  sessionDir: y,
  /** System locale */
  lang: o.getLocale(),
  /** Temporary files directory */
  tempDir: c(y, "temp"),
  /** Application logs directory */
  logsDir: o.getPath("logs"),
  /** Configuration file */
  configFile: c(y, "config.json"),
  /** Preload script file path */
  get preloadFilePath() {
    return v ? c(import.meta.dirname, "./preload/index.cjs") : c(import.meta.dirname, "../../preload/dist/index.cjs");
  },
  /** Web resource base URL */
  get webBaseURL() {
    return `file://${c(import.meta.dirname, "./web/index.html")}`;
  }
};
console.debug("appConfig", h);
const d = G ? "bqy-dev" : "bqy", b = "bqy-media";
async function Q() {
  const t = new m({
    // Use 'ready-to-show' event to show window
    show: !1,
    webPreferences: {
      // https://www.electronjs.org/docs/latest/api/webview-tag#warning
      webviewTag: !1,
      sandbox: !_,
      spellcheck: !1,
      preload: h.preloadFilePath
    }
  });
  return t.on("ready-to-show", () => {
    t?.show(), v || t?.webContents.openDevTools({ mode: "detach" });
  }), await t.loadURL(h.webBaseURL), t;
}
let r;
async function S() {
  (!r || r.isDestroyed()) && (r = await Q()), r.isMinimized() && r.restore(), r.setSkipTaskbar(!1), r.setAlwaysOnTop(!0), r.show(), r.focus(), r.setAlwaysOnTop(!1);
}
function p() {
  return r;
}
let l;
async function J() {
  if (await j(), l)
    return l.setContextMenu(C()), l;
  const t = F.join(import.meta.dirname, "..", "resources/tray.png");
  return l = new I(t), l.setToolTip(o.getName()), l.setContextMenu(C()), l.on("click", () => {
    p()?.show(), p()?.setSkipTaskbar(!1);
  }), l;
}
function C() {
  return W.buildFromTemplate([
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
const K = {
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
}, P = new O({
  schema: K,
  clearInvalidConfig: !0
}), { autoUpdater: a } = M, D = c(import.meta.dirname, "../dev-app-update.yml"), X = [
  "checking",
  "available",
  "downloading",
  "downloaded",
  "not-available",
  "error"
];
class Y {
  state = { status: "idle" };
  updateDownloaded = !1;
  checkingPromise = null;
  devConfigEnabled;
  listeners = /* @__PURE__ */ new Set();
  constructor() {
    this.devConfigEnabled = !o.isPackaged && q(D), this.devConfigEnabled && (a.forceDevUpdateConfig = !0, a.updateConfigPath = D), a.autoDownload = !0, a.autoInstallOnAppQuit = !1, a.fullChangelog = !0, a.logger = console, a.on("checking-for-update", () => {
      this.setState({ status: "checking", error: void 0 });
    }), a.on("update-available", (e) => {
      this.updateDownloaded = !1, this.setState({ status: "available", info: e, progress: void 0 });
    }), a.on("update-not-available", (e) => {
      this.updateDownloaded = !1, this.setState({ status: "not-available", info: e, progress: void 0 });
    }), a.on("error", (e) => {
      const s = e instanceof Error ? e.message : String(e);
      this.updateDownloaded = !1, this.setState({ status: "error", error: s, progress: void 0 });
    }), a.on("download-progress", (e) => {
      this.setState({ status: "downloading", progress: e });
    }), a.on("update-downloaded", (e) => {
      this.updateDownloaded = !0, this.setState({ status: "downloaded", info: e, progress: void 0 });
    });
  }
  /** Manually trigger an update check */
  async checkForUpdates() {
    return this.canCheckUpdates() ? this.checkingPromise ? this.checkingPromise : (this.checkingPromise = a.checkForUpdates().then((e) => (e?.updateInfo && this.isNewerVersion(e.updateInfo.version) ? this.setState({ status: "available", info: e.updateInfo }) : this.setState({
      status: "not-available",
      info: e?.updateInfo,
      progress: void 0
    }), this.state)).catch((e) => {
      const s = e instanceof Error ? e.message : String(e);
      return this.setState({ status: "error", error: s, progress: void 0 }), this.state;
    }).finally(() => {
      this.checkingPromise = null;
    }), this.checkingPromise) : (this.setState({
      status: "error",
      error: "No update feed configured for the current runtime",
      progress: void 0
    }), this.state);
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
    return o.isPackaged || this.devConfigEnabled;
  }
  isNewerVersion(e) {
    try {
      const s = o.getVersion();
      return this.normalizeVersion(e) > this.normalizeVersion(s);
    } catch {
      return e !== o.getVersion();
    }
  }
  normalizeVersion(e) {
    return Number(
      e.split(".").map((s) => s.padStart(2, "0")).join("")
    );
  }
  setState(e) {
    const s = e.status && X.includes(e.status);
    this.state = {
      ...this.state,
      ...e,
      checkedAt: s ? Date.now() : this.state.checkedAt
    }, this.emitState();
  }
  emitState() {
    for (const e of this.listeners)
      e(this.state);
  }
}
const f = new Y();
class Z {
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
const U = new Z();
function ee(t) {
  const e = f.onStateChange((s) => {
    t.send("app:updateState", s);
  });
  o.once("before-quit", () => {
    e();
  }), t.on("app:getAppVersion", (s) => o.getVersion()), t.on("app:setSystemTheme", (s, n) => {
    $.themeSource = n;
  }), t.on("app:saveSoftConfig", (s, n) => {
    Object.assign(P.store, n);
  }), t.on("app:getSoftConfig", (s) => ({ ...P })), t.on("app:checkForUpdates", (s) => f.checkForUpdates()), t.on("app:getUpdateState", () => f.getState()), t.on("app:checkWebForUpdates", (s) => U.checkForUpdates()), t.on("app:hasUpdate", (s) => f.hasUpdate()), t.on("app:quitAndInstall", async (s, n) => {
    n.type === "app" ? f.upgradeNow() : n.type === "web" && await U.upgradeNow();
  }), t.on("app:showLogDir", (s) => {
    A.openPath(h.logsDir);
  }), t.on("app:showHideTrafficLight", (s, n) => {
    p()?.setWindowButtonVisibility?.(n);
  }), t.on("app:isMainWindow", (s) => p()?.id === m.fromWebContents(s.sender)?.id), t.on("app:showCurrentWebviewWindow", (s) => {
    m.fromWebContents(s.sender)?.show();
  }), t.on("app:getGPUFeatureStatus", (s) => o.getGPUFeatureStatus());
}
function te(t) {
  ee(t);
}
class se {
  channel;
  listeners = {};
  constructor(e = "IPC-bridge") {
    this.channel = e, this.bindMessage();
  }
  on(e, s) {
    if (this.listeners[e])
      throw new Error(`Handler for message ${String(e)} already exists`);
    this.listeners[e] = s;
  }
  off(e) {
    this.listeners[e] && delete this.listeners[e];
  }
  async send(e, ...s) {
    m.getAllWindows().forEach((g) => {
      g.webContents.send(this.channel, {
        name: e,
        payload: s
      });
    });
  }
  bindMessage() {
    E.handle(this.channel, this.handleReceivingMessage.bind(this));
  }
  async handleReceivingMessage(e, s) {
    try {
      if (this.listeners[s.name])
        return {
          type: "success",
          result: await this.listeners[s.name](
            e,
            ...s.payload
          )
        };
      throw new Error(`Unknown IPC message ${String(s.name)}`);
    } catch (n) {
      return {
        type: "error",
        error: n.toString()
      };
    }
  }
}
const w = new se();
function oe() {
  te(w);
}
o.commandLine.appendSwitch("experimental-network-inspection");
!v && o.commandLine.appendSwitch("ignore-connections-limit", "localhost");
o.on("open-url", async (t, e) => {
  t.preventDefault(), await k(e, "open-url");
});
async function ne() {
  o.removeAsDefaultProtocolClient(d), process.defaultApp ? process.argv.length >= 2 && o.setAsDefaultProtocolClient(d, process.execPath, [
    F.resolve(process.argv[1])
  ]) : o.setAsDefaultProtocolClient(d), o.on("second-instance", async (t, e) => {
    console.log("commandLine", e), await S(), await k(e.at(-1) || "", "second-instance");
  }), o.on("web-contents-created", (t, e) => {
    e.setWindowOpenHandler(({ url: s }) => (A.openExternal(s), { action: "deny" }));
  }), o.on("activate", () => S());
  try {
    await o.whenReady(), ae(), await S(), J(), await re(), console.log("setupApp done");
  } catch (t) {
    console.error("Failed create window:", t);
  }
}
function ae(t = L.defaultSession.protocol) {
  t.isProtocolHandled(b) || t.handle(b, (e) => {
    const s = e.url.slice(`${b}:`.length);
    return console.debug("protocol handle", s), N.fetch(s);
  });
}
async function re() {
  try {
    const t = process.argv.find(
      (e) => e.startsWith(`${d}://`)
    );
    t && await k(t, "cold-start");
  } catch (t) {
    console.error("Failed to handle protocol on cold start:", t);
  }
}
async function k(t, e) {
  try {
    if (!t || !t.startsWith(`${d}://`)) return;
    console.log(`deep-link [${e}]:`, t);
    const s = t.split("?")[1];
    t.includes(`${d}://oauth2callback`) && (w.send("oauth2:google-callback", `?${s}`), console.log("oauth2callback:", e, t)), t.includes(`${d}://inviteUser2project`) && (w.send("invite:to-project", `?${s}`), console.log("inviteUser2project:", e, t)), t.includes(`${d}://open-page`) && (w.send("open:page", `?${s}`), console.log("open-page:", e, t)), p()?.show?.();
  } catch (s) {
    console.error("Failed to dispatch deep link:", e, s);
  }
}
function ie() {
  i.transports.console.format = "[{y}-{m}-{d} {h}:{i}:{s}] [{level}] {text}", i.transports.file.format = `[{y}-{m}-{d} {h}:{i}:{s}] [{level}][${o.getVersion()}] {text}`, i.transports.console.useStyles = !0, i.transports.file.level = u["app-log-level"], i.transports.file.sync = !1, i.transports.file.resolvePathFn = () => {
    const t = R(Date.now(), "yyyy-MM-dd");
    return c(h.logsDir, `${t}.log`);
  }, Object.assign(console, i.functions), i.errorHandler.startCatching(), le();
}
async function le() {
  const t = h.logsDir;
  try {
    const e = await H(t), s = Date.now();
    e.forEach(async (n) => {
      const g = c(t, n), T = await z(g);
      s - T.mtimeMs > 10080 * 60 * 1e3 && B(g, { recursive: !0, force: !0 }).then(() => {
        i.info(`Deleted expired log file: ${n}`);
      }).catch((x) => {
        i.error(`Failed to delete file: ${n}`, x);
      });
    });
  } catch (e) {
    i.error("Failed to read log directory:", e);
  }
}
async function ce() {
  ie(), oe(), await ne();
}
const de = o.requestSingleInstanceLock();
de || (o.quit(), process.exit(0));
ce();
