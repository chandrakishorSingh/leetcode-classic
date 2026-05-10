const { rimraf } = require('rimraf');
const cpy = require('cpy').default;
const fs = require('fs');
const archiver = require('archiver');

// 1. clean dist folder
// use rimrafsync to delete dist folder: working
async function cleanDist() {
    await rimraf('dist');
    console.log('Dist folder cleaned');
}

// 2. copy files: working
async function copyFiles() {
    // 1. copy for chromium build
    await cpy(['icons/', 'src/', 'manifest.json'], 'dist/chromium');
    
    // 2. copy for firefox build
    await cpy(['icons/', 'src/', 'manifest.json'], 'dist/firefox');
    console.log('Files copied');
}

// 3. update manifest.json for firefox: working
async function transformFirefoxManifest() {
    const manifestPath = 'dist/firefox/manifest.json';
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    
    // Add firefox specific settings
    manifest.browser_specific_settings = {
        gecko: {
            id: "leetcode-classic-extension-@chandrakishorsingh.com",
            data_collection_permissions: {
                required: [
                    "none"
                ]
            },
            strict_min_version: "142.0"
        }
    };

    manifest.background.scripts = [manifest.background.service_worker];
    delete manifest.background.service_worker;
    
    // Write back to file
    await fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 4));
    console.log('Firefox manifest updated');
}

async function createZip(sourceDir, outputFile) {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outputFile);
        const archive = archiver('zip');
        output.on('close', () => {
            console.log(`Zip file created: ${outputFile}`);
            resolve();
        });
        
        archive.on('error', (err) => {
            reject(err);
        });
        
        
        archive.pipe(output);
        archive.directory(sourceDir, false);
        archive.finalize();
        
    });
}

// 4. create zip files
async function createZips() {
    // read manifest and extract the version field
    const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf-8'));
    const version = manifest.version;

    await createZip('dist/chromium', `dist/chromium/leetcode-classic-chromium-v${version}.zip`);
    await createZip('dist/firefox', `dist/firefox/leetcode-classic-firefox-v${version}.zip`);
}

async function build() {
    await cleanDist();
    await copyFiles();
    await transformFirefoxManifest();
    await createZips();
}

build();