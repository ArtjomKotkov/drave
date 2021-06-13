export interface DriveConfig {
  base?: BaseConfig;
  common?: CommonConfig;
  workflow?: WorkFlowConfig;
}

export interface CommonConfig {
  color?: string;
  name?: string;
  type?: string;
}

export interface BaseConfig {
  rootFolder: string;
  trashRoot: string;
  baseColor: string;
}

export interface WorkFlowConfig  {
  default?: DefaultWorkFlowConfig;
}

export interface DefaultWorkFlowConfig {
  isEnabled?: boolean;
  isHidden?: boolean;
}
