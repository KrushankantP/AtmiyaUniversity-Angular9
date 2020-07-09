import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { Validators } from "@angular/forms";
import {IStudent} from "../../../models/IStudent";
import {StudentService} from "../../../services/student.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";
import * as moment from 'moment';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  StudentFormModel: FormGroup;
  successMsg: boolean =false;
  errorMsg: boolean =false;
  Message: string;
  @Input() formTitle: string;
  @Input() public studentObj;
  //@Input() date



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
    'enrollmentDate': ''

  };

  // This object contains all the validation messages for this form
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
      'required': 'City is Required.'
    },
    'state': {
      'required': 'State is Required.'
    },
    'zip': {
      'required': 'zip code is Required',
      //'pattern': 'must be number only.'
    }

  };

  //FormBuilder is an Service so that's why we have to inject in Constructor.
  constructor(private fb: FormBuilder,
              private _studentService: StudentService,
              public activeModal: NgbActiveModal,
              private _datePipe: DatePipe) {
  }

  ngOnInit(): void {
      this.createStudentForm();

      if(this.studentObj!= undefined){
      this.editStudentFrom(this.studentObj)
    }
    this.valueChangesInStudentFrom();
    console.log('selected student ID', this.studentObj)
   // console.log(this.date.toISOString())
  }


  createStudentForm(): void {
    this.StudentFormModel = this.fb.group({

      firstName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]],

      lastName: ['', [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]],

      email: ['', [Validators.required,
        Validators.email]],

      phone: ['', [Validators.required,
        //Validators.pattern("/^[0-9]*$/"),
        Validators.minLength(10),
        Validators.maxLength(10)]],

      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],

      Address: this.fb.group({
        streetAddress_1: ['', [Validators.required]],
        streetAddress_2: [''],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required
          //Validators.pattern("^$[0-9]{5,7}")
          ]
        ]
      }),
      enrollmentDate: ['', [Validators.required]],
    });
  }

  editStudentFrom(student:IStudent){
    this.StudentFormModel.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      gender: student.gender,
      dateOfBirth: new Date(student.dob).toISOString().split('T')[0],
      //moment(student.dob).format('L')
      Address: {
        streetAddress_1: student.address.streetAddress_1,
        streetAddress_2: student.address.streetAddress_2,
        city: student.address.city,
        state: student.address.state,
        zip: student.address.zip
    },
      enrollmentDate: new Date(student.enrollmentDate).toISOString().split('T')[0]
    });
  }


  // When any of the form control value in student form changes
  // our validation function logValidationErrors() is called
  valueChangesInStudentFrom(): void {
    this.StudentFormModel.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.StudentFormModel);
    });
  }

  logValidationErrors(group: FormGroup = this.StudentFormModel): void {
    //Loop through each control key in the FormGroup
    Object.keys(group.controls).forEach((key: string) => {
      //Get the control. the control can be a nested form group
      const abstractControl = group.get(key);
      //Clear the Existing Validation Errors
      this.formErrors[key] = '';
      // abstractControl.value !== '' (This condition ensures if there is a value in the
      // form control and it is not valid, then display the validation error)
      if (abstractControl && !abstractControl.valid
        && (abstractControl.touched || abstractControl.dirty || abstractControl.value !=='')) {
        //Get all the validation message of the form control
        //that has failed the validation
        const messages = this.validationMessages[key];
        //Find which validation has failed. For example require minlength or maxlength.
        // Store that error message in the formErrors object.
        // The UI will bind to this object to display the validation errors.
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      //if the control is nested form group, recursive call
      //this same method
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
    });
  }

  onLoadDataClick(): void {
    this.logValidationErrors(this.StudentFormModel);
    console.log(this.formErrors);
  }

  onSubmit(): void {
     this._studentService.CreateStudent(this.StudentFormModel.value).subscribe(res=> {
       this.StudentFormModel.reset();
       this._studentService.refreshList();
       this.successMsg=true
       this.Message="Student Detail Saved Successfully"
     },
       (error)=> {
         this.errorMsg=true
         this.Message= "Something went wrong. Please try again after some time..!"
         setTimeout( msg=>{this.errorMsg =false}, 5000)
       })

    setTimeout(msg=> {
      this.successMsg = false;
    },5000);
  }
}
