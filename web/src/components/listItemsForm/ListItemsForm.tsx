import { useState, memo } from 'react';
import { useFormik } from 'formik';
import { IList } from '../../context/ShopingListsContext';
import ErrorMessage from '../errorMessage/ErrorMessage';

interface IProps {
  onSubmit(values: Partial<IList>): Promise<unknown>;
}

function ListItemsForm({onSubmit}: IProps) {
  const [submitError, setSubmitError] = useState<null | string>(null);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values: Partial<IList>, { resetForm }) => {
      onSubmit(values).then(() => {
        resetForm();
        setSubmitError(null);
      }).catch((error) => {
        setSubmitError(error.message);
      });
    },
  });

  return (
    <div>
      {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="input-name">
          Název
          {' '}
          <input
            required
            id="input-name"
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </label>
        <div>
          <button type="submit">Přidat</button>
        </div>
      </form>
    </div>
  );
}

export default memo(ListItemsForm);
