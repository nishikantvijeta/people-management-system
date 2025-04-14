import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeopleComponent } from './people.component';  // Correct import for PeopleComponent

describe('PeopleComponent', () => {  // Changed the name to match 'PeopleComponent'
  let component: PeopleComponent;  // Use PeopleComponent instead of EmployeeComponent
  let fixture: ComponentFixture<PeopleComponent>;  // Use PeopleComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent ]  // Register PeopleComponent here
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);  // Create component instance for PeopleComponent
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();  // Test if the component is created successfully
  });
});
