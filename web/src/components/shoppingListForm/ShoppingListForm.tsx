import React, { useState } from 'react';
import { useFormik } from 'formik';
import { IList } from '../../context/ShopingListsContext';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { PureButton } from '../button/Button';
import Fieldset from '../fieldset/Fieldset';

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
        <Fieldset>
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
        </Fieldset>
        <div>
          <PureButton type="submit">{isEditMode ? 'Upravit' : 'Vytvořit'}</PureButton>
          {isEditMode && onRemove
            && <PureButton type="button" onClick={onRemove}>Smazat</PureButton>}
        </div>
      </form>
    </div>
  );
}

export default React.memo(ShoppingListForm);
