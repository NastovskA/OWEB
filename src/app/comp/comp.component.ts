import { Component, Input } from '@angular/core';
import { driver } from '../../driver';
@Component({
  selector: 'app-comp',
  imports: [NgIf, NgClass, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './comp.component.html',
  styleUrl: './comp.component.css'
})
export class CompComponent {

  @Input()
  vozac:driver | undefined;

  @Input()
  indeks:number | undefined;
  

  // onDrvView(){
  //   console.log("KLIKNA ME")
  // }

  onDrvView(){
    let link: string | undefined;
    if(this.vozac?.iconUrl){
      link=this.vozac?.iconUrl
    }else{
      link = "https://www.google.com"
    };
    window.open(link, "_blank")
  }

  klasi(){
    return {'begin': this.vozac?.category=='ASD',
      'adv':this.vozac?.category=='EXPERT',
      'undr':true
    }
  }

  klasi2(){
    if(this.vozac?.category=='ASD'){return 'begin'}
    else {return 'adv'}
  }

  stilovi(){
    return 'underline'
  }

  invalid() {
    return this.vozac?.isInvalid ? 'true' : 'false';  
  }


  describedby() {
    return this.vozac?.description ? this.vozac?.description : '';  
  }

  busy() {
    return this.vozac?.isBusy ? 'true' : 'false';  
  }


}import { NgClass, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

