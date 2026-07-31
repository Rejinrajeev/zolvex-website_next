const fs = require("fs");
const path = require("path");
const cloudinaryService = require("../services/cloudinaryService");
const Media = require("../models/Media");
const { connectDB, getIsConnected } = require("../database/connect");

const PUBLIC_IMAGES_DIR = path.join(__dirname, "../../../client/public/images");

async function migrateLocalImages() {
  console.log("🚀 Starting Cloudinary Local Image Migration Audit & Migration...");

  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
    console.warn("⚠️ Public images directory not found:", PUBLIC_IMAGES_DIR);
    return;
  }

  const files = fs.readdirSync(PUBLIC_IMAGES_DIR);
  console.log(`Found ${files.length} local images in public/images.`);

  const migrationMap = {};

  for (const filename of files) {
    const ext = path.extname(filename).toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext)) {
      continue;
    }

    const filePath = path.join(PUBLIC_IMAGES_DIR, filename);
    const fileBuffer = fs.readFileSync(filePath);
    
    // Categorize folder
    let folder = "zolvex/website";
    let category = "website";
    if (filename.startsWith("work_img")) {
      folder = "zolvex/services";
      category = "services";
    }

    const publicId = `${folder}/${path.parse(filename).name}`;

    try {
      let mediaResult;
      if (cloudinaryService.isCloudinaryConfigured()) {
        mediaResult = await cloudinaryService.uploadImage(fileBuffer, {
          folder,
          publicId: path.parse(filename).name,
          originalFilename: filename
        });
        console.log(`✅ Uploaded to Cloudinary: ${filename} -> ${mediaResult.secureUrl}`);
      } else {
        mediaResult = {
          publicId,
          secureUrl: `/images/${filename}`,
          folder,
          format: ext.replace(".", ""),
          resourceType: "image",
          bytes: fileBuffer.length,
          width: 1200,
          height: 800,
          originalFilename: filename
        };
        console.log(`ℹ️ Cloudinary credentials unconfigured. Registered fallback mapping for ${filename}`);
      }

      migrationMap[`/images/${filename}`] = mediaResult.secureUrl;

      if (getIsConnected()) {
        await Media.findOneAndUpdate(
          { publicId: mediaResult.publicId },
          {
            ...mediaResult,
            category,
            altText: filename.replace(/_/g, " ").replace(ext, "")
          },
          { upsert: true, new: true }
        );
      }
    } catch (err) {
      console.error(`❌ Migration failed for ${filename}:`, err.message);
    }
  }

  console.log("\n📊 Migration Mapping Summary:");
  console.table(migrationMap);
  console.log("✨ Migration process completed cleanly.\n");

  return migrationMap;
}

if (require.main === module) {
  connectDB().then(() => migrateLocalImages().then(() => process.exit(0)));
}

module.exports = migrateLocalImages;
