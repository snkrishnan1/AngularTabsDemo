import {Component, OnInit, ViewChild, AfterViewInit, TemplateRef, ComponentRef, ViewContainerRef} from '@angular/core';
import { ComponentFactoryResolver } from '@angular/core';
import { Component1 } from './Component1';
import { Component2 } from './Component2';

@Component({
  selector: 'home',
  template: `<mat-tab-group class="demo-tab-group">
  <mat-tab *ngFor="let tab of homepageTabs; let i = index" label="{{tab.label}}">
    <div class="demo-tab-content">
      <!--dynamic components i.e. Component1 and Component2 to be loaded here...-->
        <ng-container #placeholder>{{tab.templateRef}}</ng-container>
   </div>
  </mat-tab>
  </mat-tab-group>
  <div #container></div>
  `
})
export class HomeComponent implements AfterViewInit {
    activeTabIndex: any;
    cmpRef: ComponentRef<any>;
    @ViewChild('placeholder', { read: ViewContainerRef }) target: ViewContainerRef;

    homepageTabs = [
      {
        label: 'HomeLabel',
        templateRef: null,
        tabTitle: 'HomeTitle'
      }
    ];

    constructor(private cfr: ComponentFactoryResolver)
    {
      this.activeTabIndex = 0;
    }

    ngAfterViewInit() {
      let factory = this.cfr.resolveComponentFactory(Component1);
      this.cmpRef = this.target.createComponent(factory);
      this.cmpRef.instance.CompclickEvent.subscribe((v) => { this.Compclick(v)      });
      //this.homepageTabs.replace()
      //this.homepageTabs[0].templateRef = this.cmpRef;
    }

    Compclick(value: any) {
      this.activeTabIndex = this.activeTabIndex + 1;
      console.log("Event bubbled from the child component.");
      this.addTab("Child " + this.activeTabIndex, this.activeTabIndex);
    }
    
    addTab(tabTitle: any, tabPosition: any): void {
      let factory = this.cfr.resolveComponentFactory(Component2);
      this.cmpRef = this.target.createComponent(factory)
      this.activeTabIndex = tabPosition;
      this.homepageTabs.splice(tabPosition, 0, {
        label: tabTitle,
        templateRef: this.cmpRef,
        tabTitle: tabTitle
      });
    }
}