const appMargin = 14;
const action = {
  EAT: {type: 'EAT', name: 'Ăn'},
  SLEEP: {type: 'SLEEP', name: 'Ngủ'},
  WAKE: {type: 'WAKE', name: 'Dậy'},
  POO: {type: 'POO', name: 'Ị'},
};

const actionStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  INPROGRESS: 'INPROGRESS',
};

const dateFormat = {
  date: 'dd/MM/yyyy',
  dateTime: 'dd/MM/yyyy HH:mm',
};

const colors = {
  backgroundColor: '#F3F3F3',
  darkBlue: '#2859b2',
};

export default {
  appMargin,
  action,
  colors,
  dateFormat,
  actionStatus,
};
