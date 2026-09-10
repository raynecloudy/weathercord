import { stationsTable } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const station = (await db.select().from(stationsTable).where(eq(stationsTable.id, (await params).id))).values().toArray()[0];

  if (!station) return new Response(null, { status: 404 });

  let path = "./database/station-banners/".concat(station.id, ".avif");
  let exists = existsSync(path);
  if (!exists) return new Response(null, { status: 204 });
  let buffer = (await readFile(path)).buffer;

  const sizeParam = new URLSearchParams(new URL(req.url).search).get("size");
  if (sizeParam) {
    const size = parseInt(sizeParam);
    if (!isNaN(size) && size > 0 && size < 450) {
      buffer = new Uint8Array(
        (
          await sharp(buffer, {
            animated: true,
            pages: -1
          })
            .resize(size, Math.round(size / 3))
            .toBuffer()
        ).buffer
      ).slice().buffer;
    }
  }

  return new Response(buffer, {
    headers: {
      "Content-Type": "image/avif"
    }
  });
};
