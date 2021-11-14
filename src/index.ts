import dotenv from 'dotenv';
dotenv.config();

import { BanchoClient } from 'bancho.js';
import { handleMessage } from './utils';

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

  channel.on('message', handleMessage);
}

main();
