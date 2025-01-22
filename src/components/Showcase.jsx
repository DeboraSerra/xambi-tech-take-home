import PropTypes from "prop-types";

const toast = {};

const Showcase = ({
  entity,
  editEntry,
  uploadPhotoMap,
  shadowFileInput,
  index,
}) => {
  const isInstagramShowcase = editEntry.extraParam.isInstagramShowcase;

  // Add attribute to entity if it doesn't exist
  if (entity) {
    entity[editEntry.attribute] = entity[editEntry.attribute] || {};
    entity[editEntry.attribute]["image_urls"] =
      entity[editEntry.attribute]["image_urls"] || [];
  }

  return (
    <div className='col-span-6' key={editEntry.attribute}>
      <div className='relative py-5'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-300' />
        </div>
      </div>
      <div className='col-span-6 pb-2'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>
          {editEntry.attributeName}
        </h3>
        {editEntry.subName && (
          <p className='text-xs text-gray-500'>{editEntry.subName}</p>
        )}
      </div>

      <label
        htmlFor={editEntry.attribute}
        className='block text-sm font-medium text-gray-700'
      >
        Title
        {editEntry.subTitle && (
          <span className='block text-xs text-gray-500'>
            {editEntry.subTitle}
          </span>
        )}
      </label>
      <div className='my-2'>
        <input
          id={editEntry.attribute + "_title"}
          name={editEntry.attribute + "_title"}
          type='text'
          defaultValue={
            entity && entity[editEntry.attribute]
              ? entity[editEntry.attribute]["title"]
              : ""
          }
          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </div>

      {isInstagramShowcase && (
        <>
          <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor={editEntry.attribute}
                className='block text-sm font-medium text-gray-700'
              >
                Handle
              </label>
              <div className='my-2'>
                <input
                  id={editEntry.attribute + "_handle"}
                  name={editEntry.attribute + "_handle"}
                  type='text'
                  placeholder='@'
                  defaultValue={
                    entity && entity[editEntry.attribute]
                      ? entity[editEntry.attribute]["handle"]
                      : ""
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>

            <div className='col-span-6 sm:col-span-3'>
              <label
                htmlFor={editEntry.attribute}
                className='block text-sm font-medium text-gray-700'
              >
                Profile URL
              </label>
              <div className='my-2'>
                <input
                  id={editEntry.attribute + "_url"}
                  name={editEntry.attribute + "_url"}
                  type='text'
                  placeholder='https://www.instagram.com/username/'
                  defaultValue={
                    entity && entity[editEntry.attribute]
                      ? entity[editEntry.attribute]["url"]
                      : ""
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                />
              </div>
            </div>
          </div>

          <div className='col-span-6 py-3'>
            <label
              htmlFor='photo'
              className='block text-sm font-medium text-gray-700'
            >
              Instagram Profile Photo
            </label>
            <div className='my-2 flex items-center'>
              <span className='h-12 w-12 overflow-hidden rounded-full bg-gray-300'>
                {uploadPhotoMap[editEntry.attribute + "_profile_photo_url"] ? (
                  <img
                    className='object-cover aspect-square'
                    src={
                      uploadPhotoMap[editEntry.attribute + "_profile_photo_url"]
                    }
                    alt=''
                  />
                ) : entity &&
                  entity[editEntry.attribute] &&
                  entity[editEntry.attribute]["profile_photo_url"] ? (
                  <img
                    className='object-cover aspect-square'
                    src={entity[editEntry.attribute]["profile_photo_url"]}
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
        </>
      )}
    </div>
  );
};

export default Showcase;

Showcase.propTypes = {
  entity: PropTypes.object,
  editEntry: PropTypes.shape({
    attribute: PropTypes.string,
    attributeName: PropTypes.string,
    subName: PropTypes.string,
    subTitle: PropTypes.string,
    extraParam: PropTypes.shape({
      isInstagramShowcase: PropTypes.bool,
    }),
  }),
  uploadPhotoMap: PropTypes.object,
  shadowFileInput: PropTypes.object,
  index: PropTypes.number,
};
