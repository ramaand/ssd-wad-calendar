import PropTypes from 'prop-types'
import ReactSelect from 'react-select'

const SelectPeriod = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-[12rem] mt-8">
      <ReactSelect
        placeholder="Period"
        isClearable
        options={[
          {
            value: 'am',
            label: 'AM',
          },
          {
            value: 'pm',
            label: 'PM',
          },
        ]}
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

SelectPeriod.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SelectPeriod;
