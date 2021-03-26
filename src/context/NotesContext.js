import React, { useState } from 'react'

const MyNotesContext = React.createContext()

export const NotesConsumer = MyNotesContext.Consumer

export function NotesProvider (props) {
    const [notes, setNotes] = useState([])

    const updateNotes = (note) => {
        setNotes({
            ...notes , note
        })
    }

    return <MyNotesContext.Provider value={ {
        notes,
        setNotes,
        updateNotes
    } }>
        { props.children }
    </MyNotesContext.Provider>
}

export default MyNotesContext