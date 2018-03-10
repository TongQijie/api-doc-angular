import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';

import { TreeModule } from 'ng2-tree';

const appRoutes: Routes = [
  { path: ':organization/:project/document', component: DocumentComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    TreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
