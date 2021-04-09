import React, { useState } from 'react'

const MyNotesContext = React.createContext()

export const NotesConsumer = MyNotesContext.Consumer

export function NotesProvider (props) {
    const [notes, setNotes] = useState([])

    const addNotes = (note) => {
        setNotes([
            ...notes, note
        ])
    }

    const removeNotes = (id) => {
        let tempNotes = notes
        console.log(notes)
        console.log(notes.length)
        for(let i=0; i< tempNotes.length; i++){
            if(tempNotes[i].id === id){
                tempNotes.splice(i,1)
                break
            }
        }
        setNotes(tempNotes)
        console.log(notes)
    }

    return <MyNotesContext.Provider value={ {
        notes,
        setNotes,
        addNotes,
        removeNotes
    } }>
        { props.children }
    </MyNotesContext.Provider>
}

export default MyNotesContext