import {AbstractDriveHandler} from '../../handlers/base/drive.handler';
import {AbstractFile} from './model.abstract';


export abstract class DriveAbstractService {
  abstract handler: AbstractDriveHandler;

  abstract getRoot(fields: Array<string> | undefined, limit: number | undefined, offset: number | undefined): Promise<AbstractFile>;

  abstract get(identificator: string, fields: Array<string> | undefined, limit: number | undefined, offset: number | undefined): Promise<object>;

  abstract delete(identificator: string, fields: Array<string> | undefined, permanently: boolean): Promise<object>;

  abstract update(identificator: string, data: object, fields: Array<string> | undefined): Promise<object>;

  abstract makeDir(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract getDownloadLink(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract copy(identificator_from: string, identificator_to: string, fields: Array<string> | undefined, overwrite: boolean): Promise<object>;

  abstract move(identificator_from: string, identificator_to: string, fields: Array<string> | undefined, overwrite: boolean): Promise<object>;

  abstract publish(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract unpublish(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract getUploadLink(identificator: string, fields: Array<string> | undefined): Promise<string>;

  abstract uploadByUrl(identificator: string, url: string, fields: Array<string> | undefined): Promise<object>;

  abstract clearTrash(fields: Array<string> | undefined): Promise<object>;

  abstract clearFromTrash(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract getTrash(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract restoreTrash(identificator: string, fields: Array<string> | undefined): Promise<object>;

  abstract moveToDrive(identificator_from: string, identificator_to: string, driveService: DriveAbstractService, overwrite: boolean): void

  abstract copyToDrive(identificator_from: string, identificator_to: string, driveService: DriveAbstractService, overwrite: boolean): void;

}
