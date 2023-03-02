module.exports = function(config) {


    config.addFilter("uppercase", (value)=> {

        return `${value}`.toUpperCase();
    })


    config.addFilter("totable", (data)=> {

        let html = `<table class="table"><thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Description</th>
            </tr>
        </thead><tbody>`;

        for(let item of data) {

            html += `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                </tr>`;
        }

        html += `</table>`;

        return html;
    });

    return {
        dir: {
            input: './src', 
            output: './build'
        }
    }

}