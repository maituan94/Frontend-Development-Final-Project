import React from 'react';
import Purchases from './Purchases';
import Sales from './Sales';

const ListItem = ({
  id,
  ariaSelected,
  active,
  label,
}) => {
  return (
    <li className="nav-item" role="presentation">
      <a href={`#${id}`} className={`
        nav-link
        block
        font-medium
        text-xs
        leading-tight
        uppercase
        border-x-0 border-t-0 border-b-2 border-transparent
        px-6
        py-3
        my-2
        hover:border-transparent hover:bg-gray-100
        focus:border-transparent
        ${active ? 'active' : ''}
      `}
        id={`${id}-tab`}
        data-bs-toggle="pill"
        data-bs-target={`#${id}`}
        role="tab"
        aria-controls={`${id}`}
        aria-selected={ariaSelected}>{label}</a>
    </li>
  )

}

const Invoices = () => {
  return (
    <div>
      <ul
        id="tabs-tab"
        className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
        role="tablist"
      >
        <ListItem
          id='tabs-home'
          ariaSelected={true}
          active={true}
          label='Sales'
        />
        <ListItem
          id='tabs-profile'
          ariaSelected={false}
          label='Purchases'
        />
      </ul>
      <div className="tab-content" id="tabs-tabContent">
        <div
          className="tab-pane fade show active"
          id="tabs-home"
          role="tabpanel"
          aria-labelledby="tabs-home-tab"
        >
          <Sales />
        </div>
        <div
          className="tab-pane fade"
          id="tabs-profile"
          role="tabpanel"
          aria-labelledby="tabs-profile-tab"
        >
          <Purchases />
        </div>
      </div>
    </div>
  );
}

export default Invoices;
