import { ValueTransformer } from 'typeorm';
import * as crypto from 'crypto';
import { EnvConfig } from '@vapeshop-webapp/config';

export class EncryptionJsonTransformer implements ValueTransformer {
  private encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(EnvConfig.ENCRYPTION_KEY, 'base64'),
      iv,
    );
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  private decrypt(text: string): string {
    const textParts = text.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(EnvConfig.ENCRYPTION_KEY, 'base64'),
      iv,
    );
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  to(data: object): string {
    if (data === null || data === undefined) {
      return data as any;
    }
    const jsonString = JSON.stringify(data);
    return this.encrypt(jsonString);
  }

  from(data: string): object {
    if (data === null || data === undefined) {
      return data as any;
    }
    const decrypted = this.decrypt(data);
    return JSON.parse(decrypted);
  }
}
