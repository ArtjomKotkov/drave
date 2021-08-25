import {Injectable} from '@angular/core';
import {LocalStorageService} from '../../../core_services/storage/local.storage';
import {BehaviorSubject} from 'rxjs';
import {AppConfig} from '../../state/base/config.abstract';


@Injectable({
  providedIn: 'root'
})
export class CommonConfigService {
  constructor(private storageService: LocalStorageService) {
  }

  private $config!: BehaviorSubject<AppConfig>;

  private storageKey = 'common-config';

  private initData: AppConfig = {
    workflow: {
      googleEnabled: true,
      yandexEnabled: true,
    }
  };

  connect(): void {
    let config = JSON.parse(this.storageService.read(this.storageKey));

    if (!config) {
      this.storageService.write(this.storageKey, JSON.stringify(this.initData));
      config = this.initData;
    }

    this.$config = new BehaviorSubject<AppConfig>(config);
  }

  get config(): AppConfig {
    return this.$config.getValue();
  }

  get configObservable(): BehaviorSubject<AppConfig> {
    return this.$config;
  }

  set(value: AppConfig): void {
    this.$config.next(value);
    this.storageService.write(this.storageKey, JSON.stringify(value));
  }
}
