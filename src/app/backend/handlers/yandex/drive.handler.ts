import {AbstractDriveHandler} from "../base/drive.handler";
import get = Reflect.get;


class YandexDriveHandler implements AbstractDriveHandler {

  apiUrl = 'https://cloud-api.yandex.net/v1/disk';

  async getMetaData(): Promise<object> {
    const response = await fetch(this.apiUrl);
    return await response.json();
  }

  private createUrl(url: string, data: any) {
    const newUrl = new URL(url);
    Object.keys(data).forEach(key => {
      if (data[key]) {
        let value = null;
        if (key === 'fields') {
          value = data[key].join(',');
        } else {
          value = data[key];
        }
        newUrl.searchParams.append(key, value);
      }
    });
    return newUrl.toString();
  }

  async get(
    identificator: string,
    fields: Array<string> | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined
  ): Promise<object> {

    const url = this.createUrl(
      this.apiUrl+'resources',
      {
        fields: fields,
        limit: limit,
        offset: offset
      }
    );

    const response = await fetch(url);

    return await response.json();
  }

  async delete(
    identificator: string,
    fields: Array<string> | undefined,
    permanently: boolean = false
  ): Promise<object> {

    const url = this.createUrl(
      this.apiUrl+'resources',
      {
        fields: fields,
        permanently: permanently
      }
    );

    const response = await fetch(url, {
      method: 'DELETE'
    });

    return await response.json();
  }

  async update(
    identificator: string,
    data: object,
    fields: Array<string> | undefined = undefined
  ): Promise<object> {

    const url = this.createUrl(
      this.apiUrl+'resources',
      {
        fields: fields
      }
    );

    const response = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(data)
    });

    return await response.json();
  }

  async makeDir(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<object> {

    const url = this.createUrl(
      this.apiUrl+'resources',
      {
        fields: fields
      }
    );

    const response = await fetch(url, {
      method: 'PUT'
    });

    return await response.json();
  };

  async getDownloadLink(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<object> {

    const url = this.createUrl(
      this.apiUrl+'resources/download',
      {
        fields: fields
      }
    );

    const response = await fetch(url);

    return await response.json();
  }

  async copy(
    identificator_from: string,
    identificator_to: string,
    fields: Array<string> | undefined): Promise<object> {

  };

}
