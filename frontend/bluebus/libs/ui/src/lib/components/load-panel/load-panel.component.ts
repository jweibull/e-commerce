import { Component, Input } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'ui-load-panel',
  templateUrl: './load-panel.component.html',
  styleUrls: ['./load-panel.component.scss'],
  animations: [
    // fundo escuro que fica atrás do modal
    trigger('overlay', [
      transition(':enter', [
        // Inicia com o opacity zerado
        style({ opacity: 0 }),
        // efetua a animação de 250ms para o opacity de 0 até 0.5
        animate('250ms', style({ opacity: .5 })),
      ]),
      transition(':leave', [
        // Quando for esconder o overlay, anima do opacity atual, 0.5, até o valor 0
        animate('500ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('modal', [
      transition('void => *', [
        style({ transform: 'scale3d(.5, .5, .5)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.1, .1, .1)' }))
      ])
    ])
  ]
})
export class LoadPanelComponent {
  private visible = false;
  @Input() public title = 'Loading...';
  @Input() public message = 'Please wait...';

  public show(): void {
    this.visible = true;
  }

  public hide(): void {
    this.visible = false;
  }

  public isVisible(): boolean {
    return this.visible;
  }
}

