import PropTypes from "prop-types";

const Radio = ({ editEntry, radioFieldValue, setRadioFieldValue, requiredMark, index }) => {
  return (
    <div className='col-span-6'>
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
      <fieldset className='mt-4'>
        <div className='space-y-4'>
          {editEntry.options.map((option) => (
            <div className='flex items-center'>
              <input
                name={editEntry.attribute}
                type='radio'
                checked={String(radioFieldValue[index]) === option}
                className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500'
                value={option}
                onChange={(e) => {
                  const currRadioFieldValue = [...radioFieldValue];
                  currRadioFieldValue[index] = e.currentTarget.value;
                  setRadioFieldValue(currRadioFieldValue);
                }}
              />
              <label className='ml-3 block text-sm font-medium text-gray-700'>
                {option}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default Radio;

Radio.propTypes = {
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
    options: PropTypes.array,
  }),
  radioFieldValue: PropTypes.arrayOf(PropTypes.string),
  setRadioFieldValue: PropTypes.func,
  requiredMark: PropTypes.string,
  index: PropTypes.number,
};
