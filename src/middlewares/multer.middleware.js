/**
 * Multer storage configuration for handling file uploads.
 *
 * Uses disk storage to save files to the './public/temp' directory.
 * - The `destination` function sets the upload directory.
 * - The `filename` function saves the file with its original name.
 *
 * @type {import('multer').StorageEngine}
 */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp');
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname);
    },
});

export const upload = multer({ 
    storage: storage 
});
