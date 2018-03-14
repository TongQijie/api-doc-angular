import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';

//import { TreeModule } from 'ng2-tree';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree'; 

const appRoutes: Routes = [
  { path: ':organization/:project/doc', component: DocumentComponent },
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
    FormsModule,
    TreeModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
