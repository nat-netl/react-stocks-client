import React from "react";
import s from "./search.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import * as yup from "yup";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { useActions } from "../../hooks/useActions";

interface IInitialValues {
  search: string;
}

const Search = () => {
  const { fetchSearchStocks } = useActions();

  const initialValues: IInitialValues = {
    search: "",
  };

  const validateSchema = yup.object().shape({
    search: yup
      .string() 
      .required("Поле не должно быть пустым")
      .min(4, "Поле не должно быть меньше 4 символов"),
  });


  const handleSearch = (values: IInitialValues) => {
    fetchSearchStocks(values.search)
  }

  return (
    <div className={s.wrapper}>
      <Formik
        validationSchema={validateSchema}
        initialValues={initialValues}
        onSubmit={(values: IInitialValues) => handleSearch(values)}
      >
        {({ errors, touched }) => (
          <Form className={s.form}>
            <div className={s.form__group}>
              <Field
                className={s.input__search}
                type="text"
                name="search"
                placeholder="Поиск"
              />
             
            </div>
            <button className={s.btn} type="submit">
              <SearchIcon sx={{ color: "#FFFF" }} fontSize="medium" />
            </button>
            {errors.search && touched.search && (
                <div className={s.error}>{errors.search}</div>
              )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Search;
