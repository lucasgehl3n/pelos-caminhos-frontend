export default class FilesFormat {
    static BinaryToBase64(file: File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                resolve(e.target!.result);
            };

            reader.onerror = error => {
                reject(error);
            };
        });
    }
}