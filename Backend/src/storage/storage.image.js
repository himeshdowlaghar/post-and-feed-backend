const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
    privateKey : process.env.IMAGEKIT_KEY
})


async function fileUpload(buffer,filename){
    const response = await imagekit.files.upload({
        file : buffer.toString("base64"),
        fileName :filename
    })

    return response;
}

module.exports = fileUpload;
