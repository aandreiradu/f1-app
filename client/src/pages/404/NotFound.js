import React from 'react';
import {
	ContainerNotFound,
	NotFoundSubtitle,
	NotFoundTitle,
	NotFoundAlternativesList,
	NotFoundAlternativesListItem,
	BackToHome,
	AnimatedGif
} from './NotFound.styles';
import Footer from '../../components/Footer/Footer';
import animated404 from '../../assets/404 animated.gif';

const NotFound = () => {
	return (
		<>
			<ContainerNotFound>
				<NotFoundTitle>We couldn't find the page you were looking for</NotFoundTitle>

				<NotFoundSubtitle>
					You may have mistyped the URL or the page may have moved or the results are not generated
					yet:
				</NotFoundSubtitle>
				<NotFoundAlternativesList>
					<NotFoundAlternativesListItem>
						Why not try navigating back to the <BackToHome to="/">homepage</BackToHome> to find what
						you are looking for
					</NotFoundAlternativesListItem>
					<NotFoundAlternativesListItem>
						Contact us via email{' '}
						<BackToHome as="a" href="mailto:raduandrei697@gmail.com">
							here
						</BackToHome>
					</NotFoundAlternativesListItem>
				</NotFoundAlternativesList>

				<AnimatedGif src={animated404} alt="animated GIF" />
			</ContainerNotFound>
			<Footer />
		</>
	);
};

export default NotFound;
