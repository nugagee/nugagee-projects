import React from 'react';

const MiniSideBar = () =>{
    return(
        
    <div className="container">
    <div className="side-bar">
      <ul className="minisidebar-list">
        <li>
            <div className="profile-sidebar">Profile</div>
        </li>

        <li>
            <div className="profile-sidebar">Change Password</div>
        </li>

        <li>
            <div className="profile-sidebar">Change Wallet PIN</div>
        </li>

        <li>
            <div className="profile-sidebar">Reset Wallet Pin</div>
        </li>
      </ul>
      </div>
      </div>
    )
}

export default MiniSideBar;