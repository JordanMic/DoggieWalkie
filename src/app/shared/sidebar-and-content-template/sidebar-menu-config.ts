import {SidebarMenuValidator} from '../sidebar-menu-validator';
import {TemplateRef} from '@angular/core';

export interface SidebarMenuConfig {
  back?: BackConfig
  sections: Section[]
}

export interface BackConfig {
  text: string;
  link: string;
}

export interface Section {
  header: string;
  tiles: Tile[];
}

export interface Tile {
  text: string;
  link: string;
  aboveContent?: boolean;
  validators?: SidebarMenuValidator[]
  extra?: any;
}
