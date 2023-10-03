import PropTypes from 'prop-types'

const RenderIf = ({ children, isTrue }) => {
  return isTrue ? children : null;
};

RenderIf.propTypes = {
  children: PropTypes.node,
  isTrue: PropTypes.any,
};

export default RenderIf;
