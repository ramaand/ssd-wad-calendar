import PropTypes from 'prop-types'
import ReactSelect from 'react-select'

const Select = ({
  value,
  onChange,
  options,
  placeholder,
  isClearable = false,
}) => {
  return (
    <div className="w-full max-w-[12rem]">
      <ReactSelect
        placeholder={placeholder || 'Type to search'}
        isClearable={isClearable}
        options={options}
        value={value}
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.label}</div>
          </div>
        )}
        classNames={{
          control: () => 'p-2 border-2',
          input: () => 'text-base',
          option: () => 'text-base',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

Select.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  isClearable: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
};

export default Select;
