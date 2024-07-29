import React from "react";
export interface IModalStatus {
  id?: number | null;
  status: boolean;
}

export interface IModal{
  active: IModalStatus[];
  setActive: (value: IModalStatus[]) => void;
  children?: React.ReactNode;
}

export interface IEditModal {
  id: number;
  status: boolean;
}

export interface IValues {
  name: string;
  quantity: string | number;
  days_receive_gift: string | number;
  days_receipt_gift: string | number;
  description?: string;
  card_numbers: string | number;
}
