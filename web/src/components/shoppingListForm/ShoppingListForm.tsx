import { useState } from 'react';
import { useFormik } from 'formik';
import { IList } from '../../context/ShopingListsContext';
import ErrorMessage from '../errorMessage/ErrorMessage';

interface IProps {
  isEditMode?: boolean;
  initialValues?: Partial<IList>;
  onSubmit(values: Partial<IList>): Promise<void>;
}

function ShoppingListForm({ isEditMode, initialValues, onSubmit }: IProps) {
  const [submitError, setSubmitError] = useState<null | string>(null);
  const formik = useFormik({
    initialValues: initialValues || {
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
          <input type="submit" value={isEditMode ? 'Upravit' : 'Vytvořit'} />
        </div>
      </form>
    </div>
  );
}

export default ShoppingListForm;
