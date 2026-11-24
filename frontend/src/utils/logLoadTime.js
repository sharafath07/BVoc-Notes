export function logLoadTime(label, startedAt, failed = false) {
    const seconds = ((performance.now() - startedAt) / 1000).toFixed(2);
    console.log(`[${label}] ${failed ? "Load failed after" : "Loaded in"} ${seconds} s`);
}
