import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

export const uploadSingle = upload.single('imagem');

export function handleUploadError(err, req, res, next) {
    if (err) {
        return res.status(400).json({
            success: false,
            message: `Erro no upload: ${err.message}`
        });
    }
    next();
}