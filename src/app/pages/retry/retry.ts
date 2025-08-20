import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-retry',
  imports: [],
  templateUrl: './retry.html',
  styleUrl: './retry.scss'
})
export class Retry {
  @Input() message: string = "Sin información";
  @Input() image: string = "assets/images/empty.png";
  @Output() click = new EventEmitter<void>();

  onRetryClick(){
    this.click.emit();
  }

}
