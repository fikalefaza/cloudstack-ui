import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { VirtualMachine } from '../vm.model';

@Component({
  selector: 'cs-vm-detail',
  templateUrl: 'vm-detail.component.html',
  styleUrls: ['vm-detail.component.scss']
})
export class VmDetailComponent {
  @Output() public onClickOutside = new EventEmitter();
  @Input() public vm: VirtualMachine;
  @Input() @HostBinding('class.open') private isOpen;
  private expandNIC: boolean;
  private expandServiceOffering: boolean;


  constructor(private elementRef: ElementRef) {
    this.expandNIC = false;
  }

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const target = event.target;
    if (!target || !this.isOpen || (<Element>event.target).tagName.toLowerCase() === 'span') { // fix!
      return;
    }

    const isOutside = !this.elementRef.nativeElement.contains(target);

    if (isOutside) {
      this.onClickOutside.emit();
    }
  }

  public toggleNIC(): void {
    this.expandNIC = !this.expandNIC;
  }

  public toggleServiceOffering(): void {
    this.expandServiceOffering = !this.expandServiceOffering;
  }

  public openConsole(): void {
    window.open(
      `/client/console?cmd=access&vm=${this.vm.id}`,
      this.vm.displayName,
      'resizable=0,width=820,height=640'
    );
  }
}
