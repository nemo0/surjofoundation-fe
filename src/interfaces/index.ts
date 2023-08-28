export interface IAPIResponse {
  statusCode: number;
  message: string;
  data: any;
  error?: any;
}

export interface IUserDecoded {
  centerId: string;
  email: string;
  exp: number;
  iat: number;
  role: string;
  sub: string;
}

export interface IStudent {
  fullName: string;
  guardianName: string;
  gender: string;
  dateOfBirth: string;
  caste: string;
  religion: string;
  aadhaarNumber: string;
  contactNumber: string;
  address: string;
  highestQualification: string;
  course: string;
  file: any;
}

export interface ICourse {
  _id: string;
  courseName: string;
  courseDescription?: string;
  courseDuration: string;
  createdAt?: string;
  updatedAt?: string;
  courseCode?: string;
  __v?: number;
}

export interface IStudentPayload {
  fullName: string;
  guardianName: string;
  aadhaarNumber: number;
  contactNumber: number;
  address: string;
  course: string;
  imageLink: string;
  registrationCenter: string;
  isCertificateIssued: boolean;
  dateOfBirth: Date;
}

export interface UserObject {
  sub: string;
  email: string;
  role: string;
  centerId: string;
}

export interface IStudentTableData {
  _id?: string;
  fullName: string;
  guardianName: string;
  contactNumber: string;
  courseName: string;
  courseDuration: string;
  isCertificateIssued: boolean;
}

interface IRegistrationCenterDetails {
  _id: string;
  name: string;
  address: string;
  centerId: string;
}

export interface IStudentResponseData {
  _id: string;
  fullName: string;
  guardianName: string;
  aadhaarNumber: number;
  contactNumber: number;
  address: string;
  imageLink: string;
  isCertificateIssued: boolean;
  registrationNumber: string;
  registrationCenterDetails: IRegistrationCenterDetails;
  courseDetails: ICourse;
}

export interface IBranchDetails {
  _id: string;
  name: string;
  email: string;
  contactNumber: number;
  address: string;
  inCharge: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  centerId: string;
}
