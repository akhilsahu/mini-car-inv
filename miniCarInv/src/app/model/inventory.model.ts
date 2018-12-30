export class InventoryData {
	data: InventoryItem[];
  total : number;
}
export interface InventoryItem {
  model_name: string;
  registration_no: string;
  manufacturer_name: string;
  manufacture_year: string;
	note: string;
    count: number;
}
