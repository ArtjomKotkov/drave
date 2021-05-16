import {AbstractDriveMetaData, AbstractFile, AbstractResponse, AbstractToken} from '../base/model.abstract';

export interface YandexToken extends AbstractToken {
}

export interface YandexMetaData extends AbstractDriveMetaData {
  unlimitedAutouploadEnabled?: boolean;
}

export interface YandexResponse extends AbstractResponse {
 href: string;
}
