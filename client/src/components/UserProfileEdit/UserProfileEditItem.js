import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
	EditProfileInputGroup,
	EditProfileLabel,
	EditProfileInput,
	EditProfileInputIcon,
	EditProfileInputIconWrapper,
	EditProfileErrorText
} from './UserProfileEdit.styles';

const UserProfileEditItem = (props) => {
	const {
		labelText,
		id,
		type,
		changeHandler,
		blurHandler,
		isValid,
		isTouched,
		defaultValue,
		isRequired,
		errorText,
		value,
		placeholder
	} = props;
	console.log({ id: defaultValue });

	return (
		<>
			<EditProfileInputGroup
				valid={() => {
					if (isTouched && isValid) {
						return '#42ea42';
					} else if (!isValid && !isTouched && !isRequired) {
						return '#fff';
					} else if (isTouched && !isValid && isRequired) {
						return '#e10600';
					}
				}}
			>
				<EditProfileLabel htmlFor={id}>{labelText}</EditProfileLabel>
				<EditProfileInputIconWrapper>
					<EditProfileInput
						id={id}
						value={value}
						onChange={changeHandler}
						type={type || 'text'}
						onBlur={blurHandler}
					/>
					{isTouched /*&& isRequired*/ && (
						<EditProfileInputIcon
							aria-autocomplete="false"
							valid={isValid ? 1 : 0}
							icon={isValid ? faCheck : faXmark}
						/>
					)}
				</EditProfileInputIconWrapper>
			</EditProfileInputGroup>
			{isTouched && !isValid && <EditProfileErrorText>{errorText}</EditProfileErrorText>}
		</>
	);
};

export default UserProfileEditItem;

// DESIGN LINK https://dribbble.com/shots/16367037-User-Profile-Concept/attachments/9192915?mode=media
// IMAGE UPLOAD https://codepen.io/master/pen/pMgXqO
