import {YandexDriveHandler} from '../../handlers';
import {DriveAbstractService} from '../base/drive.abstract';
import {YandexConfig} from '../../state/yandex/config.data';
import {AbstractDrive, Credentials} from '../../state';
import {YandexMetaData} from '../../state/yandex/yandex.model';
import {BehaviorSubject} from 'rxjs';
import {Stack} from '../../shared';
import {AbstractFile} from '../../state/base/model.abstract';


export class YandexDriveService extends DriveAbstractService {
  handler: YandexDriveHandler = new YandexDriveHandler();

  private metaData: BehaviorSubject<YandexMetaData | undefined> = new BehaviorSubject<YandexMetaData | undefined>(undefined);

  constructor(
    private callStack: Stack<string>
  ) {
    super();
  }

  async registerCallback(code: number, function_: CallableFunction): Promise<void> {
    this.handler.request.registerCallback(code, function_, true);
  }

  async rebuild(credentials?: Credentials): Promise<void> {
    if (credentials === undefined) {
      return;
    }
    this.handler.configure(credentials);
    await this.updateMetaData();
  }

  getMetaData(): YandexMetaData | undefined {
    return this.metaData.getValue();
  }

  async updateMetaData(): Promise<void> {
    const data = await this.handler.getMetaData();
    const metaData = this.parseMetaData(data);
    this.metaData.next(metaData);
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
  ): Promise<AbstractFile> {
    this.callStack.clear();
    return await this.get(YandexConfig.rootFolder, fields, limit, offset);
  }

  async get(
    identificator: string,
    fields?: Array<string> | undefined,
    limit?: number | undefined,
    offset?: number | undefined
  ): Promise<AbstractFile> {
    this.callStack.add(identificator);
    return this.yandexDataToFile(await this.handler.get(identificator, fields, limit, offset)) as AbstractFile;
  }

  async delete(
    identificator: string,
    fields?: Array<string> | undefined,
    permanently: boolean = false
  ): Promise<AbstractFile> {
    const response = this.yandexDataToFile(await this.handler.delete(identificator, fields, permanently)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async update(
    identificator: string,
    data: object,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.yandexDataToFile(await this.handler.update(identificator, data, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async makeDir(
    identificator: string,
    name: string,
    fields?: Array<string>
  ): Promise<AbstractFile> {
    return this.yandexDataToFile(await this.handler.makeDir(name, identificator, fields)) as AbstractFile;
  }

  async getDownloadLink(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<string | undefined> {
    return (await this.handler.getDownloadLink(identificator, fields)).href as string;
  }

  async copy(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = false
  ): Promise<AbstractFile> {
    const response = this.yandexDataToFile(await this.handler.copy(identificatorFrom, identificatorTo, fields, overwrite)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async move(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = false
  ): Promise<AbstractFile> {
    const response = this.yandexDataToFile(await this.handler.move(identificatorFrom, identificatorTo, fields, overwrite)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async publish(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.yandexDataToFile(await this.handler.publish(identificator, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async unpublish(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.yandexDataToFile(await this.handler.unpublish(identificator, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async clearTrash(
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.yandexDataToFile(await this.handler.clearTrash(YandexConfig.trashRoot, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async clearFromTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.yandexDataToFile(await this.handler.clearTrash(identificator, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async getTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    return this.yandexDataToFile(this.handler.getTrash(identificator, fields)) as AbstractFile;
  }

  async restoreTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<AbstractFile> {
    const response = this.yandexDataToFile(await this.handler.restoreTrash(identificator, fields)) as AbstractFile;
    await this.updateMetaData();
    return response;
  }

  async download(identificator: string): Promise<Blob> {
    return await this.handler.download(identificator);
  }

  async upload(identificator: string, file: Blob): Promise<AbstractFile> {
    return await this.handler.upload(identificator, file) as AbstractFile;
  }

  async moveToDrive(identificatorFrom: string, identificatorTo: string, drive: AbstractDrive, overwrite?: boolean): Promise<void> {
    const fileFrom = await this.handler.download(identificatorFrom);

    await drive.driveService.upload(identificatorTo, fileFrom);
    await this.delete(identificatorFrom);

    await this.updateMetaData();
    await drive.driveService.updateMetaData();
  }

  async copyToDrive(identificatorFrom: string, identificatorTo: string, drive: AbstractDrive, overwrite?: boolean): Promise<void> {
    const fileFrom = await this.handler.download(identificatorFrom);

    await drive.driveService.upload(identificatorTo, fileFrom);

    await this.updateMetaData();
    await drive.driveService.updateMetaData();
  }

  private yandexDataToFile(data: any, getNested: boolean = true): AbstractFile {

    function getFileData(dataN: any): AbstractFile {
      return {
        id: dataN.path,
        name: dataN.name,
        mimeType: dataN.mime_type,
        size: dataN.size,
        created: dataN.created,
        modified: dataN.modified,
        isDir: !!dataN._embedded?.items,
        type: dataN.type,
      };
    }

    const output = getFileData(data);

    if (getNested && data._embedded && data._embedded.items) {
      output.nested = {
        limit: data._embedded.limit,
        offset: data._embedded.offset,
        files: []
      };
      for (const item of data._embedded.items) {
        output.nested?.files?.push(getFileData(item));
      }
    }
    return output;
  }

}
