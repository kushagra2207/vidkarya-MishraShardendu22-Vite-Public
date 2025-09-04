const updateFilter = (setfilter, filter, new_filterList, filter_name) => {
  // console.log(new_filterList);
  switch (filter_name) {
    case 'subject':
      setfilter({ ...filter, subject: new_filterList });
      break;

    case 'branch':
      setfilter({ ...filter, branch: new_filterList });
      break;

    default:
      break;
  }
};

export { updateFilter };
