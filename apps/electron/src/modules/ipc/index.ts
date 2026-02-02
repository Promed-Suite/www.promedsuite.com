import type { MainMessage, RenderMessage } from "@workspace/electron-preload";
import { IPCMain } from "@workspace/electron-preload/main";
import { setupIpcModules } from "/@/modules/ipc/modules";

export * from "./types";

export const ipcMain = new IPCMain<RenderMessage, MainMessage>();

export function setupIpc() {
  setupIpcModules(ipcMain);
}
