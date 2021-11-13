require('dotenv').config();

const fs = require('fs');
const { BanchoClient } = require('bancho.js');

async function main() {
  const client = new BanchoClient({
    username: process.env.BANCHO_USERNAME,
    password: process.env.BANCHO_PASSWORD
  });
  await client.connect();
  console.log('[+] Connected to Bancho');

  const channel = client.getChannel(process.env.BANCHO_CHANNEL_NAME);
  await channel.join();
  console.log(`[+] Connected to channel ${channel.name}`);

  channel.on('message', msg => {
    fs.writeFileSync(process.env.OUT_FILENAME, msg.content + '\n', {
      flag: 'a'
    });
  });
}

main();
