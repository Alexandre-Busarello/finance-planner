export default interface ICreateExpenseValueDTO {
  expense_id: string;
  user_id: string;
  name: string;
  value: number;
  origin_id: string;
}
