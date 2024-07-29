import React, { useEffect, useState } from "react";
import s from "./editForm.module.scss";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { IValues } from "../../types/modal";
import { IStock } from "../../types/stock";

interface IEditFormProps {
  id: number | null | undefined;
}

const EditForm: React.FC<IEditFormProps> = ({ id }) => {
  const [stockData, setStockData] = useState<IStock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/stock/${id}`)
      .then((res) => {
        setStockData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  const initialValues: IValues = {
    name: stockData[0].name,
    quantity: stockData[0].quantity,
    days_receive_gift: stockData[0].days_receive_gift,
    days_receipt_gift: stockData[0].days_receipt_gift,
    card_numbers: stockData[0].card_numbers,
    description: stockData[0].description,
    date: stockData[0].date
  };

  const handleSubmit = (value: IValues) => {
    axios
      .post(`${BASE_URL}/edit_stock/${id}`, value)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    return window.location.reload();
  };

  const validateSchema = yup.object().shape({
    name: yup
      .string()
      .required("Это поле обязательно для заполнения")
      .min(4, "Не меньше 4 символов"),
    quantity: yup
      .string()
      .required("Это поле обязательно для заполнения")
      .min(0, "Не меньше 0 подарков"),
    days_receive_gift: yup
      .string()
      .required("Это поле обязательно для заполнения")
      .min(2, "Не меньше 2 дней до сгорания подарка"),
    days_receipt_gift: yup
      .string()
      .required("Это поле обязательно для заполнения")
      .min(2, "Не меньше 2 дней до сгорания подарка"),
    card_numbers: yup
      .string()
      .required("Это поле обязательно для заполнения")
      .matches(/^[0-9]+$/, "В этом поле разрешены только цифры и запятые"),
    description: yup.string().notRequired(),
  });

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Изменить акцию</h2>
      <Formik
        validationSchema={validateSchema}
        initialValues={initialValues}
        onSubmit={(values: IValues) => handleSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form className={s.form} method="post">
            <div className={s.form__group}>
              <label htmlFor="name">Название рассылки</label>
              <Field className={s.input} type="text" name="name" />
              {errors.name && touched.name && (
                <div className={s.error}>{errors.name}</div>
              )}
            </div>
            <div className={s.form__group}>
              <label htmlFor="quantity">Кол-во подарков</label>
              <Field className={s.input} type="number" name="quantity" />
              {errors.quantity && touched.quantity && (
                <div className={s.error}>{errors.quantity}</div>
              )}
            </div>

            <div className={s.form__group}>
              <label htmlFor="days_receive_gift">
                Кол-во дней на взятие подарка
              </label>
              <Field
                className={s.input}
                type="number"
                name="days_receive_gift"
              />
              {errors.days_receive_gift && touched.days_receive_gift && (
                <div className={s.error}>{errors.days_receive_gift}</div>
              )}
            </div>

            <div className={s.form__group}>
              <label htmlFor="days_receipt_gift">
                Кол-во дней на получение подарка
              </label>
              <Field
                className={s.input}
                type="number"
                name="days_receipt_gift"
              />
              {errors.days_receipt_gift && touched.days_receipt_gift && (
                <div className={s.error}>{errors.days_receipt_gift}</div>
              )}
            </div>

            <div className={s.form__group}>
              <label htmlFor="days_receive_gift">Номера карт</label>
              <Field className={s.input} type="text" name="card_numbers" />
              {errors.card_numbers && touched.card_numbers && (
                <div className={s.error}>{errors.card_numbers}</div>
              )}
            </div>

            <div className={s.form__group}>
              <label htmlFor="description">Описание</label>
              <Field
                component="textarea"
                className={s.textarea}
                name="description"
              ></Field>
              {errors.description && touched.description && (
                <div className={s.error}>{errors.description}</div>
              )}
            </div>

            <button type="submit" className={s.btn}>
              Сохранить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditForm;
