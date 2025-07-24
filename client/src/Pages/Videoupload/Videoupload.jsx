import React, { useState } from 'react';
import './Videoupload.css';
import { useDispatch } from 'react-redux';
import { uploadvideoAction } from '../../action/video'; // ✅ Correct import

const Videoupload = () => {
  const dispatch = useDispatch();
  const [filedata, setfiledata] = useState(null);
  const [fileoption, setfileoption] = useState({
    title: '',
    description: '',
    category: '',
  });

  const handleChange = (e) => {
    setfileoption({ ...fileoption, [e.target.name]: e.target.value });
  };

  const handlefileChange = (e) => {
    setfiledata(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!filedata) {
      alert('Please select a file to upload.');
      return;
    }
    dispatch(uploadvideoAction({ filedata, fileoption })); // ✅ FIXED dispatch call
  };

  return (
    <div className="videoupload-container">
      <form className="videoupload-form" onSubmit={handleSubmit}>
        <h2>Upload Video</h2>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={fileoption.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          value={fileoption.description}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={fileoption.category}
          onChange={handleChange}
          required
        />

        <label>Choose Video File</label>
        <input
          type="file"
          accept="video/*"
          onChange={handlefileChange}
          required
        />

        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Videoupload;
