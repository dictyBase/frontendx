- [x] validation for file name
- [x] Some logic can be moved into the `Upload` component. FileUploadDialog mainly needs to know about the state of the Upload mutation.
- [x] UploadAsName is not initialized with Uploaded file's name

- [ ] selectedFile and fileError states can be represented with Option<Either<File>>?

- `CreateFileUpload` function receives an Option<File>, and returns an error relating to file selection if no File is selected. This seems out of scope for the function. It should receive a File, and it should not be called if there is no file selected.

