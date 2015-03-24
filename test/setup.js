/**
 * Created by Kristof on 17/02/2015.
 */
var indexedDb = window.indexedDBmock;
var dbName = "TestDatabase";
var objectStoreName = "objectStore";
var anOtherObjectStoreName = "anOtherObjectStoreName";
var indexProperty = "name";
var indexPropertyMultiEntry = "multiEntry";
var addData = { test: "addData", name: "name", id: 1, multiEntry: [1, "test", new Date(), function(){}] };
var msgCreatingInitialSituationFailed = "Creating initial situation failed";

function initionalSituation(callBack, done, assert) {
    var request = indexedDb.deleteDatabase(dbName);

    request.onsuccess = function(){
        callBack();
    };
    request.onerror = function(){
        assert.ok(false, msgCreatingInitialSituationFailed);
        done();
    };
}
function initionalSituationDatabase(callBack, done, assert) {
    initionalSituation(function(){
        var request = indexedDb.open(dbName);
        request.onsuccess = function(e){
            e.target.result.close();
            callBack();
        };
        request.onerror = function(){
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
    }, done, assert);
}
function initionalSituationDatabaseVersion(callBack, done, assert) {
    initionalSituation(function(){
        var request = indexedDb.open(dbName, 2);
        request.onsuccess = function(e){
            e.target.result.close();
            callBack();
        };
        request.onerror = function(){
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
    }, done, assert);
}
function initionalSituationObjectStore(callBack, done, assert) {
    initionalSituation(function(){
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function(e){
            e.target.result.close();
            callBack();
        };
        request.onerror = function(){
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function(e){
            if (e.type == "upgradeneeded") {
                try {
                    e.target.transaction.db.createObjectStore(objectStoreName);
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    }, done, assert);
}
function initionalSituation2ObjectStore(callBack, done, assert) {
    initionalSituation(function(){
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function(e){
            e.target.result.close();
            callBack();
        };
        request.onerror = function(){
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function(e){
            if (e.type == "upgradeneeded") {
                try {
                    e.target.transaction.db.createObjectStore(objectStoreName);
                    e.target.transaction.db.createObjectStore(anOtherObjectStoreName);
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    }, done, assert);
}
function initionalSituationObjectStoreNoAutoIncrement(callBack, done, assert) {
    initionalSituation(function() {
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function (e) {
            e.target.result.close();
            callBack();
        };
        request.onerror = function () {
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function (e) {
            if (e.type == "upgradeneeded") {
                try {
                    e.target.transaction.db.createObjectStore(objectStoreName, {autoIncrement: false});
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    });
}
function initionalSituationObjectStoreWithAutoIncrement(callBack, done, assert) {
    initionalSituation(function () {
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function (e) {
            e.target.result.close();
            callBack();
        };
        request.onerror = function () {
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function (e) {
            if (e.type == "upgradeneeded") {
                try {
                    e.target.transaction.db.createObjectStore(objectStoreName, { autoIncrement: true });
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    });
}
function initionalSituationObjectStoreWithKeyPathNoAutoIncrement(callBack, done, assert) {
    initionalSituation(function() {
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function (e) {
            e.target.result.close();
            callBack();
        };
        request.onerror = function () {
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function (e) {
            if (e.type == "upgradeneeded") {
                try {
                    e.target.transaction.db.createObjectStore(objectStoreName, {keyPath: "id", autoIncrement: false});
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    });
}
function initionalSituationObjectStoreWithKeyPathAndAutoIncrement(callBack, done, assert) {
    initionalSituation(function() {
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function (e) {
            e.target.result.close();
            callBack();
        };
        request.onerror = function () {
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function (e) {
            if (e.type == "upgradeneeded") {
                try {
                    e.target.transaction.db.createObjectStore(objectStoreName, {keyPath: "id", autoIncrement: true});
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    });
}
function initionalSituationObjectStoreNoAutoIncrementWithData(callBack, done, assert) {
    initionalSituation(function() {
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function (e) {
            e.target.result.close();
            callBack();
        };
        request.onerror = function () {
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function (e) {
            if (e.type == "upgradeneeded") {
                try {
                    var objectstore = e.target.transaction.db.createObjectStore(objectStoreName, { autoIncrement: false });
                    objectstore.add(addData, addData.id);
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    });
}
function initionalSituationObjectStoreWithKeyPathAndDataNoAutoIncrement(callBack, done, assert) {
    initionalSituation(function() {
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function (e) {
            e.target.result.close();
            callBack();
        };
        request.onerror = function () {
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function (e) {
            if (e.type == "upgradeneeded") {
                try {
                    var objectstore = e.target.transaction.db.createObjectStore(objectStoreName, {keyPath: "id", autoIncrement: false});
                    objectstore.add(addData);
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    });
}
function initionalSituationIndex(callBack, done, assert) {
    initionalSituation(function(){
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function(e){
            e.target.result.close();
            callBack();
        };
        request.onerror = function(){
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function(e){
            if (e.type == "upgradeneeded") {
                try {
                    var objectstore = e.target.transaction.db.createObjectStore(objectStoreName);
                    objectstore.createIndex(indexProperty, indexProperty);
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    }, done, assert);
}
function initionalSituationIndexUniqueIndexWithData(callBack, done, assert) {
    initionalSituation(function(){
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function(e){
            e.target.result.close();
            callBack();
        };
        request.onerror = function(){
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function(e){
            if (e.type == "upgradeneeded") {
                try {
                    var objectstore = e.target.transaction.db.createObjectStore(objectStoreName);
                    objectstore.createIndex(indexProperty, indexProperty, { unique: true });
                    objectstore.add(addData, addData.id);
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    }, done, assert);
}
function initionalSituationIndexUniqueMultiEntryIndexWithData(callBack, done, assert) {
    initionalSituation(function(){
        var request = indexedDb.open(dbName, 1);
        request.onsuccess = function(e){
            e.target.result.close();
            callBack();
        };
        request.onerror = function(){
            assert.ok(false, msgCreatingInitialSituationFailed);
            done();
        };
        request.onupgradeneeded = function(e){
            if (e.type == "upgradeneeded") {
                try {
                    var objectstore = e.target.transaction.db.createObjectStore(objectStoreName);
                    objectstore.createIndex(indexPropertyMultiEntry, indexPropertyMultiEntry, { unique: true, multiEntry: true });
                    objectstore.add(addData, addData.id);
                }
                catch (ex) {
                    assert.ok(false, msgCreatingInitialSituationFailed);
                    done();
                }
            }
        };
    }, done, assert);
}