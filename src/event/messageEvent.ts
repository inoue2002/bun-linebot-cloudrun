import { Client, MessageEvent } from '@line/bot-sdk';

export const messageEventHandler = async (client: Client, event: MessageEvent) => {
  switch (event.message.type) {
    case 'text':
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text,
      });
    case 'image':
      break;
    case 'video':
      break;
    case 'audio':
      break;
    case 'file':
      break;
    case 'location':
      break;
    case 'sticker':
      break;
    default:
      throw new Error(`Unknown message: ${JSON.stringify(event.message)}`);
  }
};
