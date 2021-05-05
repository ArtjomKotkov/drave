import {YandexDriveHandler} from '../../handlers';
import {DriveAbstractService} from '../base/drive.abstract';
import {YandexConfig} from '../../state/yandex/config.data';
import {AbstractDrive, YandexFile, YandexResponse, YandexToken} from '../../state';
import {YandexMetaData} from '../../state/yandex/yandex.model';
import {BehaviorSubject} from 'rxjs';


export class YandexDriveService extends DriveAbstractService {
  handler: YandexDriveHandler = new YandexDriveHandler();
  metaData: BehaviorSubject<YandexMetaData | undefined> = new BehaviorSubject<YandexMetaData | undefined>(undefined);

  configure(credentials: YandexToken): void {
    this.handler.configure(credentials);
  }

  async getMetaData(): Promise<YandexMetaData> {
    const data = await this.handler.getMetaData();
    const metaData = this.parseMetaData(data);
    this.metaData.next(metaData);
    return metaData;
  }

  private parseMetaData(response: any): YandexMetaData {
    return {
      totalSpace: response.total_space,
      filledSpace: response.used_space,
      maxFileSize: response.max_file_size,
      trashFilledSpace: response.trash_size,
      unlimitedAutouploadEnabled: response.unlimited_autoupload_enabled,
      owner: {
        id: response.user.uid,
        login: response.user.login,
        displayName: response.user.display_name
      }
    };
  }

  async getRoot(
    fields?: Array<string> | undefined,
    limit?: number | undefined,
    offset?: number | undefined
  ): Promise<YandexFile> {
    return await this.get(YandexConfig.rootFolder, fields, limit, offset);
  }

  async get(
    identificator: string,
    fields?: Array<string> | undefined,
    limit?: number | undefined,
    offset?: number | undefined
  ): Promise<YandexFile> {
    return await this.handler.get(identificator, fields, limit, offset) as YandexFile;
  }

  async delete(
    identificator: string,
    fields?: Array<string> | undefined,
    permanently: boolean = false
  ): Promise<YandexResponse> {
    const response = await this.handler.delete(identificator, fields, permanently) as YandexResponse;
    await this.getMetaData();
    return response;
  }

  async update(
    identificator: string,
    data: object,
    fields?: Array<string> | undefined
  ): Promise<YandexFile> {
    const response = await this.handler.update(identificator, data, fields) as YandexFile;
    await this.getMetaData();
    return response;
  }

  async makeDir(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<YandexResponse> {
    return await this.handler.makeDir(identificator, fields) as YandexResponse;
  }

  async getDownloadLink(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<YandexResponse> {
    return await this.handler.getDownloadLink(identificator, fields) as YandexResponse;
  }

  async copy(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = false
  ): Promise<YandexResponse> {
    const response = await this.handler.copy(identificatorFrom, identificatorTo, fields, overwrite) as YandexResponse;
    await this.getMetaData();
    return response;
  }

  async move(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = false
  ): Promise<YandexResponse> {
    const response = await this.handler.move(identificatorFrom, identificatorTo, fields, overwrite) as YandexResponse;
    await this.getMetaData();
    return response;
  }

  async publish(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<YandexResponse> {
    const response = await this.handler.publish(identificator, fields) as YandexResponse;
    await this.getMetaData();
    return response;
  }

  async unpublish(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<YandexResponse> {
    const response = await this.handler.unpublish(identificator, fields) as YandexResponse;
    await this.getMetaData();
    return response;
  }

  async getUploadLink(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<string> {
    const response = await this.handler.getUploadLink(identificator, fields) as YandexResponse;
    return response.href;
  }

  async uploadByUrl(
    identificator: string,
    url: string,
    fields?: Array<string> | undefined
  ): Promise<YandexResponse> {
    return await this.handler.uploadByUrl(identificator, url, fields) as YandexResponse;
  }

  async clearTrash(
    fields?: Array<string> | undefined
  ): Promise<YandexResponse> {
    const response = await this.handler.clearTrash(YandexConfig.trashRoot, fields) as YandexResponse;
    await this.getMetaData();
    return response;
  }

  async clearFromTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<YandexResponse> {
    const response = await this.handler.clearTrash(identificator, fields) as YandexResponse;
    await this.getMetaData();
    return response;
  }

  async getTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<YandexResponse> {
    return await this.handler.getTrash(identificator, fields) as YandexResponse;
  }

  async restoreTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<YandexResponse> {
    const response = await this.handler.restoreTrash(identificator, fields) as YandexResponse;
    await this.getMetaData();
    return response;
  }

  async moveToDrive(identificatorFrom: string, identificatorTo: string, drive: AbstractDrive, overwrite?: boolean): Promise<void> {
    const moveFromLink = await this.getDownloadLink(identificatorFrom, undefined);
    await drive.driveService.uploadByUrl(identificatorTo, moveFromLink.href, undefined);
    await this.delete(identificatorFrom, undefined, true);

    await this.getMetaData();
    await drive.driveService.getMetaData();
  }

  async copyToDrive(identificatorFrom: string, identificatorTo: string, drive: AbstractDrive, overwrite?: boolean): Promise<void> {
    const moveFromLink = await this.getDownloadLink(identificatorFrom, undefined);
    await drive.driveService.uploadByUrl(identificatorTo, moveFromLink.href, undefined);

    await this.getMetaData();
    await drive.driveService.getMetaData();
  }

}
