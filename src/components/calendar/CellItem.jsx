import PropTypes from 'prop-types'
import { BiSolidPencil, BiSolidTrashAlt } from 'react-icons/bi'

const CellItem = ({ activity, onDelete, onUpdate }) => {
  return (
    <li
      className="relative group rounded-md p-2"
      style={{
        backgroundColor: `#${Math.floor(Math.random() * 128)
          .toString(16)
          .padStart(2, '0')}${Math.floor(Math.random() * 128)
          .toString(16)
          .padStart(2, '0')}${Math.floor(Math.random() * 128)
          .toString(16)
          .padStart(2, '0')}`,
      }}
    >
      <div>{activity?.name}</div>
      <div>{activity?.email}</div>
      <div>
        {activity?.time} {activity?.period}
      </div>
      <div className="hidden group-hover:flex flex-row gap-2 absolute top-2 right-2 bg-gray-400 bg-transparent p-2 rounded-md">
        <BiSolidTrashAlt
          className="hover:fill-rose-500 cursor-pointer"
          onClick={onDelete}
        />
        <BiSolidPencil
          className="hover:fill-yellow-500 cursor-pointer"
          onClick={onUpdate}
        />
      </div>
    </li>
  );
};

CellItem.propTypes = {
  activity: PropTypes.object,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default CellItem;
