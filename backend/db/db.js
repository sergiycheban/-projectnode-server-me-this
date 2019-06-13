const fs = require('fs');
const ENTITIES_PATH = './db/entities';

const generateId = () => {
    return Math.random().toString(36).substring(2, 10);
};

function preparationForRecording(obj) {
    var newEntity = JSON.stringify(obj);
    console.log(newEntity);
    newEntity = newEntity.substring(1);
    newEntity = newEntity.substring(0, newEntity.length - 1);
    var newEntityWithNewLine = newEntity.replace(/},/g, '},\r\n')
    return newEntityWithNewLine;
};

var Database = function () {
    if (!fs.existsSync(ENTITIES_PATH)) {
        fs.mkdirSync(ENTITIES_PATH);
    }
};

Database.prototype.select = function (document, whereCollection) {

    if (!fs.existsSync(`${ENTITIES_PATH}/${document}`)) {
        console.log("NaN");
        return;
    }
    var collections = [];

    var rawDatabaseCollection = (fs.readFileSync(`${ENTITIES_PATH}/${document}`)).toString();
    var obj = JSON.parse("[" + rawDatabaseCollection + "]");

    obj.forEach(element => {
        var keys = Object.keys(element);
        keys.forEach(key => {
            if (key == Object.keys(whereCollection)[0]) {
                var values = Object.values(element);
                values.forEach(value => {
                    if (value == Object.values(whereCollection)[0]) {
                        collections.push(element);
                    } else {
                        console.log("Dont Have!");
                    }
                });
            }
        });
    });
    return collections;
};

Database.prototype.insert = function (document, object) {

    var id = generateId();
    var processEntity = object;
    processEntity.id = id;

    var storeEntity = JSON.stringify(processEntity) + '\r\n';

    console.log(storeEntity);

    fs.writeFileSync(`${ENTITIES_PATH}/${document}`, "," + storeEntity, {
        flag: 'a'
    });

    return processEntity;
};


Database.prototype.delete = function (document, whereCollection) {

    if (!fs.existsSync(`${ENTITIES_PATH}/${document}`)) {
        console.log("NaN");
        return;
    }
    var rawDatabaseCollection = (fs.readFileSync(`${ENTITIES_PATH}/${document}`)).toString();
    var obj = JSON.parse("[" + rawDatabaseCollection + "]");
    console.log(obj)
    var count = 0;
    obj.forEach(element => {
        var keys = Object.keys(element);
        keys.forEach(key => {
            if (key == Object.keys(whereCollection)[0]) {
                var values = Object.values(element);
                values.forEach(value => {
                    if (value == Object.values(whereCollection)[0]) {
                        obj.splice(count, 1);
                    } else {
                        console.log("Dont Have!");
                    }
                });
            }
        });
        count++;
    });

    fs.writeFileSync(`${ENTITIES_PATH}/${document}`, preparationForRecording(obj));

    return obj;
};

Database.prototype.update = function (document, whereCollection, updated) {

    if (!fs.existsSync(`${ENTITIES_PATH}/${document}`)) {
        console.log("NaN");
        return;
    }

    var rawDatabaseCollection = (fs.readFileSync(`${ENTITIES_PATH}/${document}`)).toString();
    var obj = JSON.parse("[" + rawDatabaseCollection + "]");
    obj.forEach(element => {
        var keys = Object.keys(element);
        keys.forEach(key => {
            if (key == Object.keys(whereCollection)[0]) {
                var values = Object.values(element);
                values.forEach(value => {
                    if (value == Object.values(whereCollection)[0]) {
                        var keysUpdated = Object.keys(updated)[0];
                        var valuesUpdated = Object.values(updated)[0];
                        element[keysUpdated] = valuesUpdated;
                    } else {
                        console.log("Dont Have!");
                    }
                });
            }
        });
    });

    fs.writeFileSync(`${ENTITIES_PATH}/${document}`, preparationForRecording(obj));

    return obj;
};

module.exports = new Database();