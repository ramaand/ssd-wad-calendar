import PropTypes from 'prop-types'

const Container = ({ children }) => {
  return (
    <div className="flex flex-col border rounded-lg w-full min-h-[50vh] overflow-hidden">
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
