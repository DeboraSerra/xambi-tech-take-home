import PropTypes from "prop-types";

const TextList = ({ editEntry, requiredMark, entity, listFieldSize, index, setListFieldSize }) => {
  return (
    <div className='col-span-6'>
      <div className='relative py-5'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-300' />
        </div>
      </div>
      <div className='col-span-6 pb-2'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>
          {editEntry.attributeName + requiredMark}
        </h3>
      </div>
      {Array.from(Array(listFieldSize[index]).keys()).map((i) => {
        return (
          <div className='my-2'>
            <input
              id={editEntry.attribute + "_listfieldsingleidx_" + i}
              name={editEntry.attribute + "_listfieldsingleidx_" + i}
              type='text'
              defaultValue={
                entity &&
                entity[editEntry.attribute] &&
                entity[editEntry.attribute][i]
                  ? entity[editEntry.attribute][i]
                  : ""
              }
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            />
          </div>
        );
      })}
      <div className='flex'>
        <button
          type='button'
          className='rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={() => {
            const newListFieldSize = [...listFieldSize];
            newListFieldSize[index] = Math.min(10, newListFieldSize[index] + 1);
            setListFieldSize(newListFieldSize);
          }}
        >
          Add
        </button>
        <button
          type='button'
          className='ml-3 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          onClick={() => {
            const newListFieldSize = [...listFieldSize];
            newListFieldSize[index] = Math.max(1, newListFieldSize[index] - 1);
            setListFieldSize(newListFieldSize);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TextList;

TextList.propTypes = {
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
  }),
  entity: PropTypes.object,
  requiredMark: PropTypes.string,
  listFieldSize: PropTypes.array,
  index: PropTypes.number,
  setListFieldSize: PropTypes.func,
};
