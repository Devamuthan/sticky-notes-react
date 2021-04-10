import React, { useState } from 'react'

// Creating a context
const MyNotesContext = React.createContext()

// Exporting the consumer component
export const NotesConsumer = MyNotesContext.Consumer

// Exporting the Provider Component
export function NotesProvider (props) {
    // Creating a notes state with an empty array as initial state
    // Also creating a function to update the notes state
    const [notes, setNotes] = useState([])
    const [loaded, setLoaded] = useState(false)

    // returning the Provider component
    return <MyNotesContext.Provider value={ {
        notes,
        loaded,
        setNotes,
        setLoaded
    } }>
        { props.children }
    </MyNotesContext.Provider>
}

// Exporting the Context
export default MyNotesContext