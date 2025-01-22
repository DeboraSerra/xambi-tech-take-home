import PropTypes from "prop-types";

const toast = {};

const ProfilePhoto = ({
  editEntry,
  requiredMark,
  uploadPhotoMap,
  shadowFileInput,
  entity,
  index,
}) => {
  return (
    <div className='col-span-6 py-3'>
      <label
        htmlFor='photo'
        className='block text-sm font-medium text-gray-700'
      >
        {editEntry.attributeName + requiredMark}
        {editEntry.subName && (
          <span className='block text-xs text-gray-500'>
            {editEntry.subName}
          </span>
        )}
      </label>
      <div className='my-2 flex items-center'>
        <span className='h-12 w-12 overflow-hidden rounded-full bg-gray-300'>
          {uploadPhotoMap[editEntry.attribute] ? (
            <img
              className='object-cover aspect-square'
              src={uploadPhotoMap[editEntry.attribute]}
              alt=''
            />
          ) : entity && entity[editEntry.attribute] ? (
            <img
              className='object-cover aspect-square'
              src={entity[editEntry.attribute]}
              alt=''
            />
          ) : (
            <></>
          )}
        </span>
        <button
          type='button'
          onClick={() => shadowFileInput.current[index].click()}
          className='ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          Change
        </button>
        <input
          type='file'
          accept='.jpg,.png'
          onChange={(event) => {
            if (!event.target.files || !event.target.files[0]) return;
            if (event.target.files[0].size > 10090000) {
              toast.error("Please upload file under 10MB.");
              return;
            }
          }}
          ref={(el) => (shadowFileInput.current[index] = el)}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default ProfilePhoto;

ProfilePhoto.propTypes = {
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
  }),
  requiredMark: PropTypes.string,
  uploadPhotoMap: PropTypes.object,
  shadowFileInput: PropTypes.object,
  entity: PropTypes.object,
  index: PropTypes.number,
};
