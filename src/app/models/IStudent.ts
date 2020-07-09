import {IAddress} from "./IAddress";

export interface IStudent {
  studentId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: IAddress;
  enrollmentDate: string;
}
