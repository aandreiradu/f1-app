import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const ProfilerFade = keyframes`
    0% {
        opacity: 0;
        /* height: 0; */
    }


    75%{
        opacity: .75;
    }

    100%{
        /* height: 200px; */
        opacity: 1;
    }
`

export const TriangleFade = keyframes`
    0% {
        opacity: 0;
    }

    75%{
        opacity: .75;
    }

    100%{
        opacity: 1;
    }
`

export const ProfilerWrapper = styled.div`
    position: absolute;
    bottom: -220px;
    right: 7px;
    height: 200px;
    width: 200px;
    background-color: rgba(255,255,255,.6);
    border-radius: 5px;
    border-top-right-radius: 0;
    padding: 0 .5rem;
    animation: ${ProfilerFade} .25s ease-in;
`


export const ProfilerTriangle = styled.span`
    position: absolute;
    display: block;
    height: 20px;
    width: 20px;
    right: 0px;
    top: -20px;
    -webkit-clip-path: polygon(50% 0%,0% 100%,100% 100%);
    -webkit-clip-path: polygon(50% 0%,0% 100%,100% 100%);
    clip-path: polygon(50% 0%,0% 100%,100% 100%);
    background-color: rgba(255,255,255,.6);
    animation: ${TriangleFade} 1s ease-in;
`

export const ProfilerUserName = styled.p`
    font-size: 1rem;
    font-weight: bold;
    color: #000;
    font-style: italic;
    padding: 0.25rem 0;
    border-bottom: 1px solid #000;
`

export const ProfilerLinksWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 180px;
`

export const ProfilerLinks = styled(Link)`
    text-decoration: none;
    color: tomato;
    font-size: 1rem;
    margin: .5rem 0;
`




