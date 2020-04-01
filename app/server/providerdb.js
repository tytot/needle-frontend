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
                id integer PRIMARY KEY,
                facility text,
                last_name text,
                first_name text,
                phone text UNIQUE,
                email text UNIQUE)`
        return this.db.run(sql);
    }

    selectByEmail(email, callback) {
        return this.db.get(
            `SELECT * FROM provider WHERE "email" = "${email}"`,
            [email],function(err,row){
                callback(err,row)
            })
    }

    selectByPhone(phone, callback) {
        return this.db.get(
            `SELECT * FROM provider WHERE "phone" = "${phone}"`,
            [phone],function(err,row){
                callback(err,row)
            })
    }

    selectByFacility(facility, callback) {
        return this.db.get(
            `SELECT * FROM provider WHERE "facility" = "${facility}"`,
            function(err,row){
                callback(err,row)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM provider`, function(err,rows){
            callback(err,rows)
        })
    }

    insert(provider, callback) {
        return this.db.run(
            `INSERT INTO provider (facility, last_name, first_name, phone, email) VALUES (?,?,?,?,?)`,
            provider, (err) => {
                callback(err)
            })
    }

    delete(email, callback) {
        return this.db.run(
            `DELETE FROM provider WHERE "email" = "${email}"`,
            function(err,row){
                callback(err,row)
            })
    }
}

module.exports = ProviderDB