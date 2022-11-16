
import React from 'react';


import CategoryPage from './CategoryPage';

function CategoryContainer({ dispatch, storeLayout }) {
  const props = {
    dispatch,
    storeLayout,
  };

  //Takes to Category Page in the same folder..
  return <CategoryPage {...props} />;
}

export default CategoryContainer;
