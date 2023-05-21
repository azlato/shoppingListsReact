import { useFormik } from 'formik';
import { IList } from '../../context/ShopingListsContext';

interface IProps {
  isEditMode?: boolean;
  initialValues?: Partial<IList>;
  onSubmit(values: Partial<IList>): void;
}

function ShoppingListForm({ isEditMode, initialValues, onSubmit }: IProps) {
  const formik = useFormik({
    initialValues: initialValues || {
      name: '',
    },
    onSubmit: (values: Partial<IList>, { resetForm }) => {
      onSubmit(values);

      resetForm();
    },
  });

  return (
    <div>
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
