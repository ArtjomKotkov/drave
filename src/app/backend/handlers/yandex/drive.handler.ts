import {AbstractDriveHandler} from "../base/drive.handler";


export class YandexDriveHandler extends AbstractDriveHandler {

  apiUrl = 'https://cloud-api.yandex.net/v1/disk/';

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
      this.apiUrl + 'resources',
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
      this.apiUrl + 'resources',
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
      this.apiUrl + 'resources',
      {
        fields: fields
      }
    );

    const response = await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(data)
    });

    return await response.json();
  }

  async makeDir(
    identificator: string,
    fields: Array<string> | undefined = undefined
  ): Promise<object> {

    const url = this.createUrl(
      this.apiUrl + 'resources',
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
      this.apiUrl + 'resources/download',
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
    fields: Array<string> | undefined = undefined,
    overwrite: boolean = false): Promise<object> {

    const url = this.createUrl(
      this.apiUrl + 'resources/copy',
      {
        fields: fields
      }
    );

    const response = await fetch(url, {
      method: 'POST'
    });

    return await response.json();
  };

  async move(
    identificator_from: string,
    identificator_to: string,
    fields: Array<string> | undefined = undefined,
    overwrite: boolean = true
  ): Promise<object> {
    const url = this.createUrl(
      this.apiUrl + 'resources/move',
      {
        fields: fields
      }
    );

    const response = await fetch(url, {
      method: 'POST'
    });

    return await response.json();
  }

  async publish(identificator: string, fields: Array<string> | undefined): Promise<object> {
    const url = this.createUrl(
      this.apiUrl + 'resources/publish',
      {
        fields: fields
      }
    );

    const response = await fetch(url, {
      method: 'put'
    });

    return await response.json();
  };

  async unpublish(identificator: string, fields: Array<string> | undefined): Promise<object> {
    const url = this.createUrl(
      this.apiUrl + 'resources/unpublish',
      {
        fields: fields
      }
    );

    const response = await fetch(url, {
      method: 'PUT'
    });

    return await response.json();
  };

  async getUploadLink(identificator: string, fields: Array<string> | undefined): Promise<object> {
    const url = this.createUrl(
      this.apiUrl + 'resources/upload',
      {
        fields: fields
      }
    );

    const response = await fetch(url);

    return await response.json();
  };

  async uploadByUrl(identificator: string, url: string, fields: Array<string> | undefined = undefined): Promise<object> {
    const url_ = this.createUrl(
      this.apiUrl + 'resources/upload',
      {
        fields: fields,
        url: url
      }
    );

    const response = await fetch(url_, {
      method: 'POST'
    });

    return await response.json();
  };

  async clearTrash(identificator: string, fields: Array<string> | undefined = undefined): Promise<object> {
    const url_ = this.createUrl(
      this.apiUrl + 'trash/resources',
      {
        fields: fields
      }
    );

    const response = await fetch(url_, {
      method: 'DELETE'
    });

    return await response.json();
  };

  async getTrash(identificator: string, fields: Array<string> | undefined): Promise<object> {
    const url_ = this.createUrl(
      this.apiUrl + 'trash/resources',
      {
        fields: fields
      }
    );

    const response = await fetch(url_);

    return await response.json();
  };

  async restoreTrash(identificator: string, fields: Array<string> | undefined): Promise<object> {
    const url_ = this.createUrl(
      this.apiUrl + 'trash/resources',
      {
        fields: fields
      }
    );

    const response = await fetch(url_, {
      method: 'PUT'
    });

    return await response.json();
  };
}
