import type { MainMessage, RenderMessage } from "@workspace/electron-preload";
import type { IPCMain } from "@workspace/electron-preload/main";

export type IPCMainInstance = IPCMain<RenderMessage, MainMessage>;
