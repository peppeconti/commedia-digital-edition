import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterContainerComponent } from './router-container/router-container.component';

const routes: Routes = [
  { path: ':cantica/:canto', component: RouterContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
