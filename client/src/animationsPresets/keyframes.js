import styled, { keyframes } from 'styled-components';

export const growingFlexRedLines = keyframes`
    0%{
        /* opacity: 0; */
        flex: 0;
    }

    100%{
        /* opacity: 1; */
        flex: 1;
    }
`;

export const growingHeight = keyframes`
    0%{
        height: 0;
    }

    100%{
        height: 100%;
    }
`;
