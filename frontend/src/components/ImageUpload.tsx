"use client";

import { ImageIcon, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

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
    "idle" | "uploading" | "success" | "error"
  >("idle");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      if (!file.type.startsWith("image/")) {
        alert("Selecione apenas imagens!");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Imagem muito grande (máximo 5MB)");
        return;
      }

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImageUrl(url);
      setUploadStatus("idle");

      console.log("Arquivo selecionado:", {
        nome: file.name,
        tamanho: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        tipo: file.type,
        urlPreview: url,
      });
    },
    [setImageUrl],
  );

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
    setImageUrl("");
    setUploadStatus("idle");
    setSelectedFile(null);
  };

  return (
    <div className="w-full rounded-xl border-2 border-purple-200 bg-white/80 transition-all hover:border-purple-300">
      {/* Cabeçalho */}
      <div className="flex items-center justify-center gap-2 h-16 border-b border-purple-100 bg-purple-50/50 rounded-t-xl">
        <ImageIcon className="text-(--secondary)" size={22} />
        <h2 className="text-lg font-semibold text-(--text)">
          Imagem do Produto
        </h2>
      </div>
      <div className="p-4">
        {!imagePreview ? (
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
              transition-all duration-300 ease-in-out min-h-45
              flex items-center justify-center border-(--secondary)/50 hover:border-(--secondary)
            `}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center gap-3">
              {isDragActive ? (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="text-(--secondary)" size={32} />
                  <p className="text-(--secondary) font-medium">
                    Solte a imagem aqui...
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <Upload className="text-(--secondary)" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-(--text)">
                      Clique para selecionar ou arraste uma imagem
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, WEBP (máx. 5MB)
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={removeImage}
                className="flex items-center gap-1 px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={16} />
                Remover imagem
              </button>
            </div>
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gray-100 shadow-inner">
              <img
                src={imagePreview}
                alt="Preview do produto"
                className="w-full h-full object-contain"
              />
            </div>
            {selectedFile && (
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                <p className="text-sm font-medium text-(--text) truncate">
                  {selectedFile.name}
                </p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span>{(selectedFile.size / 1024).toFixed(0)} KB</span>
                  <span>•</span>
                  <span className="uppercase">
                    {selectedFile.type.split("/")[1]}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
