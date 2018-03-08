 import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { rootRouterConfig } from './app.routes';
import { AppComponent } from './app.component';
import { ListComponent,ListItemComponent } from "./list";
import { EditComponent } from "./edit"

import { ContactService,HeaderComponent,UtilService,BtnClickDirective  } from "./shared";
import { FooterComponent} from "./shared/footer.component";
import { DetailComponent } from "./detail";

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    HeaderComponent,
    FooterComponent,
    DetailComponent,
    EditComponent,
    BtnClickDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(rootRouterConfig),
    FormsModule
  ],
  providers: [ContactService, UtilService],
  bootstrap: [AppComponent
  ]
})
export class AppModule { }
