import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TextArea = ({ editEntry, entity, requiredMark, characterCounts, setCharacterCounts}) => {
  return (
    <div className='col-span-6'>
      <label
        htmlFor='company_description'
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
        <textarea
          id={editEntry.attribute}
          name={editEntry.attribute}
          rows={3}
          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          defaultValue={
            entity && entity[editEntry.attribute]
              ? entity[editEntry.attribute]
              : ""
          }
          onChange={(event) => {
            const characterCount = event.target.value.length;
            setCharacterCounts({
              ...characterCounts,
              [editEntry.attribute]: characterCount,
            });
          }}
        />
        {editEntry.characterCount && (
          <p
            className={classNames(
              "mt-3 text-sm",
              characterCounts[editEntry.attribute] &&
                characterCounts[editEntry.attribute] > editEntry.characterCount
                ? "text-red-500"
                : "text-gray-500"
            )}
          >
            Character Count:{" "}
            {characterCounts[editEntry.attribute]
              ? characterCounts[editEntry.attribute]
              : 0}
            /{editEntry.characterCount}
          </p>
        )}
      </div>
    </div>
  );
};

export default TextArea;

TextArea.propTypes = {
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
    characterCount: PropTypes.number,
  }),
  entity: PropTypes.object,
  requiredMark: PropTypes.string,
  characterCounts: PropTypes.object,
  setCharacterCounts: PropTypes.func,
}
