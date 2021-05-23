import {AbstractDriveHandler} from '../base/drive.handler';
import {Request} from '../shared/request';
import {Credentials} from '../../state';


export class YandexDriveHandler extends AbstractDriveHandler {

  credentials: Credentials | undefined;
  apiUrl = 'https://cloud-api.yandex.net/v1/disk/';
  request = new Request();

  configure(credentials: Credentials): void {
    this.request.configure({
      headers: {
        Authorization: `OAuth ${credentials.accessToken}`
      }
    });
  }

  async getMetaData(): Promise<object> {
    const response = await this.request.make(this.apiUrl);
    return await response.json();
  }

  async get(
    identificator: string,
    fields?: Array<string> | undefined,
    limit?: number | undefined,
    offset?: number | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources', {
      query: {
        path: identificator,
        fields: fields?.join(','),
        limit,
        offset
      }
    });

    return await response.json();
  }

  async delete(
    identificator: string,
    fields?: Array<string> | undefined,
    permanently?: boolean
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources', {
      query: {
        path: identificator,
        fields: fields?.join(','),
        permanently
      },
      method: 'DELETE'
    });

    return await response.json();
  }

  async update(
    identificator: string,
    dataMap: object,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources', {
      query: {
        path: identificator,
        fields: fields?.join(','),
      },
      method: 'PATCH',
      data: dataMap
    });

    return await response.json();
  }

  async makeDir(
    name: string,
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources', {
      query: {
        path: identificator.endsWith('/') ? identificator + name : identificator + '/' + name,
        fields: fields?.join(','),
      },
      method: 'PUT',
    });

    return await response.json();
  }

  async getDownloadLink(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<any> {
    const response = await this.request.make(this.apiUrl + 'resources/donwload', {
      query: {
        path: identificator,
        fields: fields?.join(','),
      }
    });

    return await response.json();
  }

  async copy(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = false): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/copy', {
      query: {
        from: identificatorFrom,
        path: identificatorTo,
        fields: fields?.join(','),
        overwrite
      },
      method: 'POST'
    });

    return await response.json();
  }

  async move(
    identificatorFrom: string,
    identificatorTo: string,
    fields?: Array<string> | undefined,
    overwrite: boolean = true
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/move', {
      query: {
        from: identificatorFrom,
        path: identificatorTo,
        fields: fields?.join(','),
        overwrite
      },
      method: 'POST'
    });

    return await response.json();
  }

  async publish(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/publish', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'PUT'
    });

    return await response.json();
  }

  async unpublish(identificator: string, fields: Array<string> | undefined): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'resources/unpublish', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'PUT'
    });

    return await response.json();
  }

  async download(
    identificator: string
  ): Promise<Blob> {
    const downloadLink = await this.getDownloadLink(identificator);
    const response = await this.request.make(downloadLink);

    return await response.blob();
  }

  private async getUploadLink(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<any> {
    const response = await this.request.make(this.apiUrl + 'resources/upload', {
      query: {
        path: identificator,
        fields: fields?.join(','),
      }
    });

    return await response.json();
  }

  async upload(
    identificator: string,
    file: Blob
  ): Promise<object> {

    const uploadLink = await this.getDownloadLink(identificator);

    return await this.request.make(uploadLink, {
      headers: {
        'Content-Type': file.type,
        'Content-Length': String(file.size)
      },
      data: file
    });
  }

  async clearTrash(identificator: string, fields?: Array<string>): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'trash/resources', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'DELETE'
    });

    return await response.json();
  }

  async getTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'trash/resources', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      }
    });

    return await response.json();
  }

  async restoreTrash(
    identificator: string,
    fields?: Array<string> | undefined
  ): Promise<object> {
    const response = await this.request.make(this.apiUrl + 'trash/resources', {
      query: {
        path: identificator,
        fields: fields?.join(',')
      },
      method: 'PUT'
    });

    return await response.json();
  }
}
