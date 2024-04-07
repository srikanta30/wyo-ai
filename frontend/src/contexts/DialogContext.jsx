import { createContext, useState } from 'react';

const DialogContext = createContext({
  setDialogBody: () => null,
});

export function DialogContextProvider({ children }) {
  const [dialogBody, setDialogBody] = useState(null);

  return (
    <DialogContext.Provider value={{ setDialogBody }}>
      {children}
      {dialogBody && (
        <div
          onClick={() => {
            setDialogBody(null);
          }}
          className="dialog-backdrop"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: 'fit-content', height: 'fit-content' }}
          >
            {dialogBody}
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

export default DialogContext;
