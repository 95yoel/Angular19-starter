import { bootstrapApplication } from '@angular/platform-browser'
import { appConfig } from './app/app.config'
import { AppComponent } from './app/app.component'
import { Logger } from 'ts-logger/src/logger'

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err))

const log = Logger.create('Angular19-starter')
log.info('working')