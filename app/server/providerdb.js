"use strict";
const sqlite3 = require('sqlite3').verbose();

class ProviderDB {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS provider (
                uuid text PRIMARY KEY,
                facility text,
                last_name text,
                first_name text,
                phone text UNIQUE,
                email text UNIQUE)`
        return this.db.run(sql);
    }

    selectByUUID(uuid, callback) {
        return this.db.get(
            `SELECT * FROM provider WHERE "uuid" = "${uuid}"`,
            function (err, row) {
                callback(err, row)
            })
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM provider WHERE "email" = "${email}"`,
            function (err, row) {
                callback(err, row)
            })
    }

    selectByPhone(phone, callback) {
        return this.db.get(
            `SELECT * FROM provider WHERE "phone" = "${phone}"`,
            function (err, row) {
                callback(err, row)
            })
    }

    selectByFacility(facility, callback) {
        return this.db.get(
            `SELECT * FROM provider WHERE "facility" = "${facility}"`,
            function (err, row) {
                callback(err, row)
            })
    }

    selectByName(last_name, first_name, callback) {
        return this.db.get(
            `SELECT * FROM provider WHERE "last_name" = "${last_name}" AND "first_name" = "${first_name}"`,
            function (err, row) {
                callback(err, row)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM provider`, function (err, rows) {
            callback(err, rows)
        })
    }

    insert(provider, callback) {
        console.log(provider)
        return this.db.run(
            `INSERT INTO provider (uuid, facility, last_name, first_name, phone, email) VALUES (?,?,?,?,?,?)`,
            provider, (err) => {
                callback(err)
            })
    }

    delete(email, callback) {
        return this.db.run(
            `DELETE FROM provider WHERE "email" = "${email}"`,
            function (err, row) {
                callback(err, row)
            })
    }
}

module.exports = ProviderDB