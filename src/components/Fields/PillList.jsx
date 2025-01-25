import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const PillList = ({
  editEntry,
  requiredMark,
  entity,
  pillList,
  setPillList,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pillListRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      const isMultiselect =
        pillListRef.current.contains(e.target) ||
        e.target.closest(".multiselect__pill") ||
        e.target.closest(".multiselect__options--item");
      if (pillListRef.current && !isMultiselect) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const selectItem = (option) => {
    setPillList((prev) => {
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
    <div className='col-span-6 sm:col-span-3 relative' ref={pillListRef}>
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
            {pillList
              .filter((it) => it.isSelected)
              .map((option) => (
                <p key={option.value} className='multiselect__pill'>
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
            {pillList
              .filter((it) => !it.isSelected)
              .map((option) => (
                <button
                  key={option.value}
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

export default PillList;

PillList.propTypes = {
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
  pillList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      isSelected: PropTypes.bool,
    })
  ),
  setPillList: PropTypes.func,
};
