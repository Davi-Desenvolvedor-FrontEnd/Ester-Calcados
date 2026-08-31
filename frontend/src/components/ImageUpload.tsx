"use client";

import { ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaFileUpload, FaImage } from "react-icons/fa";

interface ImageUploadProps {
  imageUrl: string;
  setImageUrl: (url: string) => void;
}

export default function ImageUpload({
  imageUrl,
  setImageUrl,
}: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string>(imageUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "sucess" | "error"
  >("idle");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length == 0) return;
    const file = acceptedFiles[0];
    if (!file.type.startsWith("image/")) {
      alert("Selecione apenas imagens!");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Imagem muito grande");
      return;
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    console.log("Arquivo selecionado:", {
      nome: file.name,
      tamanho: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      tipo: file.type,
      urlPreview: url,
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp", ".svg"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview("");
    setUploadStatus("idle");
    setSelectedFile(null);
  };

  return (
    <div className="w-[90%] mx-auto rounded-xl border-2 border-purple-300 focus:ring-2 focus:ring-purple-500 bg-white/80">
      <div className="flex flex-row h-24 justify-center gap-2 items-center w-full">
        <ImageIcon className="text-purple-600" size={24} />
        <h2 className="text-2xl max-md:text-base font-bold text-gray-800">
          Upload de Imagem
        </h2>
      </div>

      {imagePreview && (
        <div className="flex flex-row-reverse items-center mb-4 w-4/5 mx-auto">
          <button
            onClick={removeImage}
            className="flex items-center cursor-pointer hover:decoration-1 hover:underline gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 rounded-lg transition-colors"
          >
            <X size={16} />
            Remover
          </button>
        </div>
      )}
      {!imagePreview && (
        <div
          {...getRootProps()}
          className={`
          border-3 border-dashed w-3/4 min-h-48 mx-auto mb-4 rounded-2xl p-8 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          ${
            isDragActive
              ? "border-purple-500 bg-purple-50"
              : "border-gray-300 hover:border-purple-400 hover:bg-gray-50"
          }
        `}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center gap-4">
            <div>
              {isDragActive ? (
                <p className="text-lg font-semibold text-purple-600">
                  Solte a imagem aqui...
                </p>
              ) : (
                <>
                  <p className="text-lg max-md:text-base font-semibold text-gray-700">
                    Arraste e solte uma imagem <br /> ou Selecione
                  </p>
                  <div className="w-20 h-20 max-md:w-16 max-md:h-16 rounded-full bg-purple-800 flex items-center justify-center mx-auto mt-4 hover:bg-purple-600 transition-colors">
                    <Upload className="text-amber-100" size={28} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview da Imagem */}
      {imagePreview && (
        <>
          <div className="mt-6 w-3/4 h-48 mx-auto overflow-hidden rounded-2xl bg-white shadow-md">
            <img
              src={imagePreview}
              alt="Preview da imagem"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="p-4 bg-gray-50 w-4/5 mx-auto">
            <div className="flex flex-col justify-between items-center gap-8">
              <div>
                <p className="font-medium text-xs text-gray-800">
                  {selectedFile?.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(selectedFile?.size! / 1024).toFixed(0)} KB •{" "}
                  {selectedFile?.type.split("/")[1].toUpperCase()}
                </p>
              </div>

              <div className="text-left">
                <p className="text-base text-gray-500">URL Gerada:</p>
                <p className="text-[14px] text-purple-600 font-semibold">
                  {imagePreview.substring(0, undefined)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
