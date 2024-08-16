import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);
    const boundActions = {};
    for (let funcName in actions) { boundActions[funcName] = actions[funcName](dispatch)}
         // Each function in actions is bound to dispatch so it can be used to update the state
    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

