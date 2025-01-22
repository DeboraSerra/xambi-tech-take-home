import PropTypes from "prop-types";

const Address = ({ editEntry, entity }) => {
  return (
    <div className='col-span-6'>
      <div className='relative my-5'>
        <div className='absolute inset-0 flex items-center' aria-hidden='true'>
          <div className='w-full border-t border-gray-300' />
        </div>
      </div>
      <div className='col-span-6 py-2'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>
          {editEntry.attributeName}
        </h3>
      </div>
      <div className='mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6'>
        <div className='col-span-6'>
          <label
            htmlFor='first-name'
            className='block text-sm font-medium text-gray-700'
          >
            Street Address
          </label>
          <div className='my-2'>
            <input
              type='text'
              name={editEntry.attribute + "_street_address"}
              id={editEntry.attribute + "_street_address"}
              defaultValue={
                entity && entity[editEntry.attribute]
                  ? entity[editEntry.attribute]["street_address"]
                  : ""
              }
              autoComplete='street-address'
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            />
          </div>
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label
            htmlFor='last-name'
            className='block text-sm font-medium text-gray-700'
          >
            City/Town
          </label>
          <div className='my-2'>
            <input
              type='text'
              name={editEntry.attribute + "_city"}
              id={editEntry.attribute + "_city"}
              defaultValue={
                entity && entity[editEntry.attribute]
                  ? entity[editEntry.attribute]["city"]
                  : ""
              }
              autoComplete='city'
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            />
          </div>
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label
            htmlFor='last-name'
            className='block text-sm font-medium text-gray-700'
          >
            State
          </label>
          <div className='my-2'>
            <input
              type='text'
              name={editEntry.attribute + "_province"}
              id={editEntry.attribute + "_province"}
              defaultValue={
                entity && entity[editEntry.attribute]
                  ? entity[editEntry.attribute]["province"]
                  : ""
              }
              autoComplete='province'
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            />
          </div>
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label
            htmlFor='country'
            className='block text-sm font-medium text-gray-700'
          >
            Country*
          </label>
          <div className='my-2'>
            <select
              id={editEntry.attribute + "_country"}
              name={editEntry.attribute + "_country"}
              autoComplete='country-name'
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            >
              <option
                selected={
                  entity &&
                  entity[editEntry.attribute] &&
                  entity[editEntry.attribute]["country"] === "United States"
                }
              >
                United States
              </option>
              <option
                selected={
                  entity &&
                  entity[editEntry.attribute] &&
                  entity[editEntry.attribute]["country"] === "Canada"
                }
              >
                Canada
              </option>
            </select>
          </div>
        </div>
        <div className='col-span-6 sm:col-span-3'>
          <label
            htmlFor='last-name'
            className='block text-sm font-medium text-gray-700'
          >
            Postal Code
          </label>
          <div className='my-2'>
            <input
              type='text'
              name={editEntry.attribute + "_postal_code"}
              id={editEntry.attribute + "_postal_code"}
              defaultValue={
                entity && entity[editEntry.attribute]
                  ? entity[editEntry.attribute]["postal_code"]
                  : ""
              }
              autoComplete='postal-code'
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;

Address.propTypes = {
  editEntry: PropTypes.shape({
    attributeName: PropTypes.string,
    attribute: PropTypes.string,
  }),
  entity: PropTypes.object,
};
