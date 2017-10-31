const panels = (state = [], action) => {
    switch (action.type) {
      case 'UPDATE':
            state[ action.key ] = action.value;
        return state;
      default:
        return state
    }
  }
  
  export default panels