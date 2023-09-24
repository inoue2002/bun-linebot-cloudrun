import crypto from 'crypto';

export const verifySignature = (channelSecret: string, headers: Headers, body: string): void | Promise<void> => {
  //署名検証
  const signature = crypto.createHmac('SHA256', channelSecret).update(body).digest('base64');
  let checkHeader = '';

  // Xかxに入っているヘッダーを取得
  if (headers.has('X-Line-Signature')) {
    checkHeader = headers.get('X-Line-Signature') || '';
  } else if (headers.has('x-line-signature')) {
    checkHeader = headers.get('x-line-signature') || '';
  } else {
    // ヘッダーがない場合はエラー
    throw new Error('Invalid handler');
  }

  // Compare x-line-signature request header and the signature
  if (signature !== checkHeader) {
    throw new Error('Invalid signature');
  }
  return;
};
