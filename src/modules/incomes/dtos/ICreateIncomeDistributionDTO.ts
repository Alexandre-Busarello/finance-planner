export default interface ICreateIncomeDistributionDTO {
  user_id: string;
  month: number;
  year: number;
  description: string;
  percentage: number;
  value: number;
}
