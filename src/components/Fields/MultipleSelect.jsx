import PropTypes from "prop-types";
import { useState } from "react";

const Multiselect = ({
  editEntry,
  requiredMark,
  entity,
  multiselectValues,
  setMultiselectValues,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectItem = (option) => {
    setMultiselectValues((prev) => {
      return prev.map((item) => {
        if (item.value === option.value) {
          return { ...item, isSelected: !item.isSelected };
        }
        return item;
      });
    });
  };

  const handleOpen = (e) => {
    if (e.target.closest(".multiselect__pill")) {
      return;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className='col-span-6 sm:col-span-3 relative'>
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
      <div className='w-full my-2'>
        <button
          className='flex border w-full border-gray-300 p-[2px] min-h-8 font-medium text-gray-700 items-center rounded'
          onClick={handleOpen}
        >
          <div className='flex flex-wrap grow gap-[5px]'>
            {multiselectValues.filter((it) => it.isSelected).map((option) => (
              <p key={option.id} className='multiselect__pill'>
                {option.value}
                <button
                  className='multiselect__button'
                  onClick={() => selectItem(option)}
                >
                  &#x2715;
                </button>
              </p>
            ))}
          </div>
          <span
            className={`multiselect__button transition-all ${
              !isOpen ? "rotate-180" : ""
            }`}
          >
            &#8963;{" "}
          </span>
        </button>
        {isOpen && (
          <div className='multiselect__options'>
            {multiselectValues.filter((it) => !it.isSelected).map((option) => (
              <button
                key={option.id}
                className='multiselect__options--item'
                onClick={() => selectItem(option)}
              >
                {option.value}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Multiselect;

Multiselect.propTypes = {
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
  multiselectValues: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      isSelected: PropTypes.bool,
      id: PropTypes.number,
    })
  ),
  setMultiselectValues: PropTypes.func,
};
