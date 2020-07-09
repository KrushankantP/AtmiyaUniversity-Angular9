import {IAddress} from "./IAddress";

export interface IFaculty {
  facultyId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: IAddress;
  designation: string;
  salary: number
}
