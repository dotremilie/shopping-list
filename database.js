var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a = require('mongodb'), MongoClient = _a.MongoClient, ServerApiVersion = _a.ServerApiVersion, ObjectId = _a.ObjectId;
var uri = "mongodb+srv://suprenoctome:epS1kMuwqJFm3tFV@deltahq.7esvtel.mongodb.net/?retryWrites=true&w=majority&appName=deltaHQ";
var databaseName = "shopping_list_app";
var collectionName = "shopping_list";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
var client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
function fetchShoppingList() {
    return __awaiter(this, void 0, void 0, function () {
        var collection, query, allDocuments, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.db(databaseName).collection(collectionName)];
                case 1:
                    collection = _a.sent();
                    query = { "name": { $ne: null } };
                    return [4 /*yield*/, collection.find(query).toArray()];
                case 2:
                    allDocuments = _a.sent();
                    console.log("All documents in the ".concat(collectionName, ":"), allDocuments);
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.error('Error fetching items:', err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function addItem(itemName, itemCount) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, newItem, insertResult, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.db(databaseName).collection(collectionName)];
                case 1:
                    collection = _a.sent();
                    newItem = {
                        name: itemName,
                        count: itemCount
                    };
                    return [4 /*yield*/, collection.insertOne(newItem)];
                case 2:
                    insertResult = _a.sent();
                    console.log("Inserted item ID:", insertResult.insertedId);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.error("Error inserting item:", err_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function removeItem(itemId) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, removeItem_1, deleteResult, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.db(databaseName).collection(collectionName)];
                case 1:
                    collection = _a.sent();
                    removeItem_1 = {
                        _id: new ObjectId(itemId)
                    };
                    return [4 /*yield*/, collection.deleteOne(removeItem_1)];
                case 2:
                    deleteResult = _a.sent();
                    if (deleteResult.deletedCount === 1) {
                        console.log("Successfully deleted ".concat(deleteResult.deletedCount, " item(s)."));
                    }
                    else {
                        console.log("No items matched itemID: ".concat(itemId, ". Deleted ").concat(deleteResult.deletedCount, " item(s)."));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    console.error("Error removing item (itemID: ".concat(itemId, "):"), err_3);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateItem(itemId, updatedData) {
    return __awaiter(this, void 0, void 0, function () {
        var collection, updateResult, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, client.db(databaseName).collection(collectionName)];
                case 1:
                    collection = _a.sent();
                    return [4 /*yield*/, collection.updateOne({ _id: new ObjectId(itemId) }, { $set: updatedData })];
                case 2:
                    updateResult = _a.sent();
                    if (updateResult.modifiedCount === 1) {
                        console.log("Successfully updated ".concat(updateResult.modifiedCount, " item."));
                    }
                    else {
                        console.log("No items matched the query. Updated ".concat(updateResult.modifiedCount, " item(s)."));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    console.error("Error updating item (itemID: ".concat(itemId, "):"), err_4);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var itemName, itemCount, itemId, updatedData, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, 5, 7]);
                    // Connect the client to the server
                    return [4 /*yield*/, client.connect()];
                case 1:
                    // Connect the client to the server
                    _a.sent();
                    // Send a ping to confirm a successful connection
                    return [4 /*yield*/, client.db(databaseName).command({ ping: 1 })];
                case 2:
                    // Send a ping to confirm a successful connection
                    _a.sent();
                    console.log("Successfully connected to MongoDB!");
                    itemName = "Bread";
                    itemCount = 69;
                    itemId = "6664528a473b8e908df7588f";
                    //await removeItem(itemId).catch(console.dir);
                    itemId = "66646358d0c94871212728a6";
                    updatedData = {
                        "name": "Cheese",
                        "count": 2
                    };
                    //await updateItem(itemId, updatedData);
                    return [4 /*yield*/, fetchShoppingList().catch(console.dir)];
                case 3:
                    //await updateItem(itemId, updatedData);
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4:
                    err_5 = _a.sent();
                    console.error(err_5);
                    return [3 /*break*/, 7];
                case 5: 
                // Ensures that the client will close when you finish/error
                return [4 /*yield*/, client.close()];
                case 6:
                    // Ensures that the client will close when you finish/error
                    _a.sent();
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    });
}
run().catch(console.dir);
