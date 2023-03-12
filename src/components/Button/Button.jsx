import PropTypes from 'prop-types';
import {LoadMoreButton, ButtonWrapper } from './Button.styled';

const Button = ({onClick}) => {
  return (
      <ButtonWrapper>
            <LoadMoreButton type="button" onClick={onClick}>Load more</LoadMoreButton>  
      </ButtonWrapper>
    );
}

export default Button;

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}
