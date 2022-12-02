import { Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export const renderSimpleInput = (data, control, errors, index) => (
  <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => {
      let className =
        "mb-1 w-full p-3 border-gray-300 shadow-sm focus:border-slate-500 focus:ring-slate-500 sm:text-sm";

      return (
        <div className="bg-white mb-6">
          <input
            type={data.type}
            {...field}
            className={className}
            placeholder={data.placeholder}
          />
          <small className="text-red-500 d-flex flex-column">
            {errors[data.name]?.message || ""}
          </small>
        </div>
      );
    }}
  />
);

export const renderToggle = (data, control, index) => (
  <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => (
      <div className="bg-white mb-6">
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            {...field}
            checked={field.value}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-slate-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            {data.label[field.value.toString()]}
          </span>
        </label>
      </div>
    )}
  />
);

export const renderRadio = ({ data, control, errors, index, register }) => (
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
          <small className="text-red-500 d-flex flex-column">
            {errors[data.name]?.message || ""}
          </small>
        </div>
      );
    }}
  />
);

export const renderDropdown = ({
  id,
  name,
  label,
  options,
  rules,
  control,
  index,
  register,
}) => {
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
            required
          >
            {options.map((option, idx) => (
              <option value={option.value}>{option.name}</option>
            ))}
          </select>
        </div>
      )}
    />
  );
};

export const renderDatePicker = (data, control, index) => (
  <Controller
    key={`${data.name}-${index}`}
    name={data.name}
    control={control}
    rules={data.rules}
    render={({ field }) => <div className="bg-white mb-6"></div>}
  />
);

// options here are products
export const RenderDynamicDropdown = ({
  id,
  name,
  label,
  options,
  rules,
  control,
  errors,
  index,
  register,
  onChangeProducts,
}) => {
  const [itemList, setItemList] = useState([]);
  const [productIdx, setProductIdx] = useState(0);

  useEffect(() => {
    if (options && options.length) {
      setItemList([
        ...itemList,
        {
          productId: options[productIdx].value,
          quantity: 0
        }
      ])
    }
  }, [options])

  useEffect(() => {
    onChangeProducts(itemList)
  }, [itemList])

  if (!options.length) return null

  const handleItemAdd = () => {
    setProductIdx(productIdx + 1)
    setItemList([...itemList, {
      productId: options[productIdx].value,
      quantity: 0
    }])

  }

  const handleItemRemove = (item) => {
    const myList = [...itemList]
    myList.splice(index, 1)
    setProductIdx(productIdx - 1)
    setItemList(myList)
  }

  const handleQuantityOnChange = (event) => {
    const { target } = event
    let newArr = [...itemList]
    newArr[productIdx].quantity = Number(target.value);
    setItemList(newArr)
  }

  return (
    <Controller
      key={`${name}-${index}`}
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="bg-white mb-6">
          {itemList.map((item, index) => (
            <>
              <div className="flex items-center gap-4 ">
                <div className="flex-1 w-64">
                  {renderDropdown({
                    id: `${id}-${index}`,
                    name: `${name}-${index}`,
                    label,
                    options,
                    rules,
                    control,
                    errors,
                    index,
                    register
                  })}
                </div>

                <div className='bg-white mb-6'>
                  <label for={id} className="block mb-2 text-sm font-medium text-gray-900">
                    Quantity:
                  </label>
                  <input
                    id="quantity"
                    className="w-20 rounded-lg"
                    type="number"
                    name="quantity"
                    placeholder="0"
                    onChange={handleQuantityOnChange}
                    min="1"
                    required
                  />
                </div>

                {/* <input type="number" class="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value="0"></input> */}

                {itemList.length > 1 && (
                  <FontAwesomeIcon
                    id="removeListItem"
                    size='lg'
                    color='red'
                    className='rounded-full p-1 w-5 h-5 border-2 border-solid border-red-500 cursor-pointer'
                    icon={Icons['faRemove']}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleItemRemove(index)}
                  />
                )}
              </div>

              {/* Button to add item */}
              {itemList.length - 1 === index && (
                <button
                  type="submit"
                  id="addListItem"
                  onClick={handleItemAdd}
                  class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Add item
                </button>
              )}
            </>
          ))}
        </div>
      )}
    />
  );
};

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
