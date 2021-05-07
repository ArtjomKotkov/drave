import {AbstractDriveHandler} from '../../handlers/base/drive.handler';
import {AbstractDrive, AbstractFile} from '../../state/base/model.abstract';
import {YandexMetaData} from '../../state/yandex/yandex.model';

export abstract class DriveAbstractService {

  abstract handler: AbstractDriveHandler;

  abstract updateMetaData(): Promise<void>;

  abstract getMetaData(): YandexMetaData | undefined;

  abstract getRoot(fields?: Array<string> | undefined, limit?: number | undefined, offset?: number | undefined): Promise<AbstractFile>;

  abstract get(identificator: string, fields?: Array<string> | undefined, limit?: number | undefined, offset?: number | undefined): Promise<AbstractFile>;

  abstract delete(identificator: string, fields: Array<string> | undefined, permanently: boolean): Promise<object>;

  abstract update(identificator: string, data: object, fields: Array<string> | undefined): Promise<object>;

  abstract makeDir(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract getDownloadLink(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract copy(identificatorFrom: string, identificatorTo: string, fields: Array<string> | undefined, overwrite: boolean): Promise<object>;

  abstract move(identificatorFrom: string, identificatorTo: string, fields: Array<string> | undefined, overwrite: boolean): Promise<object>;

  abstract publish(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract unpublish(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract getUploadLink(identificator: string, fields: Array<string> | undefined): Promise<string>;

  abstract uploadByUrl(identificator: string, url: string, fields: Array<string> | undefined): Promise<object>;

  abstract clearTrash(fields: Array<string> | undefined): Promise<object>;

  abstract clearFromTrash(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract getTrash(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract restoreTrash(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract moveToDrive(identificatorFrom: string, identificatorTo: string, drive: AbstractDrive, overwrite: boolean): void;

  abstract copyToDrive(identificatorFrom: string, identificatorTo: string, drive: AbstractDrive, overwrite: boolean): void;

}
