import PropTypes from 'prop-types'

import { cn } from '~/lib/utils'

const Switch = ({
  id,
  label,
  disabled,
  register,
  placeholder,
  required,
  errors,
  onChange
}) => {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <span
        className={cn(
          'text-base',
          errors[id] ? 'text-rose-500' : 'text-zinc-800'
        )}
      >
        {label}
      </span>
      <label className="w-full relative switch">
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={placeholder}
          type="checkbox"
          onChange={onChange}
          className={cn(
            'w-full p-4 font-light bg-white border outline-none transition disabled:opacity-70 disabled:cursor-not-allowed rounded-lg',
            errors[id]
              ? 'border-rose-500 focus:border-rose-500'
              : 'border-neutral-300 focus:border-black'
          )}
        />
        
        <span className="slider round"></span>
      </label>
    </div>
  );
};

Switch.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  register: PropTypes.any,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.any,
  onChange: PropTypes.func
};

export default Switch;
