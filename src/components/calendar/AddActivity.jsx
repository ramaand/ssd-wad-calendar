import PropTypes from 'prop-types'

const AddActivity = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full p-2 border border-dashed border-gray-400 hidden group-hover:flex hover:bg-gray-100 active:bg-gray-200 items-center justify-center cursor-pointer rounded-lg text-neutral-500 select-none mt-2"
    >
      Add Activity
    </div>
  );
};

AddActivity.propTypes = {
  onClick: PropTypes.func,
};

export default AddActivity;
