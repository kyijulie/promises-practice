import React from "react";
import StaffMember from "./StaffMember.js";

const StaffList = ({ staff }) => {
  // return fetchBio(staff).then(result => {
  return (
    <div className="staff-list">
      {staff.map(member => {
        console.log(member.bio);
        return (
          <StaffMember
            name={member.name}
            bio={member.bio}
            image={member.image}
          />
        );
      })}
    </div>
  );
  // });
  //return <div className="staff-list">{membersPromise}</div>;
};
//console.log(membersPromise);

export default StaffList;
