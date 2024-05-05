import queryString from 'query-string';

export const sendRequestJS = async (props) => {
    let {
        url,
        method,
        body,
        queryParams = {}, // lay mac dinh {} neu prop ko tuyền
        useCredentials = false,
        headers = {},
        nextOption = {}
    } = props;


    // chuan bi Option trước 
    const options = {
        method: method,
        // by default setting the content-type to be json type
        headers: new Headers({ 'content-type': 'application/json', ...headers }),
        body: body ? JSON.stringify(body) : null, // body có thì stringify sẵn lun
        ...nextOption
    };
    if (useCredentials) options.credentials = "include"; // useCredentials dùng gửi cookie từ client->server

    if (queryParams) {
        // tư dong conver thêm & vào link url cho hợp chuẩn với back-end
        url = `${url}?${queryString.stringify(queryParams)}`;
    }

    return fetch(url, options).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then(function (json) {
                // to be able to access error status when you catch the error 
                return {
                    statusCode: res.status,
                    message: json?.message ?? "",
                    error: json?.error ?? ""
                };
            });
        }
    });
};