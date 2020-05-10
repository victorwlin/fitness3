import React from "react";

import Input from "./Input";
import Render from "./Render";
import { firestore } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";

class Tracking extends React.Component {
    // Put context into context variable
    static contextType = UserContext;
    
    // The purpose of this file is to store a collection of entries
    // for the Render file to render
    state = { entries: {} };
    
    // Pull from Firestore and jam into state
    componentDidUpdate() {
        firestore.collection(this.context.email).get().then((querySnapshot) => {
            this.setState({ entries: querySnapshot });
        });
    }

    // onEntrySubmit = entry => {
    //     // Check to see if this date already has a weight entry
    //     let doesDateHaveEntry = 0;
    //     for (let i = 0; i < this.state.entries.length; i++) {
    //         if (entry.date === this.state.entries[i].date) {
    //             doesDateHaveEntry++;
    //         }
    //     }

    //     // If it does, replace the weight for just that date, otherwise
    //     // Take the entire entry including the date, and add to state
    //     if (doesDateHaveEntry) {
    //         this.setState(prevState => {
    //             return {
    //                 entries: prevState.entries.map(
    //                     el => el.date === entry.date ? { ...el, weight: entry.weight } : el
    //             )}
    //         })
    //     } else {
    //         // this.setState(prevState => {
    //         //     return {
    //         //         entries: [...prevState.entries, entry]
    //         //     };
    //         // });
    //     }
    // };

    render() {
        return (
            <div className="ui container" style={{ marginTop: "10px" }}>
                <Input onSubmit={this.onEntrySubmit} />
                <Render entries={this.state.entries} />
            </div>
        );
    }
}

export default Tracking;