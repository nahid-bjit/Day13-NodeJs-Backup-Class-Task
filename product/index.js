const fs = require("fs");
const { stringify } = require("querystring");

class Product {
    getAll() {
        const data = fs.readFileSync("./data/manga.json", "utf-8");
        // console.log(JSON.parse(data));
        const jsonData = JSON.parse(data);
        return jsonData;

    }

    add(product) {

        const data = JSON.parse(fs.readFileSync("./data/manga.json", "utf-8"));
        // const jsonData = JSON.parse(data);
        const newData = { ...product, id: data[data.length - 1].id + 1 }
        data.push(newData);
        fs.writeFileSync("./data/manga.json", JSON.stringify(data));
        console.log("Product has been added successfully!!")

        // console.log(newData);
        // jsonData.push(newData);
        // console.log(jsonData)

        // data.push(newData);
        // console.log(data);

        // const totalData = jsonData.push(newData);
        // console.log(totalData)

    }

    getOneById(id) {
        const data = fs.readFileSync("./data/manga.json", "utf-8");
        const jsonData = JSON.parse(data);
        return jsonData.find(x => x.id == id)
    }

    // ## update one by id ##

    // updateOneById (id) {
    //     const data = fs.readFileSync("./data/manga.json", "utf-8");
    //     const jsonData = JSON.parse(data);
    //     let updatedJsonData = jsonData.map(x=> {
    //         if(x.id == id) {
    //             x.name=x.name + " UPDATED ";
    //             console.log(x)
    //         }
    //         return x;

    //     })

    //     // data.push(updatedJsonData);
    //     fs.writeFileSync("./data/manga.json", JSON.stringify(updatedJsonData));

    // }

    // ## Update one by id and the given object ## 

    updateOneByIdAndObject(id, newData) {
        if (newData.hasOwnProperty('id')) {
            console.log("Object cannot be carry an id")
            return;
        }

        const data = fs.readFileSync("./data/manga.json", "utf-8");
        const jsonData = JSON.parse(data);

        let flag = 0;
        let updatedJsonData = jsonData.map(x => {
            if (x.id == id) {
                flag = 1;
                // console.log(x.id)
                x = { ...x, ...newData }
            }

            return x;

        });

        if (flag == 0) {
            console.log("There is no such data with this id,", id);
            return;
        }

        else {
            fs.writeFileSync("./data/manga.json", JSON.stringify(updatedJsonData));
            console.log("The object has been updated successfully")
        }

    }

    // ## delete by id ##

    deleteProduct(id) {
        const data = fs.readFileSync("./data/manga.json", "utf-8");
        const jsonData = JSON.parse(data);

        let isExist = jsonData.find(x=>x.id==id)
        if(isExist) {
            let updatedJsonData= jsonData.filter(x=> {
                if(x.id !=id ) {
                    return x;
                }
            })

            fs.writeFileSync("./data/manga.json", JSON.stringify(updatedJsonData));
            console.log("Successfully deleted product with id, ", id);


        }
        else {
            console.log("There is no such data with id ", id);
        }

    }

}

module.exports = new Product();

