import {AbstractDriveMetaData, AbstractFile, AbstractResponse, AbstractToken} from '../base/model.abstract';

export interface YandexToken extends AbstractToken {
}

export interface YandexMetaData extends AbstractDriveMetaData {
  unlimitedAutouploadEnabled?: boolean;
  maxFileSize?: number;
}

export interface YandexResponse extends AbstractFile {
 href: string;
}

export interface YandexFile extends  AbstractResponse {
  antivirusStatus?: object;
  resourceId?: string;
  share?: object;
  file?: string;
  size?: number;
  photosliceTime?: string;
  embedded?: {
    sort?: string
    items?: YandexFile[]
    limit?: number
    offset?: number
    path?: string
    total?: number
  };
  exif?: {
    dateTime?: string
  };
  customProperties?: object;
  mediaType?: string;
  preview?: string;
  type: string;
  mimeType?: string;
  revision?: number;
  publicUrl?: string;
  path: string;
  md5?: string;
  publicKey?: string;
  sha256?: string;
  name: string;
  created: string;
  modified: string;
  commentIds?: {
    privateResource?: string
    publicResource?: string
  };
}
