import PropTypes from 'prop-types'

import { cn } from '~/lib/utils'

const Button = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  capitalize,
  icon: Icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-80 transition w-full px-4 rounded-lg',
        outline
          ? 'bg-white border-blue-500 text-blue-500'
          : 'bg-blue-500 border-blue-500 text-white',
        small
          ? 'py-1 text-sm font-light border-[1px]'
          : 'py-2 text-base font-semibold border-2',
        capitalize && 'uppercase',
        className
      )}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  capitalize: PropTypes.bool,
  icon: PropTypes.any,
  className: PropTypes.string,
};

export default Button;
