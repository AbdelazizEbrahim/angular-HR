import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() appHighlight = '#ffeb3b';
  @Input() highlightOpacity = '0.3';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight, this.highlightOpacity);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null, null);
  }

  private highlight(color: string | null, opacity: string | null) {
    if (color) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
      this.renderer.setStyle(this.el.nativeElement, 'opacity', opacity);
      this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'opacity');
    }
  }
}