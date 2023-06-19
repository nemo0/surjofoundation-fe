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
  courseDescription: string;
  courseDuration: string;
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
  fullName: string;
  guardianName: string;
  contactNumber: string;
  courseName: string;
  courseDuration: string;
  isCertificateIssued: boolean;
}

export interface ICourse {
  courseName: string;
  courseDuration: string;
  courseDescription: string;
  courseCode: string;
}
