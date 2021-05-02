import {YandexDriveHandler} from '../../handlers';
import {DriveAbstractService} from '../base/drive.abstract';
import {YandexConfig} from './config.data';
import {YandexFile, YandexResponse, YandexToken} from './yandex.model';


export class YandexDriveService extends DriveAbstractService {
  handler: YandexDriveHandler = new YandexDriveHandler();

  configure(credentials: YandexToken): void {
    this.handler.configure(credentials);
  }


  async getRoot(
    fields: Array<string> | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined
  ): Promise<YandexFile> {
    return await this.get(YandexConfig.rootFolder, fields, limit, offset);
  };

  async get(
    identificator: string,
    fields: Array<string> | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined
  ): Promise<YandexFile> {
    return await this.handler.get(identificator, fields, limit, offset) as YandexFile;
  }

  async delete(
    identificator: string,
    fields: Array<string> | undefined = undefined,
    permanently: boolean = false
  ): Promise<YandexResponse> {
    return await this.handler.delete(identificator, fields, permanently) as YandexResponse;
  };

  async update(
    identificator: string,
    data: object,
    fields: Array<string> | undefined = undefined
  ): Promise<YandexFile> {
    return await this.handler.update(identificator, data, fields) as YandexFile;
  };

  async makeDir(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<YandexResponse> {
    return await this.handler.makeDir(identificator, fields) as YandexResponse;
  };

  async getDownloadLink(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<YandexResponse> {
    return await this.handler.getDownloadLink(identificator, fields) as YandexResponse;
  };

  async copy(
    identificator_from: string,
    identificator_to: string,
    fields: Array<string> | undefined = undefined,
    overwrite: boolean = false
  ): Promise<YandexResponse> {
    return await this.handler.copy(identificator_from, identificator_to, fields, overwrite) as YandexResponse;
  };

  async move(
    identificator_from: string,
    identificator_to: string,
    fields: Array<string> | undefined = undefined,
    overwrite: boolean = false
  ): Promise<YandexResponse> {
    return await this.handler.move(identificator_from, identificator_to, fields, overwrite) as YandexResponse;
  };

  async publish(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<YandexResponse> {
    return await this.handler.publish(identificator, fields) as YandexResponse;
  };

  async unpublish(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<YandexResponse> {
    return await this.handler.unpublish(identificator, fields) as YandexResponse;
  };

  async getUploadLink(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<string> {
    const response = await this.handler.getUploadLink(identificator, fields) as YandexResponse;
    return response.href;
  };

  async uploadByUrl(
    identificator: string,
    url: string,
    fields: Array<string> | undefined = undefined
  ): Promise<YandexResponse> {
    return await this.handler.uploadByUrl(identificator, url, fields) as YandexResponse;
  };

  async clearTrash(
    fields: Array<string> | undefined = undefined
  ): Promise<YandexResponse> {
    return await this.handler.clearTrash(YandexConfig.trashRoot, fields) as YandexResponse;
  };

  async clearFromTrash(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<YandexResponse> {
    return await this.handler.clearTrash(identificator, fields) as YandexResponse;
  };

  async getTrash(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<YandexResponse> {
    return await this.handler.getTrash(identificator, fields) as YandexResponse;
  };

  async restoreTrash(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<YandexResponse> {
    return await this.handler.restoreTrash(identificator, fields) as YandexResponse;
  };

  async moveToDrive(identificator_from: string, identificator_to: string, driveService: DriveAbstractService, overwrite: boolean): Promise<void> {
    const moveFromLink = await this.getDownloadLink(identificator_from, undefined);
    await driveService.uploadByUrl(identificator_to, moveFromLink.href, undefined);
    await this.delete(identificator_from, undefined, true);
  }

  async copyToDrive(identificator_from: string, identificator_to: string, driveService: DriveAbstractService, overwrite: boolean): Promise<void> {
    const moveFromLink = await this.getDownloadLink(identificator_from, undefined);
    await driveService.uploadByUrl(identificator_to, moveFromLink.href, undefined);
  }

}
