// One-off helper: crops the pink/white top part off globe.png and fades the
// new top edge to transparent, saving the result as globe-hero.png.
import fs from "node:fs"
import zlib from "node:zlib"

const SRC = "public/images/globe.png"
const OUT = "public/images/globe-hero.png"
const CROP_Y = 640 // rows to remove from the top
const FEATHER = 128 // new-top rows that fade from alpha 0 to normal
const W = 1440
const H = 1882
const BPP = 4

// --- decode ---
const b = fs.readFileSync(SRC)
const idat = []
let pos = 8
while (pos < b.length) {
  const len = b.readUInt32BE(pos)
  const type = b.toString("ascii", pos + 4, pos + 8)
  if (type === "IDAT") idat.push(b.subarray(pos + 8, pos + 8 + len))
  pos += 12 + len
}
const raw = zlib.inflateSync(Buffer.concat(idat))
const stride = W * BPP
const full = Buffer.alloc(H * stride)
let p = 0
for (let y = 0; y < H; y++) {
  const filter = raw[p++]
  for (let x = 0; x < stride; x++) {
    const cur = raw[p]
    p++
    const left = x >= BPP ? full[y * stride + x - BPP] : 0
    const up = y > 0 ? full[(y - 1) * stride + x] : 0
    const ul = y > 0 && x >= BPP ? full[(y - 1) * stride + x - BPP] : 0
    let v
    switch (filter) {
      case 1: v = cur + left; break
      case 2: v = cur + up; break
      case 3: v = cur + ((left + up) >> 1); break
      case 4: {
        const pa = Math.abs(up - ul), pb = Math.abs(left - ul)
        const pc = Math.abs(left + up - ul - ul)
        const pr = pa <= pb && pa <= pc ? left : pb <= pc ? up : ul
        v = cur + pr
        break
      }
      default: v = cur
    }
    full[y * stride + x] = v & 0xff
  }
}

// --- crop + feather alpha ---
const newH = H - CROP_Y
const cut = Buffer.alloc(newH * stride + newH) // +1 filter byte per row
for (let y = 0; y < newH; y++) {
  const srcRow = CROP_Y + y
  cut[y * (stride + 1)] = 0 // filter type 0 (None)
  const alphaScale = y < FEATHER ? y / FEATHER : 1
  for (let x = 0; x < stride; x++) {
    let v = full[srcRow * stride + x]
    if (x % BPP === 3) v = Math.round(v * alphaScale) // alpha channel only
    cut[y * (stride + 1) + 1 + x] = v
  }
}

// --- encode PNG ---
function crc32(buf) {
  let c, crc = -1
  for (let i = 0; i < buf.length; i++) {
    c = (crc ^ buf[i]) & 0xff
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    crc = c ^ (crc >>> 8)
  }
  return (crc ^ -1) >>> 0
}
function chunk(type, data) {
  const out = Buffer.alloc(12 + data.length)
  out.writeUInt32BE(data.length, 0)
  Buffer.from(type, "ascii").copy(out, 4)
  data.copy(out, 8)
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length)
  return out
}
const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(W, 0)
ihdr.writeUInt32BE(newH, 4)
ihdr[8] = 8 // bit depth
ihdr[9] = 6 // RGBA
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", zlib.deflateSync(cut, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
])
fs.writeFileSync(OUT, png)
console.log("wrote", OUT, `${W}x${newH} (${png.length} bytes)`)
