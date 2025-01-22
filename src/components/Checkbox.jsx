import PropTypes from "prop-types";

const Checkbox = ({ editEntry, setCheckboxFieldValue }) => {
  return (
    <div className='col-span-6 relative flex items-start'>
      <div className='flex h-5 items-center'>
        <input
          type='checkbox'
          id={editEntry.attribute}
          name={editEntry.attribute}
          className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
          onChange={(e) => {
            setCheckboxFieldValue(e.target.checked);
          }}
        />
      </div>
      <div className='ml-2 text-sm'>
        <label for={editEntry.attribute} className='font-medium text-gray-700'>
          {editEntry.attributeName}
        </label>
        <p className='text-gray-500'>{editEntry.subName}</p>
      </div>
    </div>
  );
};

export default Checkbox;

Checkbox.propTypes = {
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
  }),
  setCheckboxFieldValue: PropTypes.func,
};
