import PropTypes from "prop-types";

const toast = {};

const Article = ({
  editEntry,
  entity,
  uploadPhotoMap,
  shadowFileInput,
  index,
}) => {
  return (
    <div className='col-span-6'>
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
      <label
        htmlFor={editEntry.attribute}
        className='block text-sm font-medium text-gray-700'
      >
        Subtitle
      </label>
      <div className='my-2'>
        <input
          id={editEntry.attribute + "_subtitle"}
          name={editEntry.attribute + "_subtitle"}
          type='text'
          defaultValue={
            entity && entity[editEntry.attribute]
              ? entity[editEntry.attribute]["subtitle"]
              : ""
          }
          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
      </div>
      <label
        htmlFor={editEntry.attribute}
        className='block text-sm font-medium text-gray-700'
      >
        Content
      </label>
      <div className='my-2'>
        <textarea
          id={editEntry.attribute + "_content"}
          name={editEntry.attribute + "_content"}
          rows={10}
          className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          defaultValue={
            entity &&
            entity[editEntry.attribute] &&
            entity[editEntry.attribute]["content"]
              ? typeof entity[editEntry.attribute]["content"] === "string"
                ? entity[editEntry.attribute]["content"]
                : entity[editEntry.attribute]["content"].join("\n")
              : ""
          }
        />
      </div>
      {editEntry.button && (
        <div className='grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
          <div className='col-span-6 sm:col-span-3'>
            <label
              htmlFor={editEntry.attribute}
              className='block text-sm font-medium text-gray-700'
            >
              Button Text
            </label>
            <div className='my-2'>
              <input
                id={editEntry.attribute + "_button_text"}
                name={editEntry.attribute + "_button_text"}
                type='text'
                placeholder='Etsy Shop'
                defaultValue={
                  entity && entity[editEntry.attribute]
                    ? entity[editEntry.attribute]["button_text"]
                    : editEntry.button
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
              Button URL
            </label>
            <div className='my-2'>
              <input
                id={editEntry.attribute + "_button_link"}
                name={editEntry.attribute + "_button_link"}
                type='text'
                placeholder='https://www.example.com'
                defaultValue={
                  entity && entity[editEntry.attribute]
                    ? entity[editEntry.attribute]["button_link"]
                    : ""
                }
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>
        </div>
      )}
      <label
        htmlFor='photo'
        className='block text-sm font-medium text-gray-700'
      >
        Attached Photo
      </label>
      <div className='my-2 flex items-center'>
        <span className='h-20 aspect-video overflow-hidden bg-gray-300'>
          {uploadPhotoMap[editEntry.attribute + "_image_url"] ? (
            <img
              src={uploadPhotoMap[editEntry.attribute + "_image_url"]}
              alt=''
              className='aspect-video object-contain'
            />
          ) : entity &&
            entity[editEntry.attribute] &&
            entity[editEntry.attribute]["image_url"] ? (
            <img
              src={entity[editEntry.attribute]["image_url"]}
              alt=''
              className='aspect-video object-contain'
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

export default Article;

Article.propTypes = {
  editEntry: PropTypes.shape({
    attributeName: PropTypes.string,
    subName: PropTypes.string,
    attribute: PropTypes.string,
    button: PropTypes.string,
  }),
  entity: PropTypes.object,
  uploadPhotoMap: PropTypes.object,
  shadowFileInput: PropTypes.object,
  index: PropTypes.number,
};
