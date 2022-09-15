import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
type Props = {
  name: string,
  value: string,
  label?: string,
  required?: boolean,
  onChange?: (name: string, value: string) => void,
  count: number,
  categories: Array<{ label: string, value: string, default?: boolean }>
};

function getRandomDigits() {
  return Math.random().toString().slice(2);
}
export const SelectField: React.FC<Props> = ({
  name,
  value,
  label = name,
  required = true,
  onChange = () => { },
  categories,
  count,
}) => {
  const [id] = useState(() => `${name}-${getRandomDigits()}`);

  const [touched, setToched] = useState(false);

  const [selectCategory, setSelectCategory] = useState(categories[0].value);

  const hasError = touched && required && !value && count !== 0;

  useEffect(() => {
    onChange(name, selectCategory);
  }, [])

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <select
          id={id}
          className={classNames('input', {
            'is-danger': hasError,
          })}

          placeholder={`Enter ${label}`}
          value={selectCategory}
          onChange={event => {
            setSelectCategory(event.target.value);
            return onChange(name, event.target.value);
          }}
          onBlur={() => {
            setToched(true);
          }}
        >
          {categories && categories.map(item => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
      {hasError && (
        <p className="help is-danger">{`${label} is required`}</p>
      )}
    </div>
  );
};