import PropTypes from 'prop-types'

import { cn } from '~/lib/utils'

const Input = ({
  id,
  label,
  type = 'text',
  disabled,
  register,
  placeholder,
  required,
  errors,
  min = 0,
  max = 0,
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        className={cn(
          'text-base',
          errors[id] ? 'text-rose-500' : 'text-zinc-800'
        )}
      >
        {label}
      </label>
      <div className="w-full relative">
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder={placeholder}
          type={type}
          min={min}
          max={max}
          className={cn(
            'w-full p-4 font-light bg-white border outline-none transition disabled:opacity-70 disabled:cursor-not-allowed rounded-lg',
            errors[id]
              ? 'border-rose-500 focus:border-rose-500'
              : 'border-neutral-300 focus:border-black'
          )}
        />
      </div>
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  register: PropTypes.any,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  errors: PropTypes.any,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default Input;
