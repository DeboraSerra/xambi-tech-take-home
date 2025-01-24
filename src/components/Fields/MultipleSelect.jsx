import PropTypes from "prop-types";
import { useState } from "react";

const MultipleSelect = ({
  editEntry,
  requiredMark,
  entity,
  multipleSelectValues,
  setMultipleSelectValues,
}) => {
  const [isOpen, setIsOpen] = useState(false);
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
      <div>
        <div className='flex flex-wrap border border-gray-300 p-2' onClick={() => setIsOpen(!isOpen)}>
          {multipleSelectValues.filter((it) => it.isSelected).map((option, index) => (
            <p key={index} className='flex items-center'>
              {option.value}
              <span onClick={() => {
                setMultipleSelectValues((prev) => {
                  return prev.map((item) => {
                    if (item.value === option.value) {
                      return { ...item, isSelected: false };
                    }
                    return item;
                  });
                });
              }}>X</span>
            </p>
          ))}
        </div>
        {isOpen && (
          <div className='my-2'>
            {editEntry.options.map((option, index) => (
              <p
                key={index}
                className='flex items-center'
                onClick={() => {
                  setMultipleSelectValues((prev) => {
                    return prev.map((item) => {
                      if (item.value === option.value) {
                        return { ...item, isSelected: !item.isSelected };
                      }
                      return item;
                    });
                  });
                }}
              >
                {option.value}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultipleSelect;

MultipleSelect.propTypes = {
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        isSelected: PropTypes.bool,
      })
    ),
  }),
  entity: PropTypes.object,
  requiredMark: PropTypes.string,
};
