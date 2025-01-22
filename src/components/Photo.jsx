import PropTypes from "prop-types";

const toast = {};

const Photo = ({
  editEntry,
  requiredMark,
  uploadPhotoMap,
  entity,
  shadowFileInput,
  index,
}) => {
  return (
    <div className='col-span-6 py-3'>
      <label
        htmlFor='cover-photo'
        className='block text-sm font-medium text-gray-700'
      >
        {editEntry.attributeName + requiredMark}
        {editEntry.subName && (
          <span className='block text-xs text-gray-500'>
            {editEntry.subName}
          </span>
        )}
      </label>
      {!uploadPhotoMap[editEntry.attribute] &&
      (!entity || !entity[editEntry.attribute]) ? (
        <div className='my-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6'>
          <div className='space-y-1 text-center'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 48 48'
              aria-hidden='true'
            >
              <path
                d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <div className='flex text-sm text-gray-600'>
              <label
                htmlFor={editEntry.attribute}
                className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
              >
                <span>Select a file</span>
                <input
                  id={editEntry.attribute}
                  name={editEntry.attribute}
                  type='file'
                  className='sr-only'
                  accept={".jpg,.png"}
                  onClick={(event) => {
                    console.log();
                    event.target.value = null;
                  }}
                  onChange={(event) => {
                    if (!event.target.files || !event.target.files[0]) return;
                    if (event.target.files[0].size > 10090000) {
                      toast.error("Please upload file under 10MB.");
                      return;
                    }
                  }}
                  ref={(el) => (shadowFileInput.current[index] = el)}
                />
              </label>
              <p className='pl-1'> to upload</p>
            </div>
            <p className='text-xs text-gray-500'>
              {".jpg, .png" + " up to 10MB"}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className='my-2 flex rounded-md overflow-hidden max-w-xl'>
            <span className='overflow-hidden bg-gray-300'>
              {uploadPhotoMap[editEntry.attribute] ? (
                <img
                  className='object-cover aspect-video'
                  src={uploadPhotoMap[editEntry.attribute]}
                  alt=''
                />
              ) : (
                <img
                  className='object-cover aspect-video'
                  src={entity[editEntry.attribute]}
                  alt=''
                />
              )}
            </span>
          </div>
          <div className='py-2'>
            <button
              type='button'
              onClick={() => shadowFileInput.current[index].click()}
              className='rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
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
        </>
      )}
    </div>
  );
};

export default Photo;

Photo.propTypes = {
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
  }),
  requiredMark: PropTypes.string,
  uploadPhotoMap: PropTypes.object,
  entity: PropTypes.object,
  shadowFileInput: PropTypes.object,
  index: PropTypes.number,
};
