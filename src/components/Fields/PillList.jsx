import PropTypes from "prop-types";

const PillList = ({
  editEntry,
  requiredMark,
  pillList,
  setPillList,
}) => {
  const removeItem = (option) => {
    setPillList((prev) => {
      return prev.filter((item) => item.id !== option.id);
    });
  };

  const addItem = (option) => {
    setPillList((prev) => {
      return [...prev, option];
    });
  };

  const handleInputSubmit = (e) => {
    if (e.key === "Enter") {
      e.target.id === "pillList" && e.preventDefault();
      const value = document.querySelector("#pillList").value.trim();
      document.querySelector("#pillList").value = "";
      if (!value) return;
      addItem({
        value,
        id: new Date().getTime() * Math.random(),
      });
    }
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
      <label
        htmlFor='pillList'
        className='w-full my-2 flex border border-gray-300 p-[2px] min-h-8 font-medium text-gray-700 items-center rounded gap-[5px] flex-wrap'
      >
        {pillList.map((option) => (
          <p key={option.id} className='multiselect__pill'>
            {option.value}
            <button
              className='multiselect__button'
              onClick={(e) => {
                removeItem(option);
              }}
            >
              &#x2715;
            </button>
          </p>
        ))}
        <input
          name='pillList'
          id='pillList'
          type='text'
          className='h-full grow border-none outline-none'
          onKeyDown={handleInputSubmit}
        />
      </label>
    </div>
  );
};

export default PillList;

PillList.propTypes = {
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
  }),
  requiredMark: PropTypes.string,
  pillList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      isSelected: PropTypes.bool,
    })
  ),
  setPillList: PropTypes.func,
};
