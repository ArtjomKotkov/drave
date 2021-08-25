export interface DriveConfig {
  base: BaseConfig;
  common: CommonConfig;
  workflow: WorkFlowConfig;
}

export interface CommonConfig {
  color: string;
  name: string;
  type: string;
}

export interface BaseConfig {
  readonly rootFolder: string;
  readonly trashRoot: string;
  baseColor: string;
}

export interface WorkFlowConfig  {
  default: DefaultWorkFlowConfig;
}

export interface DefaultWorkFlowConfig {
  isEnabled: boolean;
  isHidden: boolean;
}

export interface AppConfig {
  workflow: AppWorkFlowConfig;
}

export interface AppWorkFlowConfig  {
  yandexEnabled: boolean;
  googleEnabled: boolean;
}
