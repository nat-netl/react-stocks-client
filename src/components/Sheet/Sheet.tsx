import React, { useEffect, useState } from "react";
import s from "./sheet.module.scss";
import SheetItem from "../SheetItem/SheetItem";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { IStock } from "../../types/stock";
import { useActions } from "../../hooks/useActions";
import Modal from "../Modal/Modal";
import AddIcon from "@mui/icons-material/Add";
import Button from "../../ui/buttons/Button/Button";
import AddForm from "../AddForm/AddForm";
import EditForm from "../EditForm/EditForm";
import { IModalStatus } from "../../types/modal";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import Search from "../Search/Search";

const Sheet: React.FC = () => {
  const [addModalActive, setAddModalActive] = useState<IModalStatus[]>([
    { id: null, status: false },
  ]);
  const [editModalActive, setEditModalActive] = useState<IModalStatus[]>([
    { id: null, status: false },
  ]);
  const [deleted, setDeleted] = useState<boolean>(true);
  const { stocks, error, loading } = useTypeSelector((state) => state.stock);
  const { fetchStocks } = useActions();

  useEffect(() => {
    if (deleted) setDeleted(false);

    fetchStocks();
  }, [deleted]);

  const handleDelete = (currentId: number) => {
    axios
      .delete(`${BASE_URL}/delete_stock/${currentId}`)
      .then(() => setDeleted(true))
      .catch((err) => console.log(err));
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <section className={s.sheet}>
      <div className={s.wrapper}>
        <h1 className={s.title}>Акции</h1>
        <div className={s.add__stock}>
          <Button onClick={() => setAddModalActive([{ status: true }])}>
            <AddIcon sx={{ color: "#FFFF" }} fontSize="large" />
          </Button>
        </div>
        <Search />
        <table className={s.table}>
          <thead>
            <tr className={s.row__title}>
              <th scope="col">Название рассылки</th>
              <th scope="col">Дата рассылки</th>
              <th scope="col">Кол-во отправленных подарков</th>
              <th scope="col">Отмена рассылки</th>
              <th scope="col">Редактировать рассылку</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              stocks.data?.map((stock: IStock) => (
                <SheetItem
                  key={stock.id}
                  id={stock.id}
                  name={stock.name}
                  date={stock.date}
                  quantity={stock.quantity}
                  days_receive_gift={stock.days_receive_gift}
                  days_receipt_gift={stock.days_receipt_gift}
                  description={stock.description}
                  card_numbers={stock.card_numbers}
                  activeEditForm={editModalActive}
                  setActiveEditForm={setEditModalActive}
                  handleDelete={handleDelete}
                />
              ))}
          </tbody>
        </table>
      </div>

      <Modal active={addModalActive} setActive={setAddModalActive}>
        <AddForm />
      </Modal>
      <Modal active={editModalActive} setActive={setEditModalActive}>
        <EditForm id={editModalActive[0].id} />
      </Modal>
    </section>
  );
};

export default Sheet;
