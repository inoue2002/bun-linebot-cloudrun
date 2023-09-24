import { Client } from '@line/bot-sdk';

const channelSecret = process.env.CHANNELSECRET;
const accessToken = process.env.ACCESSTOKEN;

if (!channelSecret) {
  throw new Error('Specify CHANNELSECRET as environment variable.');
}

if (!accessToken) {
  throw new Error('Specify ACCESSTOKEN as environment variable.');
}

// CLIから実行し、引数をURLとして受け取る
// 例: bun src/setWebhookUrl https://example.com/webhook
const url = process.argv[2];

if (!url) {
  throw new Error('Specify URL as argument.');
}

// urlのバリデーション
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

if (!isValidUrl(url)) {
  throw new Error('Invalid URL.');
}

const setWebhookUrl = async (url: string) => {
  try {
    const client = new Client({
      channelAccessToken: accessToken as string,
      channelSecret: channelSecret as string,
    });
    await client.setWebhookEndpointUrl(url);
  } catch (e) {
    console.error(e);
    return;
  }
  console.log(`Webhook URL is set 🎉 ${url}`);
};

setWebhookUrl(url);
