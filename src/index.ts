import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import { BanchoClient } from 'bancho.js';

function extractMapId(text: string) {
  const regex = /https?:\/\/osu\.ppy\.sh\/beatmapsets\/(\d+)/;
  const result = regex.exec(text);

  if (!result) {
    return null;
  }

  return result[1];
}

async function main() {
  const client = new BanchoClient({
    username: process.env.BANCHO_USERNAME!,
    password: process.env.BANCHO_PASSWORD!
  });
  await client.connect();
  console.log('[+] Connected to Bancho');

  const channel = client.getChannel(process.env.BANCHO_CHANNEL_NAME!);
  await channel.join();
  console.log(`[+] Connected to channel ${channel.name}`);

  channel.on('message', msg => {
    const mapId = extractMapId(msg.content);
    if (!mapId) {
      return;
    }

    fs.writeFileSync(process.env.OUT_FILENAME!, mapId + '\n', {
      flag: 'a'
    });
  });
}

main();
