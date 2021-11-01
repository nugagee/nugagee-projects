import React from 'react'
import "./note.css"

const PleaseNote = () => {
    return (
        <div>
              <section className="note">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h1 className="mb-2">Please note the following</h1>
              <p>Unclaimed properties are generally kept for 30 days before it is disposed off (except perishables which are discarded by next day to prevent contamination). 
                If the perishable item becomes a health risk before before the end of the day, we reserve the right to dispose of it immediately.
                </p><br/>
                <p>Kindly reach us via phone on 08139851110 or email contact@gigm.com for more details. Please note that this may be subject to change, in accordance with modifications in our policies. For re claim of lost or forgotten property, 
                   you will be required to satisfy us that the item belongs to you</p>
            </div>
          </div>
        </div>
      </section>
        </div>
    )
}

export default PleaseNote
