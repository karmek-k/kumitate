import fs from 'fs';
import { BanchoMessage } from 'bancho.js';

export function extractMapId(text: string) {
  const regex = /https?:\/\/osu\.ppy\.sh\/beatmapsets\/(\d+)/;
  const result = regex.exec(text);

  if (!result) {
    return null;
  }

  return result[1];
}

export function handleMessage(msg: BanchoMessage) {
  const mapId = extractMapId(msg.content);
  if (!mapId) {
    return;
  }

  fs.writeFileSync(process.env.OUT_FILENAME!, mapId + '\n', {
    flag: 'a'
  });
}
