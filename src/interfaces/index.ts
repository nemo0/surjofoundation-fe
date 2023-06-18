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
  aadhaarNumber: string;
  contactNumber: string;
  address: string;
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
}

export interface UserObject {
  sub: string;
  email: string;
  role: string;
  centerId: string;
}
