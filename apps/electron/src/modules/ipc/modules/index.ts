import type { IPCMainInstance } from "@/modules/ipc/types";
import { setupAppIpc } from "./app";
import { setupUtilIpc } from "./utils";

export function setupIpcModules(ipcMain: IPCMainInstance) {
  setupAppIpc(ipcMain);
  setupUtilIpc(ipcMain);
}
