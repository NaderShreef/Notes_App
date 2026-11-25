import { createContext, useReducer } from "react";

export const NoteContext = createContext();

export const noteReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return {
        notes: action.payload,
      };
    case "CREATE_NOTE":
      return {
        notes: [action.payload, ...state.notes],
      };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n._id === action.payload._id ? action.payload : n,
        ),
      };
    case "DELETE_NOTE":
      return {
        notes: state.notes.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};
export const NoteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, {
    notes: null,
    editingNote: null,
  });
  return (
    <NoteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NoteContext.Provider>
  );
};
