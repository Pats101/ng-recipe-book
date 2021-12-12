import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    
    //Binding to a class specifically the class named open
    @HostBinding('class.open') isOpen = false;

    // This method listens in on a click on element it is set on to open dropdown
    // Also allows one to click anywhere to close the dropdown that was opened recently 
    @HostListener('document: click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;  
    }

    constructor(private elRef: ElementRef){}
}