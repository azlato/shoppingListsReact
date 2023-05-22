import { useState } from 'react';
import { useFormik } from 'formik';
import { IList } from '../../context/ShopingListsContext';
import ErrorMessage from '../errorMessage/ErrorMessage';

interface IProps {
  isEditMode?: boolean;
  initialValues?: Partial<IList>;
  onSubmit(values: Partial<IList>): Promise<unknown>;
  onRemove?(): Promise<unknown>;
}

function ShoppingListForm({
  isEditMode, initialValues, onSubmit, onRemove,
}: IProps) {
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
          <button type="submit">{isEditMode ? 'Upravit' : 'Vytvořit'}</button>
          {isEditMode && onRemove
            && <button type="button" onClick={onRemove}>Smazat</button>}
        </div>
      </form>
    </div>
  );
}

export default ShoppingListForm;
