import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

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
`;

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
`;

export const ScalingOpen = keyframes`
    0%{
        transform: scale(0);
        
    }

    100%{
        transform: scale(1);
    }
`;

export const ScalingClose = keyframes`
    0%{
        transform: scale(1);
        
    }

    100%{
        transform: scale(0);
    }
`;

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
	padding: 0 0.25rem;
	animation-name: ${(props) => (props.active ? ScalingOpen : ScalingClose)};
	animation-duration: 0.25s;
	animation-timing-function: linear;
`;

export const ProfilerTriangle = styled.span`
	position: absolute;
	display: block;
	height: 20px;
	width: 20px;
	right: 0px;
	top: -20px;
	-webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	-webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	/* background-color: rgba(255,255,255,.6); */
	background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
	animation: ${TriangleFade} 0.7s linear;
`;

export const ProfilerUserName = styled.p`
	font-size: 14px;
	font-weight: bold;
	color: #000;
	font-style: italic;
	padding: 0.25rem 0;
	border-bottom: 1px solid #e10600;
	text-align: right;
`;

export const ProfilerLinksWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	max-height: 180px;
`;

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
`;

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
`;

export const Cut = styled.div`
	clip-path: polygon(
		49.94543% 0%,
		49.146605% 0.56499168%,
		47.908524% 1.8619327%,
		46.53612% 3.2937721%,
		45.334324% 4.2634587%,
		44.449473% 4.6785326%,
		43.75% 4.8902239%,
		43.123985% 4.967017%,
		42.459505% 4.9773959%,
		32.434877% 4.9773959%,
		22.41025% 4.9773959%,
		12.385622% 4.9773959%,
		2.3609941% 4.9773959%,
		1.7494639% 5.0755373%,
		0.9648305% 5.3952797%,
		0.28803037% 5.9746007%,
		0% 6.8514776%,
		0% 29.608196%,
		0% 52.364914%,
		0% 75.121632%,
		0% 97.87835%,
		0.17916238% 98.658483%,
		0.67451585% 99.313006%,
		1.4228599% 99.763343%,
		2.3609941% 99.930917%,
		25.989505% 99.930917%,
		49.618015% 99.930917%,
		73.246526% 99.930917%,
		96.875036% 99.930917%,
		97.979739% 99.839309%,
		98.960507% 99.515581%,
		99.662509% 98.886379%,
		99.930917% 97.87835%,
		99.930917% 75.233185%,
		99.930917% 52.588019%,
		99.930917% 29.942854%,
		99.930917% 7.2976888%,
		99.75287% 6.3432143%,
		99.283323% 5.6113835%,
		98.619164% 5.1426321%,
		97.857283% 4.9773959%,
		87.768866% 4.9773959%,
		77.680448% 4.9773959%,
		67.592031% 4.9773959%,
		57.503614% 4.9773959%,
		56.936197% 4.9640164%,
		56.17412% 4.8766449%,
		55.305914% 4.6444314%,
		54.420113% 4.1965263%,
		53.323874% 3.214925%,
		51.989005% 1.8085795%,
		50.75102% 0.54707587%
	);
`;
