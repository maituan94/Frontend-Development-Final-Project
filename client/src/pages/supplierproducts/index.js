import React from "react";

const ProductTable = () => {
  return (
    <div class="overflow-x-auto mx-auto max-w-7xl px-4 sm:px-6 relative shadow-md sm:rounded-lg">
      <table class="min-w-full text-left">
        <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white relative">
          My products
          <p class="mt-1 text-sm font-normal text-gray-500">
            Manage your products here.
          </p>
          <div class="text-right">
          <button
            type="button"
            class="text-white bg-lime-600 hover:bg-lime-800 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
          >
            <svg
              class="mr-2 -ml-1 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add product
          </button>
          </div>
        </caption>
        <thead class="text-xs border-b bg-gray-300">
          <tr>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
              Product name
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
              Color
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
              Category
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
              Price
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b">
            <th
              scope="row"
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              Apple MacBook Pro 17"
            </th>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Sliver
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Laptop
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              $2999
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </div>
            </td>
          </tr>
          <tr class="bg-white border-b">
            <th
              scope="row"
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              Microsoft Surface Pro
            </th>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              White
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Laptop PC
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              $1999
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </div>
            </td>
          </tr>
          <tr class="bg-white border-b0">
            <th
              scope="row"
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
            >
              Magic Mouse 2
            </th>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Black
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              Accessories
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              $99
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  ></path>
                </svg>
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
