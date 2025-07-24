import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallgroups } from "../../action/group";

const Groups = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups);

  useEffect(() => {
    dispatch(getallgroups());
  }, [dispatch]);

  return (
    <div>
      <h2>All Groups</h2>
      {groups.map((group) => (
        <div key={group._id}>
          <h4>{group.name}</h4>
          <p>{group.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Groups;
