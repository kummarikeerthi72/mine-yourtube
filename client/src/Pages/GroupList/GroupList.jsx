import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallgroups } from "../../action/group";
import { Link } from "react-router-dom";
import Leftsidebar from "../../Component/Leftsidebar/Leftsidebar";

const GroupList = () => {
  const dispatch = useDispatch();

  // Get all groups
  const allGroups = useSelector((state) => state.groupreducer?.data) || [];

  // Get logged-in user ID
  const userId = useSelector((state) => state.authreducer?.data?._id);

  // Filter only the groups created by the current user
  const userGroups = allGroups.filter((group) => group?.createdBy === userId);

  useEffect(() => {
    dispatch(getallgroups());
  }, [dispatch]);

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <h2>My Groups</h2>
        {userGroups.length > 0 ? (
          userGroups.map((group) => (
            <Link
              to={`/group/${group?._id}`}
              key={group._id}
              style={{
                display: "block",
                padding: "10px",
                border: "1px solid gray",
                margin: "10px 0",
                textDecoration: "none",
                color: "black",
              }}
            >
              {group?.groupname}
            </Link>
          ))
        ) : (
          <p>No groups created yet.</p>
        )}
      </div>
    </div>
  );
};

export default GroupList;
