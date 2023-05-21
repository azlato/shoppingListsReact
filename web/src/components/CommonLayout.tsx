import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './navbar/Navbar';
import styleVariables from '../styleVariables';

const Container = styled.div`
    margin: ${styleVariables.variables.navbarHeight + 20}px auto 0;
    width: 1040px;
    max-width: 100%;
`;

function CommonLayout() {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default CommonLayout;
