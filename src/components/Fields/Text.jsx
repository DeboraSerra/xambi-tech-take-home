import PropTypes from "prop-types";

const Text = ({ editEntry, entity, requiredMark }) => {
  return (
    <div className='col-span-6 sm:col-span-3'>
      <label
        htmlFor={editEntry.attribute}
        className='block text-sm font-medium text-gray-700'
      >
        {editEntry.attributeName + requiredMark}
        {editEntry.subName && (
          <span className='block text-xs text-gray-500'>
            {editEntry.subName}
          </span>
        )}
      </label>
      <div className='my-2'>
        <input
          id={editEntry.attribute}
          name={editEntry.attribute}
          type='text'
          autoComplete={editEntry.attribute}
          defaultValue={
            entity && entity[editEntry.attribute]
              ? entity[editEntry.attribute]
              : ""
          }
          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </div>
      {editEntry.info && (
        <p className='text-sm text-gray-500'>{editEntry.info}</p>
      )}
    </div>
  );
};

export default Text;

Text.propTypes = {
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
    info: PropTypes.string,
  }),
  requiredMark: PropTypes.string,
  entity: PropTypes.object,
};
