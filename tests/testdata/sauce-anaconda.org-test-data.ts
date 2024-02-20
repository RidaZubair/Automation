//===========================================Login data================================//
export const ValidLogin = {
  username: 'rida',
  password: 'rida123456',
};

export const InValidLogin = {
  username: 'abc',
  password: 'abc',
};

//===========================================Search data================================//
export const EmptySearch = {
  value: '',
  message: ' Search query is empty! ×',
};

export const ValidSearch = {
  value: 'abc',
};

export const InValidSearchBeforLogin = {
  value: 'dvdfvfdbvf',
  message: ' You must login to search private packages ×',
};

export const InValidSearchAfterLogin = {
  value: 'dvdfvfdbvf',
  message: ' There were no items found for this search ',
};
