function sendHttpRequest(method, link, data) {
    const promise = new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, link, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onerror = function () {
            reject("Network error");
        };

        xhr.onload = function () {
            if (xhr.status == 200 && xhr.readyState == 4) {
                var data = JSON.parse(this.response);
                if (data.status == 200) {
                    resolve(data.data);
                } else {
                    reject(data.message);
                }
            } else {
                reject("Server error");
            }
        };

        xhr.send(JSON.stringify(data));
    });
    return promise;
}