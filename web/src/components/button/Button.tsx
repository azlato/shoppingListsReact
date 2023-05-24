import { css, styled } from 'styled-components';
import { Link } from 'react-router-dom';
import styleVariables from '../../styleVariables';

const buttonLinkStyle = css`
    & {
        border-radius: 8px;
        border: 1px solid transparent;
        height: 40px;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: ${styleVariables.colors.gray200};
        cursor: pointer;
        transition: border-color 0.25s;
        text-align: center;

        text-decoration: none;

        color: ${styleVariables.colors.black};
        box-sizing: border-box;
    }

    &:hover {
        border-color: ${styleVariables.colors.gray600};
    }

    &:focus,
        outline: 4px auto -webkit-focus-ring-color;
    }
`;

export const LinkButton = styled(Link)`
    ${buttonLinkStyle}
`;

export const PureButton = styled.button`
    ${buttonLinkStyle}
`;
