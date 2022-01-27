import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SidebarAndContentTemplateComponent
} from './sidebar-and-content-template/sidebar-and-content-template.component';
import {AvatarComponent} from './avatar/avatar.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import { DogsSliderComponent } from './dogs-slider/dogs-slider.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MessageListElementComponent } from './message-list-element/message-list-element.component';



@NgModule({
  declarations: [
    SidebarAndContentTemplateComponent,
    AvatarComponent,
    DogsSliderComponent,
    MessageListElementComponent
  ],
    exports: [
        SidebarAndContentTemplateComponent,
        AvatarComponent,
        DogsSliderComponent,
        MessageListElementComponent
    ],
    imports: [
        CommonModule,
        MatChipsModule,
        MatIconModule,
        MatButtonModule,
        RouterModule,
        MatTabsModule
    ]
})
export class SharedModule { }
