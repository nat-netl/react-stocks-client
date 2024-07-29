import React from "react";
import s from "./sheetItem.module.scss";
import { IStock } from "../../types/stock";
import Button from "../../ui/buttons/Button/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const SheetItem: React.FC<IStock> = ({
  id,
  name,
  date,
  quantity,
  setActiveEditForm,
  activeEditForm,
  handleDelete
}) => {
 

  return (
    <tr className={s.item}>
      <td>{name}</td>
      <td>{date}</td>
      <td>{quantity}</td>
      <td>
        <Button color="red">
          <DeleteIcon onClick={() => handleDelete(id)} sx={{ color: "#FFFF" }} fontSize="small" />
        </Button>
      </td>
      <td>
        <Button color="blue">
          <EditIcon
            onClick={() => setActiveEditForm([{ id: id, status: true }])}
            name="edit"
            sx={{ color: "#FFFF" }}
            fontSize="small"
          />
        </Button>
      </td>
    </tr>
  );
};

export default SheetItem;
