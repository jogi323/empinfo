import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';
import { AppService } from './app.service';
// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';

// modal components
import { EditComponentComponent } from './dashboard/enrollment/edit-employee/edit-component/edit-component.component';
import { TimesheetdataComponent } from './dashboard/timesheet/timesheetdata/timesheetdata.component';
// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    EditComponentComponent,
    TimesheetdataComponent, 
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    routing,
    
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
    AppService
    //  { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [
    EditComponentComponent, TimesheetdataComponent,
  ]
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
