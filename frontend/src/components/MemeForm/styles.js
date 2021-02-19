
import styled from 'styled-components';

export const Error = styled.span`
  color: #ff4136;
`;

export const Element = styled.div`
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    font-weight: normal;
  }
`;

export const InputField = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.div`
    font-size: 18px;
    left-margin:20%; 
`;

export const Wrapper = styled.div`

  .submit-btn {
    background: #6a9deb;
    margin-right: 20px;
    border: 3px solid #6a9deb;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const Input = styled.input`
  width: 60%;
  box-sizing: border-box;
  border: 2px solid #005554;
  padding: 0.8rem 1rem;
  border-radius: 7px;
  margin-bottom: 0.5rem;
  transition: 0.3s;

  ${({ error }) =>
    error &&
    `
		border-color: #ff4136;
	`}

  &::placeholder {
    color: #a7a7a7;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  border-radius: 3px;
  padding: 0.7rem 2.5rem;
  border: none;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background: #6a9beb;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }

  ${({ secondary }) =>
    secondary &&
    `
		background: #6a9beb;
	`}
`;