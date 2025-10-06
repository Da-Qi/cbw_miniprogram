async function uploadMultiImages(cloudDir, images) {
    const uploadPromises = [];
    images.forEach((image, index) => {
        const cloudPath = `${cloudDir}/${Date.now()}-${index}-${Math.random().toString(36).slice(-6)}.jpg`
        console.log('image ', image)
        console.log('cloudPath ', cloudPath)

        // 将wx.cloud.uploadFile包装为Promise
        const uploadPromise = new Promise((resolve) => {
            wx.cloud.uploadFile({
                cloudPath: cloudPath,
                filePath: image.url,
                success: (res) => {
                    console.log(`第${index+1}张上传成功`, res.fileID);
                    resolve(res.fileID); // 成功则返回fileID
                },
                fail: (err) => {
                    console.error(`第${index+1}张上传失败`, err);
                    wx.showToast({
                        title: `第${index+1}张上传失败`,
                        icon: 'none'
                    });
                    resolve(null); // 失败则返回null（不中断其他上传）
                }
            });

        });
        uploadPromises.push(uploadPromise);
    })
    // 等待所有上传操作完成，获取结果数组
    const results = await Promise.all(uploadPromises);

    // 过滤掉失败的项（null），返回成功的fileID数组
    return results.filter(fileID => fileID !== null);
}

module.exports = {
    uploadMultiImages
};