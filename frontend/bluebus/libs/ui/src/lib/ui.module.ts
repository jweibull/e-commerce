import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadPanelComponent } from './components/load-panel/load-panel.component';

@NgModule({
    imports: [
      CommonModule,
    ],
    declarations: [
      LoadPanelComponent
    ],
    exports: [
      LoadPanelComponent
    ]
})
export class UiModule {}
