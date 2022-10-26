exports.getImageSuffix = function(fileBuffer) {
    // 将上文提到的 文件标识头 按 字节 整理到数组中
    const imageBufferHeaders = [
        { bufBegin: [0xff, 0xd8], bufEnd: [0xff, 0xd9], suffix: '.jpg' },
        { bufBegin: [0x00, 0x00, 0x02, 0x00, 0x00], suffix: '.tga' },
        { bufBegin: [0x00, 0x00, 0x10, 0x00, 0x00], suffix: '.rle' },
        {
            bufBegin: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
            suffix: '.png'
        },
        { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], suffix: '.gif' },
        { bufBegin: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], suffix: '.gif' },
        { bufBegin: [0x42, 0x4d], suffix: '.bmp' },
        { bufBegin: [0x0a], suffix: '.pcx' },
        { bufBegin: [0x49, 0x49], suffix: '.tif' },
        { bufBegin: [0x4d, 0x4d], suffix: '.tif' },
        {
            bufBegin: [0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x20, 0x20],
            suffix: '.ico'
        },
        {
            bufBegin: [0x00, 0x00, 0x02, 0x00, 0x01, 0x00, 0x20, 0x20],
            suffix: '.cur'
        },
        { bufBegin: [0x46, 0x4f, 0x52, 0x4d], suffix: '.iff' },
        { bufBegin: [0x52, 0x49, 0x46, 0x46], suffix: '.ani' }
    ]
    for (const imageBufferHeader of imageBufferHeaders) {
        let isEqual
            // 判斷標示頭前綴
        if (imageBufferHeader.bufBegin) {
            const buf = Buffer.from(imageBufferHeader.bufBegin)
            isEqual = buf.equals(
                //使用 buffer.slice 方法 對 buffer 以字節為單位切割
                fileBuffer.slice(0, imageBufferHeader.bufBegin.length)
            )
        }
        // 判斷標示頭後綴
        if (isEqual && imageBufferHeader.bufEnd) {
            const buf = Buffer.from(imageBufferHeader.bufEnd)
            isEqual = buf.equals(fileBuffer.slice(-imageBufferHeader.bufEnd.length))
        }
        if (isEqual) {
            return imageBufferHeader.suffix
        }
    }
    // 未能識別到該文件類型
    return ''
}