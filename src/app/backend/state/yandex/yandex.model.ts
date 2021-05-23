import {AbstractDriveMetaData, AbstractResponse} from '../base/model.abstract';


export interface YandexMetaData extends AbstractDriveMetaData {
  unlimitedAutouploadEnabled?: boolean;
}

export interface YandexResponse extends AbstractResponse {
 href: string;
}
