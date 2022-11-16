import React from 'react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { AddAPhoto } from '@material-ui/icons';
import router, { useRouter } from 'next/router';

import { FileCopy } from '@material-ui/icons';
import { DeleteOutline, EditOutlined, CheckCircle } from '@material-ui/icons';

import './Drop.scss';
import './addproduct.scss';

const Drop = props => {
  // const uploadModalRef = useRef();
  // const uploadRef = useRef();
  // const statusRef = useRef();
    const fileInputRef = useRef();
  // const progressRef = useRef();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadbtn, setUploadBtn] = useState(false);
  const [div, setDiv] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [validFiles, setValidFiles] = useState([]);
  const [int, setInt] = useState(0);
  const [file, setFile] = useState({
    imageFile: '',
  });
  const [fileurl, setURL] = useState([]);

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find(item => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);
  const dragOver = e => {
    e.preventDefault();
  };

  const dragEnter = e => {
    e.preventDefault();
  };

  const dragLeave = e => {
    e.preventDefault();
  };
  const fileDrop = e => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      setUploadBtn(true);
      handleFiles(files);
    }
  };

  const handleimgChange = name => e => {
    console.log('heloooooooo');
    // if (e.target.files) {
    //   setFile({ ...file, ['ImageFile']: [...e.target.files] });
    //   }
    //   console.log("Update slider images", file);

    setFile({ imageFile: e.target.files });
    setURL({
      url: URL.createObjectURL(e.target.files),
    });
    console.log(fileurl);
  };
  const urlarr = [];
  const handleFiles = files => {
    const urlarr = [];
    console.log('file issssssssssssssss', files);
    var newurl = [];
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        newurl = fileurl;

        var x = URL.createObjectURL(files[i]);
        newurl.push(x);
        console.log('nammme', files[i]);
       // props.parentCall(files[i]);
        // console.log("int ",int)
        // var up=int + 1;
        // console.log("up ",up)
        // setInt(up)
        // urlarr[int]=(x)
        setSelectedFiles(prevArray => [...prevArray, files[i]]);
        console.log('select', selectedFiles);
        setValidFiles(prevArray => [...prevArray, files[i]])
     
       
        //uploadFiles()
      } else {
        console.log('Invalid');
        files[i]['invalid'] = true;
        setSelectedFiles(prevArray => [...prevArray, files[i]]);
        setErrorMessage('File type not permitted');
      }
      //uploadFiles()
    }

    setURL(newurl);
  
   // console.log('fileeeeee',files[i] );
    //props.parentCall(validFiles);
  };

  const validateFile = file => {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/x-icon',
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };
  const fileSize = size => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const fileType = fileName => {
    return (
      fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) ||
      fileName
    );
  };

  const removeFile = name => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex(e => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);
  };

  const closeUploadModal = () => {
    uploadModalRef.current.style.display = 'none';
  };

  const uploadFiles = () => {
    
    console.log('fileeeeee', selectedFiles);
    props.parentCall(validFiles);
    setUploadBtn(false);

    // router.push('/product/product')
  };
  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
      setUploadBtn(true);
      setDiv(false);
    }
  };

  return (
    <>
    {div &&
      <div
        className="drop-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        //   onClick={fileInputClicked}
      >
        <div className="drop-message">
          <div className="upload-icon">
            <input
              multiple
              type="file"
              className="hideupload"
              id="file"
               
               accept="image/*"
              // placeholder="Select Image"
              // required
              name="imageFile"
              ref={fileInputRef}
              onChange={filesSelected}
              // value={file.name}
              // onChange={handleimgChange('imageFile')}
            />
            <label htmlFor="file">
              <AddAPhoto style={{ marginRight: '30px' }} />
              Drag & Drop files
            </label>
          </div>
        </div>
      </div>
}
      <div className="file-display-container">
        {validFiles.map((data, i) => (
          <div className="s1">
            <div className="imgdiv">
              <div>
                <img className="thumbnail" src={fileurl[i]} />
              </div>
              <div className="img-text">
                <span
                  className={`file-name ${data.invalid ? 'file-error' : ''}`}
                >
                  {data.name}
                </span>
                <span className="file-size">({fileSize(data.size)})</span>
                {data.invalid && (
                  <span className="file-error-message">({errorMessage})</span>
                )}
                <span className="remove" onClick={() => removeFile(data.name)}>
                  <DeleteOutline />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {uploadbtn && (
        <button
          onClick={() => uploadFiles()}
          type="submit"
          className="newaddproButtondrp"
        >
          Done
        </button>
      )}
    </>
  );
};
export default Drop;
