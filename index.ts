import { Client, WebhookEvent, WebhookRequestBody } from '@line/bot-sdk';
import { verifySignature } from './src/middleware';
import { eventHandler } from './src/event/handler';

const channelSecret = process.env.CHANNELSECRET;
const accessToken = process.env.ACCESSTOKEN;

if (!channelSecret) {
  throw new Error('Specify CHANNELSECRET as environment variable.');
}

if (!accessToken) {
  throw new Error('Specify ACCESSTOKEN as environment variable.');
}

const client = new Client({
  channelAccessToken: accessToken as string,
  channelSecret: channelSecret as string,
});

const server = Bun.serve({
  port: 8080,
  async fetch(req) {
    // Get url and method
    const { url, method } = req;
    const { pathname } = new URL(url);
    switch (method) {
      case 'GET':
        if (pathname === '/') {
          return new Response('Hello!');
        }
        // 404 Not Found
        return new Response(null, { status: 404 });
      case 'POST':
        if (pathname === '/webhook') {
          const body = (await req.json()) as WebhookRequestBody;
          try {
            verifySignature(channelSecret as string, req.headers, JSON.stringify(body));
          } catch (e) {
            if (e instanceof Error) {
              console.error(e.message);
            } else {
              console.error(e);
            }
            return new Response('Unauthorized', { status: 401 });
          }

          const events: WebhookEvent[] = body.events;

          try {
            await Promise.all(
              events.map(async (event) => {
                await eventHandler(client, event);
              })
            );
            return new Response('success');
          } catch (err) {
            console.error(err);
            return new Response('Something error!', { status: 500 });
          }
        }
        // 404 Not Found
        return new Response(null, { status: 404 });
      default:
        // 405 Method Not Allowed
        return new Response(null, { status: 405 });
    }
  },
});

console.log(`Listening on http://localhost:${server.port}`);
