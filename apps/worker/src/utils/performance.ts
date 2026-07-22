export async function withSlowLog<T>(
  promiseName: string,
  thresholdMs: number,
  promise: Promise<T>,
): Promise<T> {
  const startTime = Date.now();

  let isResolved = false;

  const timer = setTimeout(() => {
    if (!isResolved) {
      console.warn(
        `⚠️ [PERF ALARM] Operation '${promiseName}' has been running for over ${
          thresholdMs / 1000
        }s and is still stuck!`,
      );
    }
  }, thresholdMs);

  try {
    const result = await promise;

    isResolved = true;

    const duration = Date.now() - startTime;

    if (duration > thresholdMs) {
      console.warn(
        `🐌 [PERF SLOW] Operation '${promiseName}' finally finished after ${
          duration / 1000
        }s.`,
      );
    }

    return result;
  } finally {
    clearTimeout(timer);
  }
}
