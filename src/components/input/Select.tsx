import { ChangeEventHandler, FC, ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px 15px;
  font-size: 14px;
  height: 43px;
  letter-spacing: -0.4px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #e1e1e1;
  position: relative;
  color: #191919;
  font-weight: bold;
  b {
    color: #717171;
  }
  select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10rem;
    background-color: transparent;
    color: transparent;
    &:focus {
      outline: none;
    }
  }
`;

interface SelectProps {
  name: string;
  children: ReactNode;
  defaultValue: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

const Select: FC<SelectProps> = ({ children, name, defaultValue, onChange }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const [value, setValue] = useState<string>(defaultValue);

  return (
    <Container>
      {value === defaultValue ? <b>{value}</b> : value}
      <select
        id="data"
        name={name}
        ref={selectRef}
        onChange={(e) => {
          setValue(e.currentTarget.value);
          onChange(e);
        }}
        defaultValue={defaultValue}
      >
        <option disabled value={defaultValue}>
          {defaultValue}
        </option>
        {children}
      </select>
    </Container>
  );
};
export default Select;
