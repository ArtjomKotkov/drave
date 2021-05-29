import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'connections',
    loadChildren: () => import('./features/connection/connection.module').then(m => m.ConnectionModule)
  },
  {
    path: 'workflow',
    loadChildren: () => import('./features/workflow/workflow.module').then(m => m.WorkflowModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
