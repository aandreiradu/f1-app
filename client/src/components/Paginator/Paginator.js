import {
	PaginatorMain,
	PaginatorControlButton,
	PaginatorControlsContainer
} from './Paginator.styles';

const Paginator = ({ onPrevious, onNext, children, currentPage, lastPage }) => {
	console.log('paginator props', { currentPage, lastPage });
	return (
		<PaginatorMain>
			{children}
			<PaginatorControlsContainer>
				{currentPage > 1 && (
					<PaginatorControlButton onClick={onPrevious}>Previous</PaginatorControlButton>
				)}
				{currentPage < lastPage && (
					<PaginatorControlButton onClick={onNext}>Next</PaginatorControlButton>
				)}
			</PaginatorControlsContainer>
		</PaginatorMain>
	);
};

export default Paginator;
