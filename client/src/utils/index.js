import { Controller } from 'react-hook-form'

export const renderSimpleInput = (data, control, errors, index) => <Controller
  key={`${data.name}-${index}`}
  name={data.name}
  control={control}
  rules={data.rules}
  render={({ field }) => {

    let className = 'mb-1 w-full p-3 border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm'

    return <div className='bg-white mb-6'>
      <input
        type={data.type}
        {...field}
        className={className}
        placeholder={data.placeholder}
      />
      <small className='text-red-500 d-flex flex-column'>{errors[data.name]?.message || ''}</small>
    </div>
  }}
/>

export const renderToggle = (data, control, index) =>
  <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => (
      <div className='bg-white mb-6'>
        <label className='inline-flex relative items-center cursor-pointer'>
          <input
            type='checkbox' {...field}
            checked={field.value}
            className='sr-only peer'
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-600"></div>
          <span className='ml-3 text-sm font-medium text-gray-700'>{data.label[field.value.toString()]}</span>
        </label>
      </div>
    )}
  />


export const renderRadio = ({ data, control, errors, index, register }) =>
  <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => {
      return (
        <div className='bg-white mb-6'>
          <label className="block mb-2 text-sm font-medium text-gray-900">Gender:</label>
          <div className="flex items-center mb-4 ml-10">
            <input id="default-radio-1" type="radio" name={field.name} {...register(field.name)} value="male" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
            <label for="default-radio-1" className="ml-2 text-sm font-medium text-gray-900">Male</label>
          </div>
          <div className="flex items-center mb-4 ml-10">
            <input id="default-radio-1" type="radio" name={field.name} {...register(field.name)} value="female" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
            <label for="default-radio-1" className="ml-2 text-sm font-medium text-gray-900">Female</label>
          </div>
          <div className="flex items-center mb-4 ml-10">
            <input id="default-radio-1" type="radio" name={field.name} {...register(field.name)} value="other" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
            <label for="default-radio-1" className="ml-2 text-sm font-medium text-gray-900">Other</label>
          </div>
          <small className='text-red-500 d-flex flex-column'>{errors[data.name]?.message || ''}</small>
        </div>
      )
    }}
  />

export const renderDropdown = ({
  id,
  name,
  label,
  options,
  rules,
  control,
  index,
  register }) => {
  return (
    <Controller
      key={`${name}-${index}`}
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className='bg-white mb-6'>
          <label for={id} className="block mb-2 text-sm font-medium text-gray-900">
            {label}:
          </label>
          <select
            id={id}
            {...register(name)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {
              options.map((option, idx) =>
                <option
                  value={option.value}
                >
                  {option.name}
                </option>
              )
            }
          </select>
        </div>
      )} />
  )
}

export const renderDatePicker = (data, control, index) =>
  <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => (
      <div className='bg-white mb-6'>

      </div>
    )}
  />

export const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'CAD'
  }).format(value);

export const getNoProducts = (array) => array.reduce((acc, curr) => {
  return acc + curr.quantity
}, 0)

export const getDateFormat = ({ date, toShow = false }) => {
  const newDate = date ? new Date(date) : new Date();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate() + 1;
  const year = newDate.getFullYear();

  if (toShow) {
    return `${year}-${month}-${day}`;
  }

  return `${month}-${day}-${year}`;
} 
