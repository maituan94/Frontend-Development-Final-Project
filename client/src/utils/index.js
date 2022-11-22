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
    )} />

  export const renderRadio = (data, control, index) =>
    <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => (
      <div className='bg-white mb-6'>
        <label class="block mb-2 text-sm font-medium text-gray-900">Gender:</label>
        <div class="flex items-center mb-4 ml-10">
            <input id="default-radio-1" type="radio" value="male" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900">Male</label>
        </div>
        <div class="flex items-center mb-4 ml-10">
            <input id="default-radio-1" type="radio" value="female" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900">Female</label>
        </div>
        <div class="flex items-center mb-4 ml-10">
            <input id="default-radio-1" type="radio" value="other" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"/>
            <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900">Other</label>
        </div>
      </div>
    )} />

    export const renderDropdown = (data, control, index) =>
    <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => (
      <div className='bg-white mb-6'>
        <label for="provinces" class="block mb-2 text-sm font-medium text-gray-900">Select a province</label>
          <select id="provinces" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option selected>Choose a province</option>
            <option value="NL">Newfoundland and Labrador</option>
            <option value="PE">Prince Edward Island</option>
            <option value="NS">Nova Scotia</option>
            <option value="NB">New Brunswick</option>
            <option value="QC">Quebec</option>
            <option value="ON">Ontario</option>
            <option value="MB">Manitoba</option>
            <option value="SK">Saskatchewan</option>
            <option value="AB">Alberta</option>
            <option value="BC">British Columbia</option>
            <option value="YK">Yukon</option>
            <option value="NT">Northwest Territories</option>
            <option value="NU">Nunavut</option>
          </select>
      </div>
    )} />

    export const renderDatePicker = (data, control, index) =>
    <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => (
      <div className='bg-white mb-6'>

      </div>
    )} />