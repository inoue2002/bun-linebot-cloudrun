import { Client } from '@line/bot-sdk';
import { FollowMessage } from '../message/followMessage';

export const followEventHandler = async (client: Client, event: any) => {
  return client.replyMessage(event.replyToken, FollowMessage);
};
