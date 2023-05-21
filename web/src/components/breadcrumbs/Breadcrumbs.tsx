import { Link } from 'react-router-dom';

interface IProps {
  title: string;
}

function BreadCrumbs({ title }: IProps) {
  return (
    <div>
      <Link to="/">Nákupní seznamy</Link>
      {' '}
      {'>'}
      {' '}
      {title}
    </div>
  );
}

export default BreadCrumbs;
