/**
 * Invisible bot check for /api/ask: fetch a signed challenge and find a counter
 * whose SHA-256 over "<token>:<counter>" starts with `bits` zero bits.
 * Takes about a second in a browser; see api/_pow.py for the server side.
 */
export interface Proof {
  token: string;
  counter: number;
}

const BATCH = 512;

function leadingZeroBits(bytes: Uint8Array): number {
  let bits = 0;
  for (const byte of bytes) {
    if (byte === 0) {
      bits += 8;
      continue;
    }
    return bits + Math.clz32(byte) - 24;
  }
  return bits;
}

export async function solveChallenge(): Promise<Proof | null> {
  try {
    const res = await fetch('/api/ask', { cache: 'no-store' });
    if (!res.ok) return null;
    const { token, bits } = (await res.json()) as { token: string; bits: number };
    const encoder = new TextEncoder();
    for (let start = 0; start < 50_000_000; start += BATCH) {
      const digests = await Promise.all(
        Array.from({ length: BATCH }, (_, i) =>
          crypto.subtle.digest('SHA-256', encoder.encode(`${token}:${start + i}`)),
        ),
      );
      const hit = digests.findIndex(d => leadingZeroBits(new Uint8Array(d)) >= bits);
      if (hit >= 0) return { token, counter: start + hit };
    }
  } catch {
    // No proof: the server still answers, extractively.
  }
  return null;
}
