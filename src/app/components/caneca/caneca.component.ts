import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-caneca',
  templateUrl: './caneca.component.html',
  styleUrls: ['./caneca.component.css']
})
export class CanecaComponent implements OnInit {

  constructor() { }

  @Input() items;
  ngOnInit(): void {
    this.items = ["1", "2"]
  }


  caneca = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
