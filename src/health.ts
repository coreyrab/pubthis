import { statfs } from "node:fs/promises";
import { CONFIG } from "./config.js";

export interface DiskStatus {
  available_bytes: number;
  total_bytes: number;
  usage_percent: number;
}

export async function getDiskStatus(): Promise<DiskStatus> {
  const stats = await statfs(CONFIG.DATA_DIR);
  const total = stats.blocks * stats.bsize;
  const available = stats.bavail * stats.bsize;
  const used = total - available;
  return {
    available_bytes: available,
    total_bytes: total,
    usage_percent: Math.round((used / total) * 10000) / 10000, // 4 decimal places
  };
}

export async function isDiskFull(): Promise<boolean> {
  try {
    const status = await getDiskStatus();
    return status.usage_percent >= CONFIG.DISK_USAGE_THRESHOLD;
  } catch {
    return false; // if we can't check, don't block publishes
  }
}
