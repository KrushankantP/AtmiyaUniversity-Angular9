import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FacultyService} from "../../../services/faculty.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IFaculty} from "../../../models/IFaculty";


@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.css']
})
export class CreateFacultyComponent implements OnInit {

  FacultyFormModel: FormGroup;
  successMsg: boolean =false;
  errorMsg: boolean = false;
  Message: string;
  @Input() formTitle: string;
  @Input() public facultyObj;
  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {

    'firstName': '',
    'lastName': '',
    'email': '',
    'phone': '',
    'gender': '',
    'dateOfBirth': '',
    'streetAddress_1': '',
    'city': '',
    'state': '',
    'zip': '',
    'designation': '',
    'salary': ''
  };

  // This object contains all the validation message for the form
    validationMessages = {
      'firstName': {
        'required': 'First Name is required.',
        'minlength': 'First Name must be greater than 3 characters.',
        'maxlength': 'First Name must be less than 20 characters.'
      },
      'lastName': {
        'required': 'Last Name is required.',
        'minlength': 'Last Name must be greater than 3 characters.',
        'maxlength': 'Last Name must be less than 20 characters.'
      },
      'email': {
        'required': 'Email is Required!',
        'email': 'Email must be in this format(example@example.example)'
      },
      'phone': {
        'required': 'Phone No is Required!',
        //'pattern': 'Phone No must be number only.',
        'minlength': 'Phone No length must be 10 digits'
      },
      'gender': {
        'required': 'Male or Female Must be selected !'
      },
      'dateOfBirth': {
        'required': 'Date of Birth is Required!'
      },
      'enrollmentDate': {
        'required': 'Enrollment date is Required.'
      },
      'streetAddress_1': {
        'required': 'Street Address is Required.'
      },
      'city': {
        'required': 'City is Required.',
       // 'pattern': 'Must be string only.',
        'minlength': 'City name must be at list 3 character',
        'maxlength': 'No more than 15 characters.'
      },
      'state': {
        'required': 'State is Required.'
      },
      'zip': {
        'required': 'Zip code is Required',
        //'pattern': 'Must be Numbers only Between(5 to 7 numbers).'
      },
      'designation':{
        'required': 'Designation is Required',
        'minlength': 'must be 3 or more characters',
        'maxlength': 'must be 40 or less characters'
      },
      'salary':{
        'required': 'salary is Required',
        'minlength': 'must be 3 or more numbers',
        'maxlength': 'must be 15 or less numbers'
      }

    };

  constructor(private fb: FormBuilder,
              private _facultyService: FacultyService,
              public _activeModal: NgbActiveModal){ }

  ngOnInit(): void {
    this.createFacultyFrom();
    if(this.facultyObj != undefined){
      this.editFacultyForm(this.facultyObj)
    }
    this.valueChangesInFacultyForm();
  }

  createFacultyFrom(): void{
    this.FacultyFormModel = this.fb.group({
      firstName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]],

      lastName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]],

      email: ['', [Validators.required,
        Validators.email]],

      phone: ['', [Validators.required,
       // Validators.pattern("^[0-9]{10}$"),
        Validators.minLength(10),
        Validators.maxLength(10)]],

      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],

      Address: this.fb.group({
        streetAddress_1: ['', [Validators.required]],
        streetAddress_2: [''],
        city: ['', [Validators.required,
                    //Validators.pattern('^[-\s/a-z/A-Z]$'),
                    Validators.minLength(3),
                    Validators.maxLength(15)]],

        state: ['', [Validators.required]],
        zip: ['', [Validators.required,
                  //Validators.pattern('^[0-9]{5,7}$')
              ]]
      }),
      designation:['',[Validators.required,
                      Validators.minLength(3),
                      Validators.maxLength(40)]],

      salary: ['', [Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(15)]]
    });
  }

  editFacultyForm(faculty: IFaculty){
    this.FacultyFormModel.patchValue({
        firstName: faculty.firstName,
        lastName: faculty.lastName,
        email: faculty.email,
        phone: faculty.phone,
        gender: faculty.gender,
        dateOfBirth: new Date(faculty.dob).toISOString().split('T')[0],
        Address: {
          streetAddress_1: faculty.address.streetAddress_1,
          streetAddress_2: faculty.address.streetAddress_2,
          city: faculty.address.city,
          state: faculty.address.state,
          zip: faculty.address.zip
        },
      designation: faculty.designation,
      salary: faculty.salary
      });
  }
  valueChangesInFacultyForm(): void {
    this.FacultyFormModel.valueChanges.subscribe(data => {
      this.logValidationErrors(this.FacultyFormModel);
    });
  }
    logValidationErrors(group: FormGroup =this.FacultyFormModel): void
    {
      Object.keys(group.controls).forEach((key:string)=>{
        const abstractControl =group.get(key);
        if(abstractControl instanceof FormGroup){
          this.logValidationErrors(abstractControl);
        }
        else{
          //clear the existing validation Errors
          this.formErrors[key]='';
          if(abstractControl && !abstractControl.valid
            &&(abstractControl.touched || abstractControl.dirty)){
            //Get all the validation message of the form control
            //that has failed the validation
            const message = this.validationMessages[key];
            //Find which validation has failed. for example  required minlength or maxlength.
            //store that error message in the formError object.
            //The UI will bind to this object to display the validation errors.

            for(const errorKey in abstractControl.errors)
            {
              if(errorKey){
                this.formErrors[key]+= message[errorKey]+' ';
              }
            }
          }
        }
      })
    }

  onSubmit(): void {
    this._facultyService.createFaculty(this.FacultyFormModel.value).subscribe(res=> {
      this.FacultyFormModel.reset();
      this._facultyService.refreshList();
      this.successMsg=true
      this.Message="Faculty Details Saved Successfully"
    },
      (error) => {
          this.errorMsg = true
        this.Message= "Something went wrong. Please try again after some time..!"
        setTimeout(msg=> {this.errorMsg =false}, 5000)
        })

    setTimeout(msg=> {
      this.successMsg = false;
    },5000);
  }

}

