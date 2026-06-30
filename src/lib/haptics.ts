/**
 * Light haptic taps for the makeover wheel (mobile / supported devices).
 * No-ops safely on desktop or when vibration is unavailable.
 */
export function hapticTick() {
  try {
    navigator.vibrate?.(10);
  } catch {
    /* ignore */
  }
}

export function hapticSnap() {
  try {
    navigator.vibrate?.([12, 40, 8]);
  } catch {
    /* ignore */
  }
}
