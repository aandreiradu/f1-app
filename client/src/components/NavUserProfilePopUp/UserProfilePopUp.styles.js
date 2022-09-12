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

export const ScalingOpen = keyframes`
    0%{
        transform: scale(0);
        
    }

    100%{
        transform: scale(1);
    }
`

export const ScalingClose = keyframes`
    0%{
        transform: scale(1);
        
    }

    100%{
        transform: scale(0);
    }
`

export const ProfilerWrapper = styled.div`
    position: absolute;
    bottom: -220px;
    right: 7px;
    height: 200px;
    width: 200px;
    /* background-color: rgba(255,255,255,.8); */
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
    /* background-image: radial-gradient( circle farthest-corner at 50% 111.2%,  rgba(255,124,0,1) 0%, rgba(255,124,0,1) 15.9%, rgba(255,163,77,1) 15.9%, rgba(255,163,77,1) 24.4%, rgba(19,30,37,1) 24.5%, rgba(19,30,37,1) 66% ); */
    border-radius: 5px;
    border-top-right-radius: 0;
    padding: 0 .25rem;
    animation-name: ${props => props.active ? ScalingOpen : ScalingClose};
    animation-duration: .25s;
    animation-timing-function: linear;
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
    /* background-color: rgba(255,255,255,.6); */
    background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
    animation: ${TriangleFade} .7s linear;
`

export const ProfilerUserName = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: #000;
    font-style: italic;
    padding: 0.25rem 0;
    border-bottom: 1px solid #e10600;
    text-align: right;
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
    color: #000;
    font-size: 1rem;
    /* margin: .5rem 0; */

    padding: 10px 10px 10px 0;
    border: solid 1px #e10600;
    border-top: 0;
    border-left: 0;
    border-bottom-right-radius: 10px;
    line-height: 1;

`

export const LogoutLink = styled.span`
    ${ProfilerLinks}
    text-decoration: none;
    color: #000;
    font-size: 1rem;
    /* margin: .5rem 0; */

    padding: 10px 10px 10px 0;
    border: solid 1px #e10600;
    border-top: 0;
    border-left: 0;
    border-bottom-right-radius: 10px;
    line-height: 1;
`




