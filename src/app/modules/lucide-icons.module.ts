import { NgModule } from '@angular/core'
import { LucideAngularModule, BadgeEuro, Pyramid, AppWindow, FolderKanban, Database, Squirrel, Earth, Siren, Bell} from 'lucide-angular'

/**
 * Lucide Icons Module 
 * 
 * Manages the import and export of selected Lucide Angular icons.
 * Optimizes the performance by including only the necessary icons.
 * 
 * @see https://lucide.dev/icons/
 */
@NgModule({
  imports: [
    LucideAngularModule.pick({ // Add here only the neede Lucide icons
      BadgeEuro,
      Pyramid,
      AppWindow,
      Squirrel,
      FolderKanban,
      Database,
      Earth,
      Siren,
      Bell
    })
  ],
  exports: [
    LucideAngularModule
  ]
})
export class LucideIconsModule {}
