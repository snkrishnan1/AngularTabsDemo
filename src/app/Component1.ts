import {Component, Output, OnChanges, SimpleChange, EventEmitter, } from '@angular/core';

@Component({
  selector: 'Component1',
  template: `<div >Component1 Loaded, click on the button to load child component</div><button type="button" class="action-btn action-btn-default" style="float:left" (click)="compclicked()">Click to load Component2</button><br/> `
})
export class Component1 {
  @Output() CompclickEvent = new EventEmitter();
  constructor(){
  }

  compclicked()
  {
    console.log("Clicked on child component, bubbling the event to the parent");
    this.CompclickEvent.emit();
  }

}