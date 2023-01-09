import { faArrowRightToBracket, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	CartCheckoutButton,
	CartTotalContainer,
	CartTotalCurrency,
	CartTotalPrice,
	CartTotalPriceContainer,
	CheckoutIcon
} from './CartTotal.styles';

const CartTotal = ({ totalPrice, disabled }) => {
	return (
		<CartTotalContainer>
			<CartTotalPriceContainer>
				<CartTotalCurrency>€</CartTotalCurrency>
				<CartTotalPrice>{totalPrice || 0}</CartTotalPrice>
			</CartTotalPriceContainer>
			<CartCheckoutButton disabled={disabled}>
				Check Out
				<CheckoutIcon icon={faArrowRightToBracket} />
			</CartCheckoutButton>
		</CartTotalContainer>
	);
};

export default CartTotal;
