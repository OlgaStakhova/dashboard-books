import classNames from 'classnames';
import React, { useState } from 'react';
type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (name: string, value: string) => void,
  count: number,
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}
export const TextField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = true,
  onChange = () => { },
  count,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);

  const hasError = touched && required && !value && count !== 0;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          id={id}
          className={classNames('input', {
            'is-danger': hasError,
          })}
          type="text"
          placeholder={`Enter ${label}`}
          value={value}
          onChange={event => {
            if (event.target.value.trim().length < 1) {
              return;
            }
            onChange(name, event.target.value)
          }}
          onBlur={() => {
            setToched(true);
          }}
        />
      </div>
      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};