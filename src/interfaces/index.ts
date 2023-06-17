export interface IAPIResponse {
  statusCode: number;
  message: string;
  data: any;
  error?: any;
}
