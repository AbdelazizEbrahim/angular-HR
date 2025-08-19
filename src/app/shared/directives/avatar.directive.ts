import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAvatar]'
})
export class AvatarDirective implements OnInit {
  @Input() name: string;
  @Input() size = 40;
  @Input() fontSize = 16;
  @Input() bgColor = '#3f51b5';
  @Input() textColor = '#ffffff';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'width', `${this.size}px`);
    this.renderer.setStyle(this.el.nativeElement, 'height', `${this.size}px`);
    this.renderer.setStyle(this.el.nativeElement, 'border-radius', '50%');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'justify-content', 'center');
    this.renderer.setStyle(this.el.nativeElement, 'background-color', this.bgColor);
    this.renderer.setStyle(this.el.nativeElement, 'color', this.textColor);
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', '500');
    this.renderer.setStyle(this.el.nativeElement, 'font-size', `${this.fontSize}px`);

    const initials = this.getInitials(this.name);
    this.renderer.setProperty(this.el.nativeElement, 'textContent', initials);
  }

  private getInitials(name: string): string {
    if (!name) return '';

    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  }
}