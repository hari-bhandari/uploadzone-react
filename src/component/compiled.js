'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
  width: "100%"
};

var ERROR = {
  NOT_SUPPORTED_EXTENSION: 'NOT_SUPPORTED_EXTENSION',
  FILESIZE_TOO_LARGE: 'FILESIZE_TOO_LARGE'
};
var ReactImageUploadComponent = function ReactImageUploadComponent(_ref) {
  var className = _ref.className,
      defaultImages = _ref.defaultImages,
      onChange = _ref.onChange,
      fileContainerStyle = _ref.fileContainerStyle,
      singleImage = _ref.singleImage,
      accept = _ref.accept,
      maxFileSize = _ref.maxFileSize,
      imgExtension = _ref.imgExtension,
      maxFiles = _ref.maxFiles,
      label = _ref.label,
      labelStyles = _ref.labelStyles,
      labelClass = _ref.labelClass,
      withLabel = _ref.withLabel,
      fileSizeError = _ref.fileSizeError,
      errorStyle = _ref.errorStyle,
      errorClass = _ref.errorClass,
      withPreview = _ref.withPreview,
      fileTypeError = _ref.fileTypeError,
      buttonStyles = _ref.buttonStyles,
      buttonClassName = _ref.buttonClassName,
      buttonType = _ref.buttonType,
      style = _ref.style,
      buttonText = _ref.buttonText,
      name = _ref.name;

  var _useState = (0, _react.useState)([].concat(_toConsumableArray(defaultImages))),
      _useState2 = _slicedToArray(_useState, 2),
      pictures = _useState2[0],
      setPictures = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      files = _useState4[0],
      setFiles = _useState4[1];

  var inputElement = '';

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      fileErrors = _useState6[0],
      setFilesError = _useState6[1];

  (0, _react.useEffect)(function () {
    onChange(files, pictures);
  }, [files]);
  var hasExtension = function hasExtension(fileName) {
    var ext = '.' + fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);
    var isTrue = false;
    imgExtension.forEach(function (extension) {
      console.log(extension);
      if (ext.toLowerCase() === extension) {
        isTrue = true;
      }
    });
    return isTrue;
  };

  /*
   Handle file validation
   */
  var onDropFile = function onDropFile(e) {
    var droppedFiles = e.target.files;
    var allFilePromises = [];
    var fileErrors = [];

    // Iterate over all uploaded files
    for (var i = 0; i < droppedFiles.length && i < maxFiles; i++) {
      var file = droppedFiles[i];
      var fileError = {
        name: file.name
      };
      // Check for file extension
      if (!hasExtension(file.name)) {
        fileError = Object.assign(fileError, {
          type: ERROR.NOT_SUPPORTED_EXTENSION
        });
        fileErrors.push(fileError);
        continue;
      }
      // Check for file size
      if (file.size > maxFileSize) {
        fileError = Object.assign(fileError, {
          type: ERROR.FILESIZE_TOO_LARGE
        });
        fileErrors.push(fileError);
        continue;
      }
      allFilePromises.push(readFile(file));
    }
    setFilesError(fileErrors);

    Promise.all(allFilePromises).then(function (newFilesData) {
      var dataURLs = singleImage ? [] : pictures.slice();
      var newFiles = singleImage ? [] : files.slice();

      newFilesData.forEach(function (newFileData) {
        dataURLs.push(newFileData.dataURL);
        newFiles.push(newFileData.file);
      });

      // Slice array if maxLength is reached
      setPictures(dataURLs.slice(0, maxFiles));
      setFiles(newFiles.slice(0, maxFiles));
    });
  };

  var onUploadClick = function onUploadClick(e) {
    // Fixes If you select an image, remove it, then select it again, nothing happens
    e.target.value = null;
  };

  /*
     Read a file and return a promise that when resolved gives the file itself and the data URL
   */
  var readFile = function readFile(file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();

      // Read the image via FileReader API and save image result in state.
      reader.onload = function (e) {
        // Add the file name to the data URL
        var dataURL = e.target.result;
        dataURL = dataURL.replace(";base64", ';name=' + file.name + ';base64');
        resolve({ file: file, dataURL: dataURL });
      };

      reader.readAsDataURL(file);
    });
  };

  /*
   Remove the image from state
   */
  var removeImage = function removeImage(picture) {
    var removeIndex = pictures.findIndex(function (e) {
      return e === picture;
    });
    var filteredPictures = pictures.filter(function (e, index) {
      return index !== removeIndex;
    });
    var filteredFiles = files.filter(function (e, index) {
      return index !== removeIndex;
    });
    setPictures(filteredPictures);
    setFiles(filteredFiles);
    onChange(files, pictures);
  };

  /*
   Check if any errors && render
   */
  var renderErrors = function renderErrors() {
    return fileErrors.map(function (fileError, index) {
      return _react2.default.createElement(
        'div',
        { className: 'errorMessage ' + errorClass, key: index, style: errorStyle },
        '* ',
        fileError.name,
        ' ',
        fileError.type === ERROR.FILESIZE_TOO_LARGE ? fileSizeError : fileTypeError
      );
    });
  };

  /*
   Render label
   */
  var renderLabel = function renderLabel() {
    if (withLabel) {
      return _react2.default.createElement(
        'p',
        { className: labelClass, style: labelStyles },
        label
      );
    }
  };

  /*
   Render preview images
   */
  var renderPreview = function renderPreview() {
    return _react2.default.createElement(
      'div',
      { className: 'uploadPicturesWrapper' },
      renderPreviewPictures()
    );
  };

  var renderPreviewPictures = function renderPreviewPictures() {
    return pictures.map(function (picture, index) {
      return _react2.default.createElement(
        'div',
        { key: index, className: 'uploadPictureContainer' },
        _react2.default.createElement(
          'div',
          { className: 'deleteImage', onClick: function onClick() {
              return removeImage(picture);
            } },
          'X'
        ),
        _react2.default.createElement('img', { src: picture, className: 'uploadPicture', alt: 'preview' })
      );
    });
  };

  /*
   On button click, trigger input file to open
   */
  var triggerFileUpload = function triggerFileUpload() {
    inputElement.click();
  };

  var clearPictures = function clearPictures() {
    undefined.setState({ pictures: [] });
  };
  return _react2.default.createElement(
    'div',
    { className: "fileUploader " + className, style: style },
    _react2.default.createElement(
      'div',
      { className: 'fileContainer', style: fileContainerStyle },
      renderLabel(),
      _react2.default.createElement(
        'div',
        { className: 'errorsContainer' },
        renderErrors()
      ),
      files.length < maxFiles && _react2.default.createElement(
        'button',
        {
          type: buttonType,
          className: "chooseFileButton " + buttonClassName,
          style: buttonStyles,
          onClick: triggerFileUpload
        },
        buttonText
      ),
      _react2.default.createElement('input', {
        type: 'file',
        ref: function ref(input) {
          return inputElement = input;
        },
        name: name,
        multiple: !singleImage,
        onChange: onDropFile,
        onClick: onUploadClick,
        accept: accept
      }),
      withPreview ? renderPreview() : null
    )
  );
};
ReactImageUploadComponent.defaultProps = {
  className: '',
  fileContainerStyle: {},
  buttonClassName: "",
  buttonStyles: {},
  withPreview: false,
  accept: "image/*",
  name: "",
  withIcon: true,
  buttonText: "Choose images",
  buttonType: "button",
  withLabel: true,
  label: "Max file size: 5mb, accepted: jpg|gif|png",
  labelStyles: {},
  labelClass: "",
  imgExtension: ['.jpg', '.jpeg', '.gif', '.png'],
  maxFileSize: 5242880,
  fileSizeError: " file size is too big",
  maxFiles: 99,
  fileTypeError: " is not a supported file extension",
  errorClass: "",
  style: {},
  errorStyle: {},
  singleImage: false,
  onChange: function onChange() {},
  defaultImages: []
};

ReactImageUploadComponent.propTypes = {
  style: _propTypes2.default.object,
  fileContainerStyle: _propTypes2.default.object,
  className: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onDelete: _propTypes2.default.func,
  buttonClassName: _propTypes2.default.string,
  buttonStyles: _propTypes2.default.object,
  buttonType: _propTypes2.default.string,
  withPreview: _propTypes2.default.bool,
  accept: _propTypes2.default.string,
  name: _propTypes2.default.string,
  withIcon: _propTypes2.default.bool,
  buttonText: _propTypes2.default.string,
  withLabel: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  labelStyles: _propTypes2.default.object,
  labelClass: _propTypes2.default.string,
  imgExtension: _propTypes2.default.array,
  maxFileSize: _propTypes2.default.number,
  fileSizeError: _propTypes2.default.string,
  maxFiles: _propTypes2.default.number,
  fileTypeError: _propTypes2.default.string,
  errorClass: _propTypes2.default.string,
  errorStyle: _propTypes2.default.object,
  singleImage: _propTypes2.default.bool,
  defaultImages: _propTypes2.default.array
};

exports.default = ReactImageUploadComponent;
