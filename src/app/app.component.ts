import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { People } from './models/people.model';
import { PeopleService } from './services/people.service';
import { HeaderComponent } from './header/header.component';  // Import HeaderComponent
import { PeopleComponent } from './people/people.component';  // Import PeopleComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('addPersonButton') addPersonButton: any;
  title = 'PeopleCRUD';

  // peopleForm: FormGroup;
  peopleForm: FormGroup = this.fb.group({
    fullname: this.fb.control(''),
    age: this.fb.control(''),
    gender: this.fb.control(''),
    mobile: this.fb.control(''),
  });
  peoples: People[] = [];
  peoplesToDisplay: People[] = [];

  constructor(
    private fb: FormBuilder,
    private peopleService: PeopleService
  ) {}

  ngOnInit(): void {
    // Initializing form controls for the people form
    this.peopleForm = this.fb.group({
      fullname: this.fb.control(''),
      age: this.fb.control(''),
      gender: this.fb.control(''),
      mobile: this.fb.control(''),
    });

    // Fetching people data from the PeopleService
    this.peopleService.getPeoples().subscribe((res) => {
      this.peoples = res; // Storing people in the list
      this.peoplesToDisplay = this.peoples; // Displaying all people initially
    });
  }

  ngAfterViewInit(): void {}

  // Function to add a person
  addPeople() {
    if (this.peopleForm.invalid) {
      return; // Optionally, display a message that the form is invalid
    }

    let person: People = {
      name: this.FullName.value,
      age: this.Age.value,
      gender: this.Gender.value,
      mobileNo: this.MobileNo.value,
      // Uncomment if profile image is added
      // profile: this.fileInput.nativeElement.files[0]?.name,
    };

    // Adding the new person by calling the service
    this.peopleService.postPeople(person).subscribe({
      next: (res) => {
        this.peoples.unshift(res); // Add new person to the list
        this.clearForm(); // Clear form after adding the person
      },
      error: (err) => {
        console.error('Error adding person:', err);
      },
    });
  }

  // Function to remove a person
  removePeople(id: number) {
    const personIndex = this.peoples.findIndex((val) => val.id === id);
    if (personIndex !== -1) {
      // Calling the service to delete the person
      this.peopleService.deletePeople(id).subscribe({
        next: () => {
          this.peoples.splice(personIndex, 1); // Removing person from the list
        },
        error: (err) => {
          console.error('Error removing person:', err);
        },
      });
    }
  }

  // Function to edit a person's information
  editPeople(id: number) {
    const person = this.peoples.find((p) => p.id === id);
    if (person) {
      this.setForm(person); // Pre-filling the form with selected person's data
      this.removePeople(id); // Removing the person from the list
      this.addPersonButton.nativeElement.click(); // Opening the form to edit
    }
  }

  // Function to set form values for editing
  setForm(person: People) {
    this.FullName.setValue(person.name);  // Set full name in the form
    this.Age.setValue(person.age);         // Set age in the form
    this.Gender.setValue(person.gender);   // Set gender in the form
    this.MobileNo.setValue(person.mobileNo);  // Set mobile number in the form
    this.fileInput.nativeElement.value = ''; // Reset file input field
  }

  // Function to search people based on input
  searchPeople(event: any) {
    const searchKey = event.toLowerCase();
    this.peoplesToDisplay = searchKey
      ? this.peoples.filter((p) =>
          p.name.toLowerCase().includes(searchKey)
        )
      : this.peoples; // Filter people based on search query
  }

  // Function to clear form inputs
  clearForm() {
    this.FullName.setValue('');
    this.Age.setValue('');
    this.Gender.setValue('');
    this.MobileNo.setValue('');
    this.fileInput.nativeElement.value = '';  // Clear file input
  }

  // Getters for form controls
  public get FullName(): FormControl {
    return this.peopleForm.get('fullname') as FormControl;
  }

  public get Age(): FormControl {
    return this.peopleForm.get('age') as FormControl;
  }

  public get Gender(): FormControl {
    return this.peopleForm.get('gender') as FormControl;
  }

  public get MobileNo(): FormControl {
    return this.peopleForm.get('mobile') as FormControl;
  }
}
