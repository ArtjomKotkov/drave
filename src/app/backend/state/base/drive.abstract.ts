import {AbstractDriveHandler} from "../../handlers/base/drive.handler";
import {AbstractFile} from "./model.abstract";


export abstract class DriveAbstractService {
  handler: AbstractDriveHandler

  abstract async getRoot(): Promise<AbstractFile>;
  abstract async get(identificator: string, fields: Array<string> | undefined, limit: number | undefined, offset: number | undefined): Promise<object>;
  abstract async delete(identificator: string, fields: Array<string> | undefined, permanently: boolean): Promise<object>;
  abstract async update(identificator: string, data: object, fields: Array<string> | undefined): Promise<object>;
  abstract async makeDir(identificator: string, fields: Array<string> | undefined): Promise<object>;
  abstract async getDownloadLink(identificator: string, fields: Array<string> | undefined): Promise<string>;
  abstract async copy(identificator_from: string, identificator_to: string, fields: Array<string> | undefined, overwrite: boolean): Promise<object>;
  abstract async move(identificator_from: string, identificator_to: string, fields: Array<string> | undefined, overwrite: boolean): Promise<object>;
  abstract async publish(identificator: string, fields: Array<string> | undefined): Promise<object>;
  abstract async unpublish(identificator: string, fields: Array<string> | undefined): Promise<object>;
  abstract async getUploadLink(identificator: string, fields: Array<string> | undefined): Promise<string>;
  abstract async uploadByUrl(identificator: string, url: string, fields: Array<string> | undefined): Promise<object>;
  abstract async clearTrash(identificator: string, fields: Array<string> | undefined): Promise<object>;
  abstract async getTrash(identificator: string, fields: Array<string> | undefined): Promise<object>;
  abstract async restoreTrash(identificator: string, fields: Array<string> | undefined): Promise<object>;

  async moveToDrive(identificator_from: string, identificator_to: string, driveService: DriveAbstractService, overwrite: boolean): Promise<void> {
    const moveFromLink = await this.getDownloadLink(identificator_from, undefined);
    await driveService.uploadByUrl(identificator_to, moveFromLink, undefined);
    await this.delete(identificator_from, undefined, true);
  }

  async copyToDrive(identificator_from: string, identificator_to: string, driveService: DriveAbstractService, overwrite: boolean): Promise<void> {
    const moveFromLink = await this.getDownloadLink(identificator_from, undefined);
    await driveService.uploadByUrl(identificator_to, moveFromLink, undefined);
  }

}
