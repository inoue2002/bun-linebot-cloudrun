import { Client, WebhookEvent } from '@line/bot-sdk';
import { followEventHandler } from './followEvent';
import { messageEventHandler } from './messageEvent';

export const eventHandler = async (client: Client, event: WebhookEvent) => {
  console.dir(event);
  switch (event.type) {
    case 'message':
      messageEventHandler(client, event);
      break;
    case 'unfollow':
      break;
    case 'follow':
      followEventHandler(client, event);
      break;
    case 'join':
      break;
    case 'leave':
      break;
    case 'postback':
      break;
    case 'beacon':
      break;
    case 'accountLink':
      break;
    case 'memberJoined':
      break;
    case 'memberLeft':
      break;
    case 'things':
      break;
    default:
      break;
  }
};
