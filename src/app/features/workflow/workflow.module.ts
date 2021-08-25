import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommonComponent} from './common/common.component';
import {PipesModule} from '../pipes/pipes.module';
import {WorkflowRoutingModule} from './workflow-routing.module';
import {ColorDirective, KeyValue} from '../../utils';
import {SectionComponent} from './shared/section/section.component';
import {SideBarComponent} from './shared/side-bar/side-bar.component';
import {ScrollAreaComponent} from './shared/scroll-area/scroll-area.component';
import {DirectivesModule} from '../dirrectives/directives.module';
import { VerticalComponent } from './menu/vertical/vertical.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { WorkareaComponent } from './shared/workarea/workarea.component';
import { WorkItemComponent } from './shared/workarea/work-item/work-item.component';


@NgModule({
  declarations: [
    CommonComponent,
    SectionComponent,
    SideBarComponent,
    ScrollAreaComponent,

    ColorDirective,
    KeyValue,
    VerticalComponent,
    WorkareaComponent,
    WorkItemComponent,
  ],
  imports: [
    CommonModule,
    WorkflowRoutingModule,
    PipesModule,
    DirectivesModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatProgressBarModule
  ]
})
export class WorkflowModule {
}
