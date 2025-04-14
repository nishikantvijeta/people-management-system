import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { People } from '../models/people.model';  // Change import to People model

@Component({
  selector: 'app-people',  // Changed selector to 'app-people'
  templateUrl: './people.component.html',  // Update template to reflect People component
  styleUrls: ['./people.component.css'],
})
export class PeopleComponent implements OnInit {  // Changed class name to 'PeopleComponent'
  @Input() people: People;  //
  @Output() onRemovePeople = new EventEmitter<number>();  // Event for remove
  @Output() onEditPeople = new EventEmitter<number>();  // Event for edit

  constructor() {
    this.people = {
      name: '',  // Name will now hold full name
      age: 0,    // Age
      gender: '', // Gender
      mobileNo: '',  // Mobile number
      // profile: '',  // Removed profile image
    };
  }

  ngOnInit(): void {
    console.log(this.people);
  }

  deletePeopleClicked() {
    this.onRemovePeople.emit(this.people.id);  // Emit id for deletion
  }

  editPeopleClicked(){
    this.onEditPeople.emit(this.people.id);  // Emit id for editing
  }
}
