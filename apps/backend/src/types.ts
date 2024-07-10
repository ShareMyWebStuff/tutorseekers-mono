import { RowDataPacket } from "mysql2";

export interface DeployedItem extends RowDataPacket {
  deploy_id: number;
  description: string;
  filename: string;
  status: string;
  created_at: Date;
}
