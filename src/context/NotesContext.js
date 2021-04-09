import React, { useState } from 'react'

const MyNotesContext = React.createContext()

export const NotesConsumer = MyNotesContext.Consumer

export function NotesProvider (props) {
    const [notes, setNotes] = useState([])

    return <MyNotesContext.Provider value={ {
        notes,
        setNotes,
    } }>
        { props.children }
    </MyNotesContext.Provider>
}

export default MyNotesContext