const cloudinary = require("cloudinary").v2;
const { Readable } = require("stream");

// Configure Cloudinary from environment variables
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isConfigured = Boolean(cloudName && apiKey && apiSecret);

if (isConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
}

class CloudinaryService {
  isCloudinaryConfigured() {
    return isConfigured;
  }

  /**
   * Upload buffer or file to Cloudinary with automatic optimization (f_auto, q_auto)
   */
  async uploadImage(fileBuffer, options = {}) {
    const {
      folder = "zolvex/uploads",
      publicId = null,
      tags = ["zolvex"],
      transformation = []
    } = options;

    if (!isConfigured) {
      // Offline / Unconfigured fallback: Return structured mock media metadata
      const mockId = publicId || `zolvex_mock_${Date.now()}`;
      return {
        publicId: `${folder}/${mockId}`,
        secureUrl: `/images/work_img_1.jpeg`,
        folder,
        format: "jpeg",
        resourceType: "image",
        bytes: fileBuffer ? fileBuffer.length : 102400,
        width: 1200,
        height: 800,
        originalFilename: options.originalFilename || "uploaded_image.jpeg"
      };
    }

    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder,
        tags,
        fetch_format: "auto",
        quality: "auto",
        transformation: [
          { quality: "auto", fetch_format: "auto" },
          ...transformation
        ]
      };

      if (publicId) {
        uploadOptions.public_id = publicId;
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(error);
          }

          resolve({
            publicId: result.public_id,
            secureUrl: result.secure_url,
            folder,
            format: result.format,
            resourceType: result.resource_type,
            bytes: result.bytes,
            width: result.width,
            height: result.height,
            originalFilename: result.original_filename || options.originalFilename || "image"
          });
        }
      );

      if (Buffer.isBuffer(fileBuffer)) {
        Readable.from(fileBuffer).pipe(uploadStream);
      } else {
        reject(new Error("Invalid file buffer provided for upload"));
      }
    });
  }

  /**
   * Delete asset from Cloudinary by publicId
   */
  async deleteImage(publicId) {
    if (!publicId) return true;
    if (!isConfigured) {
      return true; // Mock success
    }

    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === "ok" || result.result === "not found";
    } catch (error) {
      console.error(`Failed to delete Cloudinary asset [${publicId}]:`, error);
      throw error;
    }
  }

  /**
   * Fail-Safe Image Replacement: Upload new asset first -> Return new doc -> Delete old asset
   */
  async replaceImage(oldPublicId, newFileBuffer, options = {}) {
    const newMedia = await this.uploadImage(newFileBuffer, options);
    
    if (oldPublicId && oldPublicId !== newMedia.publicId) {
      try {
        await this.deleteImage(oldPublicId);
      } catch (err) {
        console.warn(`Old asset deletion failed during replace [${oldPublicId}]:`, err.message);
      }
    }

    return newMedia;
  }

  /**
   * Generate dynamic CDN optimization & transformation URL
   */
  getTransformedUrl(publicIdOrUrl, options = {}) {
    if (!publicIdOrUrl) return "/images/work_img_1.jpeg";

    if (!isConfigured || publicIdOrUrl.startsWith("/") || publicIdOrUrl.startsWith("http")) {
      return publicIdOrUrl;
    }

    const { width, height, crop = "fill", quality = "auto" } = options;
    return cloudinary.url(publicIdOrUrl, {
      secure: true,
      fetch_format: "auto",
      quality,
      width,
      height,
      crop
    });
  }
}

module.exports = new CloudinaryService();
